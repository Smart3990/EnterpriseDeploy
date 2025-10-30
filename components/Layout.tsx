import { ReactNode } from 'react'
import { Sparkles, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from '@/contexts/ThemeContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <nav className={`border-b transition-colors duration-300 ${
        theme === 'dark'
          ? 'border-white/10 bg-black/20 backdrop-blur-sm'
          : 'border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-2 rounded-xl shadow-lg shadow-pink-500/30">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  DevIgnite AI
                </span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/' 
                  ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-900'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Studio
              </Link>
              <Link href="/marketing" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/marketing' 
                  ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-900'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Marketing
              </Link>
              <Link href="/design" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/design' 
                  ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-900'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Design
              </Link>
              <Link href="/analytics" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/analytics' 
                  ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-900'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Analytics
              </Link>
              <Link href="/automation" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/automation' 
                  ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-900'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Automation
              </Link>
              <Link href="/settings" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                router.pathname === '/settings' 
                  ? theme === 'dark' ? 'bg-white/10 text-white' : 'bg-purple-100 text-purple-900'
                  : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}>
                Settings
              </Link>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ml-2 ${
                  theme === 'dark'
                    ? 'bg-white/10 text-yellow-300 hover:bg-white/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
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
