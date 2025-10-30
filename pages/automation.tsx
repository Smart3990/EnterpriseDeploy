import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Workflow, Play, Settings, Clock } from 'lucide-react'

export default function Automation() {
  const [workflows, setWorkflows] = useState<any[]>([])

  const mockWorkflows = [
    { id: '1', name: 'Email Marketing Campaign', status: 'active', lastRun: '2 hours ago' },
    { id: '2', name: 'Lead Scoring Automation', status: 'active', lastRun: '5 hours ago' },
    { id: '3', name: 'Social Media Publisher', status: 'paused', lastRun: '1 day ago' },
    { id: '4', name: 'Data Sync Pipeline', status: 'active', lastRun: '30 minutes ago' },
  ]

  useEffect(() => {
    setWorkflows(mockWorkflows)
  }, [])

  const handleTrigger = async (workflowId: string) => {
    try {
      const response = await fetch('/api/automation/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflowId }),
      })

      const data = await response.json()
      alert(data.success ? 'Workflow triggered!' : `Error: ${data.message}`)
    } catch (error) {
      console.error('Failed to trigger workflow:', error)
    }
  }

  return (
    <Layout>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Automation</h1>
          <p className="text-lg text-gray-600">Manage your n8n automation workflows</p>
        </div>

        <div className="bg-gradient-to-br from-lovable-500 to-lovable-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">800+ Automation Templates</h2>
              <p className="text-lovable-100">Connect your apps and automate workflows with n8n</p>
            </div>
            <Workflow className="h-16 w-16 opacity-30" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Workflows</h2>
          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between hover:border-lovable-200 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-lovable-100 rounded-lg">
                    <Workflow className="h-5 w-5 text-lovable-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{workflow.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Last run: {workflow.lastRun}</span>
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        workflow.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTrigger(workflow.id)}
                    className="px-4 py-2 bg-lovable-600 text-white rounded-lg hover:bg-lovable-700 transition-all flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Trigger</span>
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
