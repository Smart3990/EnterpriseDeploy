import { useState } from 'react'
import Layout from '@/components/Layout'
import AIGeneratorCard from '@/components/AIGeneratorCard'
import { Sparkles, Zap, Cpu } from 'lucide-react'

export default function Home() {
  const [results, setResults] = useState<{ provider: string; content: string }[]>([])

  const handleGenerate = async (prompt: string, provider: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, provider }),
      })

      const data = await response.json()
      
      if (data.success) {
        setResults(prev => [{ provider, content: data.content }, ...prev])
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate content. Please check your API keys.')
    }
  }

  return (
    <Layout>
      <div className="space-y-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Build something with AI
          </h1>
          <p className="text-lg text-gray-600">
            Enterprise AI development platform with multi-provider support and intelligent fallback
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">AI Studio</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />
                <span>3 providers active</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <AIGeneratorCard
              title="Groq"
              description="Lightning-fast LLM inference"
              provider="groq"
              onGenerate={handleGenerate}
            />
            
            <AIGeneratorCard
              title="Google Gemini"
              description="Multimodal AI from Google"
              provider="gemini"
              onGenerate={handleGenerate}
            />
            
            <AIGeneratorCard
              title="HuggingFace"
              description="100,000+ open-source models"
              provider="huggingface"
              onGenerate={handleGenerate}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-lovable-500 to-lovable-600 rounded-2xl p-8 text-white">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="h-6 w-6" />
              <h3 className="text-2xl font-bold">Multi-Provider Fallback</h3>
            </div>
            <p className="text-lovable-100 mb-6">
              Automatic failover across AI providers ensures 99.9% uptime. If one provider is down, your requests seamlessly switch to available alternatives.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-lovable-200" />
                <span className="text-sm">Zero downtime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-lovable-200" />
                <span className="text-sm">Smart routing</span>
              </div>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Generations</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-lovable-200 transition-all"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 bg-lovable-100 text-lovable-700 text-xs font-medium rounded-full">
                      {result.provider}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
