import { useState } from 'react'
import { motion } from 'framer-motion'
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
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Wand2 className="h-6 w-6 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
        rows={4}
      />

      <motion.button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-4 w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Wand2 className="h-5 w-5" />
            <span>Generate with {provider}</span>
          </>
        )}
      </motion.button>
    </motion.div>
  )
}
