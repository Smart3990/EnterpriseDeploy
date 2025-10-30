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

    const response = await fetch('https://api.craiyon.com/v3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        token: null,
        model: 'art',
        negative_prompt: ''
      })
    })

    if (!response.ok) {
      throw new Error('Craiyon API request failed')
    }

    const data = await response.json()
    
    if (data.images && data.images.length > 0) {
      const imageUrl = `data:image/jpeg;base64,${data.images[0]}`
      res.status(200).json({
        success: true,
        url: imageUrl,
        provider: 'craiyon'
      })
    } else {
      throw new Error('No images returned')
    }
  } catch (error) {
    console.error('Craiyon error:', error)
    res.status(500).json({
      success: false,
      error: 'Image generation failed'
    })
  }
}
