import { useState } from 'react'
import Layout from '@/components/Layout'
import { Sparkles, Image, Mic, Video, Calendar, Zap } from 'lucide-react'

export default function Marketing() {
  const [mode, setMode] = useState<'text' | 'image' | 'voice' | 'video'>('text')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [platform, setPlatform] = useState('twitter')
  const [socialText, setSocialText] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')

  async function generate() {
    if (!prompt.trim()) return
    
    setLoading(true)
    try {
      const chain = {
        text: ['/api/marketing/proxy/groq', '/api/marketing/proxy/gemini', '/api/marketing/proxy/huggingface'],
        image: ['/api/marketing/proxy/pollinations', '/api/marketing/proxy/craiyon'],
        voice: ['/api/marketing/proxy/elevenlabs'],
        video: ['/api/marketing/proxy/deforum']
      } as Record<string, string[]>
      
      let output = null
      for (const endpoint of chain[mode]) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
          })
          const j = await res.json()
          if (j?.success || j?.url || j?.text || j?.content) {
            output = j
            break
          }
        } catch (e) {
          continue
        }
      }
      setResult(output)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function schedule() {
    try {
      const res = await fetch('/api/marketing/social/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, content: socialText, scheduledAt })
      })
      const j = await res.json()
      alert(j?.success ? 'Post scheduled successfully!' : 'Queued to fallback system')
      setSocialText('')
      setScheduledAt('')
    } catch (e) {
      alert('Schedule failed - please try again')
    }
  }

  const modeIcons = {
    text: Sparkles,
    image: Image,
    voice: Mic,
    video: Video
  }

  return (
    <Layout>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Marketing Suite</h1>
          <p className="text-lg text-gray-600">
            Generate AI content and schedule social media posts with intelligent fallback
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-lovable-600" />
                <span>AI Content Generator</span>
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {(['text', 'image', 'voice', 'video'] as const).map((m) => {
                    const Icon = modeIcons[m]
                    return (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center space-y-2 ${
                          mode === m
                            ? 'border-lovable-500 bg-lovable-50'
                            : 'border-gray-200 hover:border-lovable-200'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${mode === m ? 'text-lovable-600' : 'text-gray-400'}`} />
                        <span className={`text-sm font-medium capitalize ${mode === m ? 'text-lovable-700' : 'text-gray-600'}`}>
                          {m}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to generate..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lovable-500 focus:border-transparent resize-none text-sm placeholder:text-gray-400 transition-all"
                  rows={4}
                />

                <button
                  onClick={generate}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-lovable-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-lovable-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      <span>Generate {mode}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[200px]">
                {result ? (
                  <div className="space-y-3">
                    {result.url && (
                      <img src={result.url} alt="generated" className="w-full rounded-lg" />
                    )}
                    {(result.text || result.content) && (
                      <pre className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                        {result.text || result.content}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-12">
                    No content generated yet. Try creating something above!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-lovable-600" />
                <span>Social Media Scheduler</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lovable-500 focus:border-transparent text-sm transition-all"
                  >
                    <option value="twitter">Twitter / X</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content
                  </label>
                  <textarea
                    value={socialText}
                    onChange={(e) => setSocialText(e.target.value)}
                    placeholder="Write your post content..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lovable-500 focus:border-transparent resize-none text-sm placeholder:text-gray-400 transition-all"
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lovable-500 focus:border-transparent text-sm transition-all"
                  />
                </div>

                <button
                  onClick={schedule}
                  disabled={!socialText.trim() || !scheduledAt}
                  className="w-full bg-gradient-to-r from-lovable-600 to-lovable-500 text-white px-6 py-3 rounded-xl font-medium hover:from-lovable-700 hover:to-lovable-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Post</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-lovable-500 to-lovable-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Multi-Provider Fallback</span>
              </h3>
              <p className="text-lovable-100 text-sm mb-4">
                Automatically switches between providers to ensure your content is always generated successfully.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 rounded-lg p-2">
                  <span className="font-medium">Text:</span> Groq → Gemini → HF
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <span className="font-medium">Image:</span> Pollinations → Craiyon
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <span className="font-medium">Voice:</span> ElevenLabs
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <span className="font-medium">Video:</span> Deforum
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
