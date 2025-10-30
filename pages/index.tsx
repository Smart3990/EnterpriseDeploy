import { useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { Sparkles, ArrowRight, Code, Palette, Megaphone, Workflow as WorkflowIcon, Loader2, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const { theme } = useTheme()
  const [prompt, setPrompt] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ provider: string; content: string }[]>([])

  const handleIntelligentGenerate = async () => {
    if (!aiPrompt.trim()) return
    
    setLoading(true)
    const providers = ['groq', 'gemini', 'huggingface']
    let success = false
    let usedProvider = ''
    
    try {
      for (const provider of providers) {
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: aiPrompt, provider }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success) {
              usedProvider = provider
              setResults(prev => [{ provider, content: data.content }, ...prev])
              success = true
              break
            }
          }
        } catch (e) {
          continue
        }
      }
      
      if (!success) {
        alert('All AI providers failed. Please check your API keys.')
      }
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <div className={`inline-block px-4 py-2 rounded-full text-sm backdrop-blur-sm mb-6 ${
            theme === 'dark'
              ? 'bg-white/5 border border-white/10 text-gray-300'
              : 'bg-purple-100 border border-purple-200 text-purple-900'
          }`}>
            Introducing DevIgnite AI x Enterprise Suite
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Build something
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Lovable
            </span>
          </h1>

          <p className={`text-xl max-w-2xl mx-auto mb-12 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Create apps and websites by chatting with AI
          </p>

          <div className={`max-w-3xl mx-auto backdrop-blur-md rounded-2xl border p-2 ${
            theme === 'dark'
              ? 'bg-black/40 border-white/10 shadow-2xl shadow-pink-500/20'
              : 'bg-white/90 border-gray-300 shadow-2xl shadow-purple-200'
          }`}>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask DevIgnite to create a web app"
                className={`flex-1 bg-transparent px-6 py-4 outline-none text-lg ${
                  theme === 'dark'
                    ? 'text-white placeholder-gray-500'
                    : 'text-gray-900 placeholder-gray-500'
                }`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 transition-all flex items-center gap-2 group">
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AI Studio</h2>
        
        <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-8 mb-12`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Intelligent AI Generator
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Automatically selects the best provider (Groq → Gemini → HuggingFace)
              </p>
            </div>
          </div>

          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe what you want to create..."
            className={`w-full p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm transition-all ${
              theme === 'dark' 
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            } border`}
            rows={4}
          />

          <button
            onClick={handleIntelligentGenerate}
            disabled={loading || !aiPrompt.trim()}
            className="mt-4 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                <span>Generate with AI</span>
              </>
            )}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Recent Generations
            </h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-6 transition-all`}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 text-xs font-medium rounded-full">
                      Provider: {result.provider}
                    </span>
                  </div>
                  <p className={`leading-relaxed whitespace-pre-wrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {result.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Feature Suite
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-8 transition-all cursor-pointer group`}>
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                AI Studio
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Multi-provider AI with intelligent fallback
              </p>
            </div>
          </Link>

          <Link href="/marketing">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-8 transition-all cursor-pointer group`}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
                <Megaphone className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Marketing Suite
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                AI content generation and social scheduling
              </p>
            </div>
          </Link>

          <Link href="/design">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-8 transition-all cursor-pointer group`}>
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Design Studio
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Canvas-based visual design tool
              </p>
            </div>
          </Link>

          <Link href="/automation">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-8 transition-all cursor-pointer group`}>
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
                <WorkflowIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Automation
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                n8n workflow automation platform
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
