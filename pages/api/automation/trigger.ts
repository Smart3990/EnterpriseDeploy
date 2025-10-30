import type { NextApiRequest, NextApiResponse } from 'next'
import { n8nService } from '@/services/n8nService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { workflowId, data } = req.body

    if (!workflowId) {
      return res.status(400).json({ error: 'Workflow ID is required' })
    }

    const result = await n8nService.triggerWorkflow(workflowId, data)

    res.status(200).json(result)
  } catch (error: any) {
    console.error('Workflow trigger error:', error)
    res.status(500).json({ success: false, error: error.message || 'Failed to trigger workflow' })
  }
}
