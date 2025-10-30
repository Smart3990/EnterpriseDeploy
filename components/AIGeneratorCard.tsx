import { useState } from 'react'
import { Wand2, Loader2 } from 'lucide-react'

interface AIGeneratorCardProps {
  title: string
  description: string
  provider: 'groq' | 'gemini' | 'huggingface'
  onGenerate: (prompt: string, provider: string) => Promise<void>
}

export default function AIGeneratorCard({ title, description, provider, onGenerate }: AIGeneratorCardProps) {
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
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-lovable-200 hover:shadow-sm transition-all duration-200">
      <div className="mb-5">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-lovable-100 rounded-lg">
            <Wand2 className="h-5 w-5 text-lovable-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 ml-12">{description}</p>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to create..."
        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lovable-500 focus:border-transparent resize-none text-sm placeholder:text-gray-400 transition-all"
        rows={3}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-4 w-full bg-lovable-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-lovable-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
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
