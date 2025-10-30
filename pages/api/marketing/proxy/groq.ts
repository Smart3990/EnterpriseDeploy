import type { NextApiRequest, NextApiResponse } from 'next'
import Groq from 'groq-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    })

    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not configured')
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024
    })

    const content = chatCompletion.choices[0]?.message?.content || ''

    res.status(200).json({
      success: true,
      text: content,
      content: content,
      provider: 'groq'
    })
  } catch (error) {
    console.error('Groq error:', error)
    res.status(500).json({
      success: false,
      error: 'Text generation failed'
    })
  }
}
