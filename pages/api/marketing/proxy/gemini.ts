import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    res.status(200).json({
      success: true,
      text: text,
      content: text,
      provider: 'gemini'
    })
  } catch (error) {
    console.error('Gemini error:', error)
    res.status(500).json({
      success: false,
      error: 'Text generation failed'
    })
  }
}
