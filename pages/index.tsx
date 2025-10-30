import { useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { Sparkles, ArrowRight, Loader2, Zap } from 'lucide-react'

export default function Home() {
  const { theme } = useTheme()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ provider: string; content: string }[]>([])

  const handleIntelligentGenerate = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    const providers = ['groq', 'gemini', 'huggingface']
    let success = false
    
    try {
      for (const provider of providers) {
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, provider }),
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success) {
              setResults(prev => [{ provider, content: data.content }, ...prev])
              success = true
              setPrompt('')
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleIntelligentGenerate()
    }
  }

  return (
    <Layout>
      {/* Animated Wavy Gradient Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 animate-gradient-wave"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 opacity-20 animate-gradient-wave-reverse"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500 via-blue-500 to-cyan-500 opacity-15 animate-gradient-wave-slow"></div>
      </div>

      <style jsx>{`
        @keyframes gradient-wave {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translate(10%, -10%) scale(1.1) rotate(5deg);
            opacity: 0.25;
          }
          66% {
            transform: translate(-10%, 10%) scale(0.9) rotate(-5deg);
            opacity: 0.15;
          }
        }

        @keyframes gradient-wave-reverse {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.2;
          }
          33% {
            transform: translate(-10%, 10%) scale(0.9) rotate(-5deg);
            opacity: 0.15;
          }
          66% {
            transform: translate(10%, -10%) scale(1.1) rotate(5deg);
            opacity: 0.25;
          }
        }

        @keyframes gradient-wave-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.15;
          }
          50% {
            transform: translate(5%, 5%) scale(1.05) rotate(3deg);
            opacity: 0.2;
          }
        }

        .animate-gradient-wave {
          animation: gradient-wave 20s ease-in-out infinite;
        }

        .animate-gradient-wave-reverse {
          animation: gradient-wave-reverse 25s ease-in-out infinite;
        }

        .animate-gradient-wave-slow {
          animation: gradient-wave-slow 30s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-6xl mx-auto space-y-12">
          {/* Badge */}
          <div className={`inline-block px-6 py-3 rounded-full text-sm backdrop-blur-md mb-6 animate-fade-in ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-gray-200'
              : 'bg-purple-100/80 border border-purple-300 text-purple-900'
          }`}>
            ✨ Introducing DevIgnite AI Enterprise Suite
          </div>

          {/* Hero Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse-slow">
              Build Something
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>

          {/* Tagline */}
          <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-16 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            All-in-one AI development, automation, and marketing suite designed for enterprises
          </p>

          {/* Single Unified Input Field */}
          <div className="max-w-4xl mx-auto">
            <div className={`backdrop-blur-xl rounded-3xl border-2 p-3 transition-all duration-300 hover:scale-[1.02] ${
              theme === 'dark'
                ? 'bg-black/30 border-white/20 shadow-2xl shadow-purple-500/30'
                : 'bg-white/80 border-purple-300 shadow-2xl shadow-purple-300/50'
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full relative">
                  <Sparkles className={`absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <input
                    type="text"
                    placeholder="Ask DevIgnite to create anything..."
                    className={`w-full bg-transparent pl-16 pr-6 py-6 outline-none text-lg font-medium ${
                      theme === 'dark'
                        ? 'text-white placeholder-gray-400'
                        : 'text-gray-900 placeholder-gray-500'
                    }`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                  />
                </div>
                <button
                  onClick={handleIntelligentGenerate}
                  disabled={loading || !prompt.trim()}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-10 py-6 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3 group whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6 group-hover:scale-110 transition-transform" />
                      <span>Generate</span>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Intelligent Provider Info */}
            <div className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Intelligent AI routing: Groq → Gemini → HuggingFace</span>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            {[
              '🤖 Multi-AI Providers',
              '⚡ Instant Fallback',
              '🎨 Design Studio',
              '🔄 Automation',
              '📊 Analytics',
            ].map((feature) => (
              <div
                key={feature}
                className={`px-6 py-3 rounded-full backdrop-blur-md transition-all hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    : 'bg-white/60 border border-gray-200 text-gray-700 hover:bg-white/80'
                }`}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className={`text-3xl font-bold mb-8 flex items-center space-x-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <Sparkles className="h-8 w-8 text-purple-500" />
            <span>AI Generations</span>
          </h2>
          <div className="grid gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl rounded-3xl border p-8 transition-all hover:scale-[1.01] ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-white/80 border-gray-200 hover:shadow-xl hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-400/30 rounded-full">
                    <span className={`text-sm font-bold ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                      ✨ {result.provider.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                </div>
                <div className={`leading-relaxed whitespace-pre-wrap text-lg ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {result.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </Layout>
  )
}
