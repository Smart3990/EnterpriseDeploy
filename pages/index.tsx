import { useState } from 'react'
import Layout from '@/components/Layout'
import { Sparkles, ArrowRight, Code, Palette, Megaphone, Workflow as WorkflowIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [prompt, setPrompt] = useState('')

  return (
    <Layout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 backdrop-blur-sm mb-6">
            Introducing DevIgnite AI x Enterprise Suite
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Build something
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Lovable
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Create apps and websites by chatting with AI
          </p>

          <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-2 shadow-2xl shadow-pink-500/20">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask DevIgnite to create a web app"
                className="flex-1 bg-transparent text-white placeholder-gray-500 px-6 py-4 outline-none text-lg"
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

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Studio</h3>
              <p className="text-gray-400 text-sm">Multi-provider AI with intelligent fallback</p>
            </div>
          </Link>

          <Link href="/marketing">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all">
                <Megaphone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Marketing Suite</h3>
              <p className="text-gray-400 text-sm">AI content generation and social scheduling</p>
            </div>
          </Link>

          <Link href="/design">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all">
                <Palette className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Design Studio</h3>
              <p className="text-gray-400 text-sm">Canvas-based visual design tool</p>
            </div>
          </Link>

          <Link href="/automation">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all cursor-pointer group">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-500 p-3 rounded-xl w-fit mb-4 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all">
                <WorkflowIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Automation</h3>
              <p className="text-gray-400 text-sm">n8n workflow automation platform</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
