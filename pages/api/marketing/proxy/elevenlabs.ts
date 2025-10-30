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

    // Note: This requires ELEVENLABS_API_KEY environment variable
    const apiKey = process.env.ELEVENLABS_API_KEY

    if (!apiKey) {
      return res.status(200).json({
        success: false,
        error: 'ElevenLabs API key not configured',
        message: 'Voice generation requires ELEVENLABS_API_KEY'
      })
    }

    // Using default voice ID (Rachel)
    const voiceId = '21m00Tcm4TlvDq8ikWAM'
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: prompt,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error('ElevenLabs API request failed')
    }

    const audioBuffer = await response.arrayBuffer()
    const base64Audio = Buffer.from(audioBuffer).toString('base64')
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

    res.status(200).json({
      success: true,
      url: audioUrl,
      provider: 'elevenlabs'
    })
  } catch (error) {
    console.error('ElevenLabs error:', error)
    res.status(500).json({
      success: false,
      error: 'Voice generation failed'
    })
  }
}
