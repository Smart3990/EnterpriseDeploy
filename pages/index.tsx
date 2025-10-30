import { useState } from 'react'
import Layout from '@/components/Layout'
import AIGeneratorCard from '@/components/AIGeneratorCard'
import { motion } from 'framer-motion'
import { Brain, Image, Mic, Video } from 'lucide-react'

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
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome to DevIgnite AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-Ready AI Development Suite with Multi-Provider Fallback
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <AIGeneratorCard
            title="Text Generation"
            description="Generate content with Groq, Gemini, or HuggingFace"
            provider="groq"
            onGenerate={handleGenerate}
          />
          
          <AIGeneratorCard
            title="AI Content with Gemini"
            description="Powered by Google Gemini Pro"
            provider="gemini"
            onGenerate={handleGenerate}
          />
          
          <AIGeneratorCard
            title="HuggingFace Models"
            description="Access 100,000+ open-source models"
            provider="huggingface"
            onGenerate={handleGenerate}
          />

          <motion.div
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Multi-AI Fallback</h3>
            </div>
            <p className="text-white/90 mb-4">
              Automatic failover across providers ensures 99.9% uptime for your AI features
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span>Groq</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span>Gemini</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                <span>HuggingFace</span>
              </div>
            </div>
          </motion.div>
        </div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Recent Generations</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-primary-600 uppercase">
                      {result.provider}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{result.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
