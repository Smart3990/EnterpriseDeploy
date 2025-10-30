import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
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
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Workflow Automation</h1>
          <p className="text-gray-600">Manage your n8n automation workflows</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-blue-600 rounded-xl shadow-lg p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">800+ Automation Templates</h2>
              <p className="text-white/90">Connect your apps and automate workflows with n8n</p>
            </div>
            <Workflow className="h-20 w-20 opacity-50" />
          </div>
        </motion.div>

        <div className="grid gap-6">
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Workflow className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Last run: {workflow.lastRun}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                <motion.button
                  onClick={() => handleTrigger(workflow.id)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-4 w-4" />
                  <span>Trigger</span>
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
