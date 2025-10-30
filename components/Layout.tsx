import { ReactNode } from 'react'
import { Sparkles, Workflow, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-2 rounded-xl shadow-lg shadow-pink-500/30">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">DevIgnite AI</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
                Studio
              </Link>
              <Link href="/marketing" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/marketing' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
                Marketing
              </Link>
              <Link href="/design" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/design' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
                Design
              </Link>
              <Link href="/analytics" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/analytics' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
                Analytics
              </Link>
              <Link href="/automation" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/automation' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
                Automation
              </Link>
              <Link href="/settings" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/settings' 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>
    </div>
  )
}
