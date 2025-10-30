import { useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { 
  Workflow, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Zap, 
  Download,
  ExternalLink,
  Database,
  MessageSquare,
  Bot,
  FileText,
  Mail,
  TrendingUp,
  Smartphone,
  Code,
  Globe,
  Cloud
} from 'lucide-react'

export default function Automation() {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<'templates' | 'myWorkflows'>('templates')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const n8nWorkflowCategories = [
    {
      id: 'ai-rag',
      name: 'AI & RAG Pipelines',
      icon: Bot,
      color: 'from-purple-500 to-indigo-600',
      count: 45,
      description: 'Vector DBs, embeddings, OpenAI GPT-4, Claude 3, LLM chains',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/AI'
    },
    {
      id: 'data-etl',
      name: 'Data & ETL',
      icon: Database,
      color: 'from-blue-500 to-cyan-600',
      count: 30,
      description: 'PostgreSQL, MongoDB, Redis, data transformations',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Data'
    },
    {
      id: 'automation',
      name: 'Business Automation',
      icon: Zap,
      color: 'from-yellow-500 to-orange-600',
      count: 35,
      description: 'Slack alerts, Google Sheets, workflow orchestration',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Business'
    },
    {
      id: 'communication',
      name: 'Communication & Alerts',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-600',
      count: 28,
      description: 'Slack, Email, SMS, Discord, Telegram notifications',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Communication'
    },
    {
      id: 'content',
      name: 'Content Generation',
      icon: FileText,
      color: 'from-pink-500 to-rose-600',
      count: 22,
      description: 'Document processing, OCR, AI writing, SEO automation',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Content'
    },
    {
      id: 'marketing',
      name: 'Marketing & CRM',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      count: 20,
      description: 'Lead scoring, email campaigns, analytics tracking',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Marketing'
    },
    {
      id: 'devops',
      name: 'DevOps & Monitoring',
      icon: Code,
      color: 'from-indigo-500 to-purple-600',
      count: 18,
      description: 'CI/CD pipelines, error tracking, deployment automation',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/DevOps'
    },
    {
      id: 'web-scraping',
      name: 'Web Scraping',
      icon: Globe,
      color: 'from-teal-500 to-cyan-600',
      count: 15,
      description: 'Data extraction, price monitoring, content aggregation',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Scraping'
    },
    {
      id: 'iot',
      name: 'IoT & APIs',
      icon: Smartphone,
      color: 'from-blue-600 to-indigo-600',
      count: 12,
      description: 'Sensor data, webhook integrations, API orchestration',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/IoT'
    },
    {
      id: 'cloud',
      name: 'Cloud Services',
      icon: Cloud,
      color: 'from-sky-500 to-blue-600',
      count: 15,
      description: 'AWS, Google Cloud, Azure integrations',
      githubPath: 'https://github.com/wassupjay/n8n-free-templates/tree/main/Cloud'
    }
  ]

  const myWorkflows = [
    {
      id: 1,
      name: 'AI Content Generator',
      description: 'Generate blog posts with GPT-4 and save to Notion',
      status: 'active',
      lastRun: '2 hours ago',
      icon: Bot,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Lead Enrichment Pipeline',
      description: 'Enrich leads from Airtable with Clearbit API',
      status: 'active',
      lastRun: '5 hours ago',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Error Alert System',
      description: 'Monitor errors and send Slack notifications',
      status: 'paused',
      lastRun: 'Yesterday',
      icon: MessageSquare,
      color: 'from-orange-500 to-red-500'
    }
  ]

  const filteredCategories = selectedCategory === 'all'
    ? n8nWorkflowCategories
    : n8nWorkflowCategories.filter(cat => cat.id === selectedCategory)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            n8n Workflow Automation
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            200+ production-ready workflows from GitHub • Free to import and customize
          </p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
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
              n8n Templates (200+)
            </button>
            <button
              onClick={() => setActiveTab('myWorkflows')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'myWorkflows'
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
          </div>

          <a
            href="https://github.com/wassupjay/n8n-free-templates"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center space-x-2"
          >
            <Download className="h-5 w-5" />
            <span>Download from GitHub</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {activeTab === 'templates' ? (
          <>
            <div className={`rounded-2xl border p-8 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-400/30'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    🚀 wassupjay/n8n-free-templates
                  </h3>
                  <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    200+ plug-and-play workflows with AI, Vector DBs, and LLM integrations
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-white/80'}`}>
                  <Zap className={`h-8 w-8 mb-3 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Production Ready
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Import JSON → Add credentials → Hit Activate ✅
                  </p>
                </div>
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-white/80'}`}>
                  <Bot className={`h-8 w-8 mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    AI Stack
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    RAG, Pinecone, Weaviate, OpenAI GPT-4, Claude 3
                  </p>
                </div>
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-white/5' : 'bg-white/80'}`}>
                  <MessageSquare className={`h-8 w-8 mb-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                  <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Built-in Alerts
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Slack notifications, Google Sheets logs, error handling
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Browse by Category
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <a
                      key={category.id}
                      href={category.githubPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group rounded-2xl border p-8 hover:scale-[1.02] transition-all cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                          : 'bg-white border-gray-200 hover:shadow-xl'
                      }`}
                    >
                      <div className={`bg-gradient-to-br ${category.color} p-4 rounded-xl w-fit mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {category.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          theme === 'dark'
                            ? 'bg-white/10 text-purple-300'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {category.count}+
                        </span>
                      </div>
                      <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {category.description}
                      </p>
                      <div className="flex items-center space-x-2 text-sm font-medium text-purple-500 group-hover:text-purple-600">
                        <span>View on GitHub</span>
                        <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            <div className={`rounded-2xl border p-8 ${
              theme === 'dark'
                ? 'bg-white/5 backdrop-blur-sm border-white/10'
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                🔧 Tech Stack Matrix
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                    Vector Stores
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Pinecone', 'Weaviate', 'Supabase Vector', 'Redis'].map(tech => (
                      <span key={tech} className={`px-3 py-1 rounded-lg text-sm ${
                        theme === 'dark'
                          ? 'bg-white/5 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    LLM Providers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['OpenAI GPT-4', 'Claude 3', 'Hugging Face', 'Cohere'].map(tech => (
                      <span key={tech} className={`px-3 py-1 rounded-lg text-sm ${
                        theme === 'dark'
                          ? 'bg-white/5 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {myWorkflows.map((workflow) => {
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

            <div className={`rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center ${
              theme === 'dark'
                ? 'border-white/10 hover:border-white/20'
                : 'border-gray-300 hover:border-purple-300'
            } transition-all cursor-pointer`}>
              <Plus className={`h-12 w-12 mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Create New Workflow
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Import from GitHub or build from scratch
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
