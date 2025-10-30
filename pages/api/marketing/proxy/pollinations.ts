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

    const encodedPrompt = encodeURIComponent(prompt)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`

    res.status(200).json({
      success: true,
      url: imageUrl,
      provider: 'pollinations'
    })
  } catch (error) {
    console.error('Pollinations error:', error)
    res.status(500).json({
      success: false,
      error: 'Image generation failed'
    })
  }
}
