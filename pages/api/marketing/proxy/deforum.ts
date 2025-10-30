import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    // Try Pexels API for stock video as a fallback (free tier)
    const pexelsApiKey = process.env.PEXELS_API_KEY

    if (pexelsApiKey) {
      try {
        const response = await fetch(
          `https://api.pexels.com/videos/search?query=${encodeURIComponent(prompt)}&per_page=1`,
          {
            headers: {
              Authorization: pexelsApiKey
            }
          }
        )

        if (response.ok) {
          const data = await response.json()
          if (data.videos && data.videos.length > 0) {
            const video = data.videos[0]
            const videoFile = video.video_files.find((f: any) => f.quality === 'hd') || video.video_files[0]
            
            return res.status(200).json({
              success: true,
              url: videoFile.link,
              message: 'Stock video from Pexels',
              provider: 'pexels',
              thumbnail: video.image
            })
          }
        }
      } catch (pexelsError) {
        console.error('Pexels fallback failed:', pexelsError)
      }
    }

    // Return helpful message if no video providers are configured
    res.status(200).json({
      success: false,
      message: 'Video generation requires configuration. Options: 1) Add PEXELS_API_KEY for stock videos 2) Integrate Runway ML API 3) Use Stable Diffusion + Deforum extension. For now, try using image mode or check the documentation.',
      prompt: prompt,
      provider: 'unavailable'
    })
  } catch (error) {
    console.error('Video generation error:', error)
    res.status(500).json({
      success: false,
      error: 'Video generation not available'
    })
  }
}
