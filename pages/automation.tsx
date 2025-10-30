import { useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { Workflow, Play, Pause, Settings, Plus, Zap, Calendar, Mail, MessageSquare, Database } from 'lucide-react'

export default function Automation() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'workflows' | 'templates'>('workflows')

  const workflows = [
    {
      id: 1,
      name: 'Social Media Auto-Poster',
      description: 'Automatically post generated content to social media platforms',
      status: 'active',
      lastRun: '2 hours ago',
      icon: MessageSquare,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Content Generation Pipeline',
      description: 'Generate, review, and publish content automatically',
      status: 'active',
      lastRun: '5 hours ago',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      name: 'Database Sync',
      description: 'Sync generated content across databases',
      status: 'paused',
      lastRun: 'Yesterday',
      icon: Database,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const templates = [
    {
      name: 'Email Automation',
      description: 'Send automated emails based on triggers',
      icon: Mail,
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Scheduled Tasks',
      description: 'Run tasks on a schedule',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'Webhook Integrations',
      description: 'Connect external services via webhooks',
      icon: Workflow,
      color: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Automation Workflows
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Build and manage automated workflows with visual automation builder
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('workflows')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'workflows'
                  ? theme === 'dark'
                    ? 'bg-white/10 text-white'
                    : 'bg-purple-100 text-purple-900'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Workflows
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'templates'
                  ? theme === 'dark'
                    ? 'bg-white/10 text-white'
                    : 'bg-purple-100 text-purple-900'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Templates
            </button>
          </div>

          <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Workflow</span>
          </button>
        </div>

        {activeTab === 'workflows' ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {workflows.map((workflow) => {
              const Icon = workflow.icon
              return (
                <div
                  key={workflow.id}
                  className={`rounded-2xl border p-8 hover:scale-[1.02] transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                      : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`bg-gradient-to-br ${workflow.color} p-3 rounded-xl shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {workflow.name}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {workflow.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {workflow.status === 'active' ? (
                        <button className={`p-2 rounded-lg transition-all ${
                          theme === 'dark'
                            ? 'bg-white/10 hover:bg-white/20 text-green-400'
                            : 'bg-gray-100 hover:bg-gray-200 text-green-600'
                        }`}>
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className={`p-2 rounded-lg transition-all ${
                          theme === 'dark'
                            ? 'bg-white/10 hover:bg-white/20 text-blue-400'
                            : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
                        }`}>
                          <Play className="h-4 w-4" />
                        </button>
                      )}
                      <button className={`p-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20 text-gray-400'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}>
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${
                        workflow.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <span className={`text-sm font-medium capitalize ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      Last run: {workflow.lastRun}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((template) => {
              const Icon = template.icon
              return (
                <div
                  key={template.name}
                  className={`rounded-2xl border p-8 hover:scale-[1.02] transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                      : 'bg-white border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${template.color} p-4 rounded-xl w-fit mb-6 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {template.name}
                  </h3>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                  <button className={`text-sm font-medium ${
                    theme === 'dark'
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-purple-600 hover:text-purple-700'
                  }`}>
                    Use Template →
                  </button>
                </div>
              )
            })}
          </div>
        )}

        <div className={`rounded-2xl border p-8 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/30'
            : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
        }`}>
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg shadow-purple-500/30">
              <Workflow className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Visual Workflow Builder
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Build complex automation workflows with drag-and-drop interface
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-white/5' : 'bg-white/80'
            }`}>
              <Zap className={`h-8 w-8 mb-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Fast Execution
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Run workflows in milliseconds with optimized execution engine
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-white/5' : 'bg-white/80'
            }`}>
              <Settings className={`h-8 w-8 mb-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Flexible Configuration
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Customize every aspect of your automation workflows
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-white/5' : 'bg-white/80'
            }`}>
              <Database className={`h-8 w-8 mb-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Data Integration
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Connect to databases, APIs, and external services seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

