import axios from 'axios'

export class N8NService {
  private endpoint: string
  private apiKey: string

  constructor() {
    this.endpoint = process.env.N8N_ENDPOINT || ''
    this.apiKey = process.env.N8N_API_KEY || ''
  }

  async triggerWorkflow(workflowId: string, data: any = {}) {
    if (!this.endpoint || !this.apiKey) {
      console.warn('n8n not configured')
      return { success: false, message: 'n8n not configured' }
    }

    try {
      const response = await axios.post(
        `${this.endpoint}/webhook/${workflowId}`,
        data,
        {
          headers: {
            'X-N8N-API-KEY': this.apiKey,
            'Content-Type': 'application/json',
          },
        }
      )

      return { success: true, data: response.data }
    } catch (error: any) {
      console.error('n8n workflow trigger failed:', error)
      return { success: false, error: error.message }
    }
  }

  async getWorkflows() {
    if (!this.endpoint || !this.apiKey) {
      return []
    }

    try {
      const response = await axios.get(`${this.endpoint}/workflows`, {
        headers: {
          'X-N8N-API-KEY': this.apiKey,
        },
      })

      return response.data
    } catch (error) {
      console.error('Failed to fetch workflows:', error)
      return []
    }
  }
}

export const n8nService = new N8NService()
