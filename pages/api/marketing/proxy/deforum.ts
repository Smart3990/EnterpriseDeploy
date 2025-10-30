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

    // Note: Deforum typically requires complex setup
    // This is a placeholder that returns a message
    res.status(200).json({
      success: false,
      message: 'Video generation requires complex setup. Consider using Runway ML or Stable Diffusion with Deforum extension.',
      prompt: prompt,
      provider: 'deforum'
    })
  } catch (error) {
    console.error('Deforum error:', error)
    res.status(500).json({
      success: false,
      error: 'Video generation not available'
    })
  }
}
