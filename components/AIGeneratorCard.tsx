import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Wand2, Loader2 } from 'lucide-react'

interface AIGeneratorCardProps {
  title: string
  description: string
  provider: 'groq' | 'gemini' | 'huggingface'
  onGenerate: (prompt: string, provider: string) => Promise<void>
}

export default function AIGeneratorCard({ title, description, provider, onGenerate }: AIGeneratorCardProps) {
  const { theme } = useTheme()
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setLoading(true)
    try {
      await onGenerate(prompt, provider)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-6 transition-all duration-200`}>
      <div className="mb-5">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
            <Wand2 className="h-5 w-5 text-purple-400" />
          </div>
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <p className={`text-sm ml-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to create..."
        className={`w-full p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm transition-all ${
          theme === 'dark'
            ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
        } border`}
        rows={3}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-4 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4" />
            <span>Generate</span>
          </>
        )}
      </button>
    </div>
  )
}
