import type { NextApiRequest, NextApiResponse } from 'next'
import { aiService } from '@/services/aiService'

const DEMO_RESPONSES = [
  `🚀 **DevIgnite AI Enterprise Suite**

I'm an AI-powered development assistant that helps you build amazing applications! Here's what I can do:

✨ **Features:**
- Generate code snippets and full applications
- Create beautiful UI components with Tailwind CSS
- Design database schemas and APIs
- Write documentation and tests
- Provide architectural recommendations

📊 **Tech Stack I Work With:**
- React, Next.js, Vue, Angular
- Node.js, Python, Go, Rust
- PostgreSQL, MongoDB, Redis
- AWS, Vercel, Docker

💡 **Pro Tip:** Try asking me to:
- "Create a React dashboard with charts"
- "Build an API endpoint for user authentication"
- "Design a database schema for an e-commerce app"
- "Write unit tests for my functions"

Let me know what you'd like to build! 🎨`,
  
  `🎯 **Project Planning & Architecture**

Great question! Let me help you structure your project:

📁 **Recommended Project Structure:**
\`\`\`
project/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Route pages
│   ├── services/     # API & business logic
│   ├── utils/        # Helper functions
│   └── styles/       # CSS/Tailwind
├── public/           # Static assets
├── tests/            # Unit & integration tests
└── package.json
\`\`\`

🔧 **Best Practices:**
- Use TypeScript for type safety
- Implement proper error handling
- Add loading states for async operations
- Follow component composition patterns
- Write clean, maintainable code

🚀 **Next Steps:**
1. Set up your project structure
2. Configure environment variables
3. Install necessary dependencies
4. Start building features incrementally

What specific feature would you like to tackle first?`,

  `💻 **Code Generation Ready!**

I can generate production-ready code for you. Here's an example:

\`\`\`typescript
// Modern React Component with TypeScript
import { useState, useEffect } from 'react'

interface DataItem {
  id: string
  name: string
  status: 'active' | 'inactive'
}

export function Dashboard() {
  const [data, setData] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid gap-4 p-6">
      {data.map(item => (
        <div key={item.id} className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold">{item.name}</h3>
          <span className={item.status === 'active' ? 'text-green-600' : 'text-gray-400'}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  )
}
\`\`\`

Would you like me to customize this for your specific use case?`,
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { prompt, provider } = req.body

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }

    try {
      const content = await aiService.generateText(prompt, { provider: provider || 'groq' })
      res.status(200).json({ success: true, content, mode: 'ai' })
    } catch (aiError) {
      console.warn('AI providers unavailable, using demo mode')
      
      const randomResponse = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)]
      const demoContent = `🎭 **Demo Mode Active**\n\n${randomResponse}\n\n---\n\n📝 **Your Prompt:** "${prompt}"\n\n💡 **Tip:** To use real AI, add your API keys in Replit Secrets:\n- GROQ_API_KEY (get from console.groq.com)\n- GEMINI_API_KEY (get from ai.google.dev)\n- HUGGINGFACE_API_KEY (get from huggingface.co)`
      
      res.status(200).json({ 
        success: true, 
        content: demoContent,
        mode: 'demo',
        message: 'Using demo mode - add API keys for real AI generation'
      })
    }
  } catch (error: any) {
    console.error('Generation error:', error)
    res.status(500).json({ success: false, error: error.message || 'Failed to generate content' })
  }
}
