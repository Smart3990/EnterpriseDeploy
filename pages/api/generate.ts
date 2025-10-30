import type { NextApiRequest, NextApiResponse } from 'next'
import { aiService } from '@/services/aiService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, provider } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const content = await aiService.generateText(prompt, { provider: provider || 'groq' })

    res.status(200).json({ success: true, content })
  } catch (error: any) {
    console.error('Generation error:', error)
    res.status(500).json({ success: false, error: error.message || 'Failed to generate content' })
  }
}
