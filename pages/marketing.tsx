import { useState } from 'react'
import Layout from '@/components/Layout'
import { useTheme } from '@/contexts/ThemeContext'
import { Sparkles, Image, Mic, Video, Calendar, Zap } from 'lucide-react'

export default function Marketing() {
  const { theme } = useTheme()
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
          // Accept responses with content OR helpful messages
          if (j?.success || j?.url || j?.text || j?.content || j?.message) {
            output = j
            // Only break if we have actual content, continue trying if just a message
            if (j?.success || j?.url || j?.text || j?.content) {
              break
            } else if (!output || !output.message) {
              output = j // Store message but keep trying
            }
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
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Marketing Suite
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate AI content and schedule social media posts with intelligent fallback
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white border-gray-200'} border rounded-2xl p-8`}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Sparkles className="h-5 w-5 text-purple-400" />
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
                            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50'
                            : theme === 'dark' 
                              ? 'bg-white/5 border-white/10 hover:border-purple-400/30' 
                              : 'bg-gray-50 border-gray-200 hover:border-purple-400/30'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${mode === m ? 'text-purple-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                        <span className={`text-sm font-medium capitalize ${mode === m ? theme === 'dark' ? 'text-white' : 'text-gray-900' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
                  className={`w-full p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm transition-all ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } border`}
                  rows={4}
                />

                <button
                  onClick={generate}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
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

              <div className={`mt-6 p-6 rounded-xl min-h-[200px] ${
                theme === 'dark' 
                  ? 'bg-white/5 backdrop-blur-sm border-white/10' 
                  : 'bg-gray-50 border-gray-200'
              } border`}>
                {result ? (
                  <div className="space-y-3">
                    {result.url && mode === 'image' && (
                      <img src={result.url} alt="generated" className="w-full rounded-lg" />
                    )}
                    {result.url && mode === 'voice' && (
                      <div className="space-y-3">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Generated Voice:
                        </p>
                        <audio controls className="w-full">
                          <source src={result.url} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    )}
                    {result.url && mode === 'video' && (
                      <div className="space-y-3">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Generated Video:
                        </p>
                        <video controls className="w-full rounded-lg">
                          <source src={result.url} type="video/mp4" />
                          Your browser does not support the video element.
                        </video>
                      </div>
                    )}
                    {(result.text || result.content) && (
                      <div className="space-y-2">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Generated Text:
                        </p>
                        <div className={`p-4 rounded-lg ${
                          theme === 'dark' 
                            ? 'bg-white/5 border-white/10' 
                            : 'bg-white border-gray-200'
                        } border`}>
                          <pre className={`whitespace-pre-wrap text-sm leading-relaxed ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {result.text || result.content}
                          </pre>
                        </div>
                      </div>
                    )}
                    {result.message && !result.url && !result.text && !result.content && (
                      <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                        <p className="text-sm text-yellow-300">{result.message}</p>
                      </div>
                    )}
                    {result.provider && (
                      <div className={`mt-3 pt-3 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'} border-t`}>
                        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-400/30">
                          Provider: {result.provider}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    No content generated yet. Try creating something above!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${theme === 'dark' ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10' : 'bg-white border-gray-200 hover:shadow-md'} border rounded-2xl p-8 transition-all`}>
              <h2 className={`text-xl font-semibold mb-6 flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="h-5 w-5 text-purple-400" />
                <span>Social Media Scheduler</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className={`w-full p-3.5 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  >
                    <option value="twitter">Twitter / X</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Post Content
                  </label>
                  <textarea
                    value={socialText}
                    onChange={(e) => setSocialText(e.target.value)}
                    placeholder="Write your post content..."
                    className={`w-full p-4 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    } border`}
                    rows={6}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Schedule Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className={`w-full p-3.5 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                </div>

                <button
                  onClick={schedule}
                  disabled={!socialText.trim() || !scheduledAt}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule Post</span>
                </button>
              </div>
            </div>

            <div className={`rounded-2xl p-6 backdrop-blur-sm ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            } border`}>
              <h3 className={`text-lg font-semibold mb-3 flex items-center space-x-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                <Zap className="h-5 w-5 text-purple-400" />
                <span>Multi-Provider Fallback</span>
              </h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Automatically switches between providers to ensure your content is always generated successfully.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={`rounded-lg p-2 ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white/60 text-gray-900'
                }`}>
                  <span className="font-medium">Text:</span> Groq → Gemini → HF
                </div>
                <div className={`rounded-lg p-2 ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white/60 text-gray-900'
                }`}>
                  <span className="font-medium">Image:</span> Pollinations → Craiyon
                </div>
                <div className={`rounded-lg p-2 ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white/60 text-gray-900'
                }`}>
                  <span className="font-medium">Voice:</span> ElevenLabs
                </div>
                <div className={`rounded-lg p-2 ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white/60 text-gray-900'
                }`}>
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
