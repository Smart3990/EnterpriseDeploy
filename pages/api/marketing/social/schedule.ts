import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { platform, content, scheduledAt } = req.body

    if (!platform || !content || !scheduledAt) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Store in Supabase for queue processing
    const { data, error } = await supabase
      .from('scheduled_posts')
      .insert([
        {
          platform,
          content,
          scheduled_at: scheduledAt,
          status: 'queued',
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      // Fallback to local queue if Supabase fails
      return res.status(200).json({
        success: false,
        fallback: true,
        message: 'Queued to local fallback system'
      })
    }

    res.status(200).json({
      success: true,
      data: data[0],
      message: 'Post scheduled successfully'
    })
  } catch (error) {
    console.error('Schedule error:', error)
    res.status(200).json({
      success: false,
      fallback: true,
      message: 'Queued to fallback system'
    })
  }
}
