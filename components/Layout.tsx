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
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="bg-gradient-to-br from-lovable-500 to-lovable-600 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">DevIgnite AI</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-1">
              <NavLink 
                href="/" 
                icon={<Sparkles className="h-4 w-4" />} 
                text="Studio" 
                isActive={router.pathname === '/'}
              />
              <NavLink 
                href="/marketing" 
                icon={<BarChart3 className="h-4 w-4" />} 
                text="Marketing"
                isActive={router.pathname === '/marketing'}
              />
              <NavLink 
                href="/design" 
                icon={<Sparkles className="h-4 w-4" />} 
                text="Design"
                isActive={router.pathname === '/design'}
              />
              <NavLink 
                href="/analytics" 
                icon={<BarChart3 className="h-4 w-4" />} 
                text="Analytics"
                isActive={router.pathname === '/analytics'}
              />
              <NavLink 
                href="/automation" 
                icon={<Workflow className="h-4 w-4" />} 
                text="Automation"
                isActive={router.pathname === '/automation'}
              />
              <NavLink 
                href="/settings" 
                icon={<Settings className="h-4 w-4" />} 
                text="Settings"
                isActive={router.pathname === '/settings'}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, text, isActive }: { href: string; icon: ReactNode; text: string; isActive?: boolean }) {
  return (
    <Link href={href}>
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
        isActive 
          ? 'bg-lovable-50 text-lovable-700 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}>
        {icon}
        <span className="text-sm">{text}</span>
      </div>
    </Link>
  )
}
