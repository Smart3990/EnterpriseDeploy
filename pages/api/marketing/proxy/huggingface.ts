import type { NextApiRequest, NextApiResponse } from 'next'
import { HfInference } from '@huggingface/inference'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY

    if (!apiKey) {
      throw new Error('HUGGINGFACE_API_KEY not configured')
    }

    const hf = new HfInference(apiKey)

    // Use a free text generation model
    const result = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
      }
    })

    res.status(200).json({
      success: true,
      text: result.generated_text,
      content: result.generated_text,
      provider: 'huggingface'
    })
  } catch (error) {
    console.error('HuggingFace error:', error)
    res.status(500).json({
      success: false,
      error: 'Text generation failed'
    })
  }
}
