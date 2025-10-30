import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Workflow, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <motion.div
                  className="flex items-center space-x-2 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="h-8 w-8 text-primary-600" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                    DevIgnite AI
                  </span>
                </motion.div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <NavLink href="/" icon={<Sparkles className="h-5 w-5" />} text="AI Studio" />
              <NavLink href="/analytics" icon={<BarChart3 className="h-5 w-5" />} text="Analytics" />
              <NavLink href="/automation" icon={<Workflow className="h-5 w-5" />} text="Automation" />
              <NavLink href="/settings" icon={<Settings className="h-5 w-5" />} text="Settings" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, text }: { href: string; icon: ReactNode; text: string }) {
  return (
    <Link href={href}>
      <motion.div
        className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </motion.div>
    </Link>
  )
}
