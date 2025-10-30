import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp, Users, Zap, Activity } from 'lucide-react'

const usageData = [
  { name: 'Mon', groq: 120, gemini: 80, huggingface: 40 },
  { name: 'Tue', groq: 150, gemini: 95, huggingface: 55 },
  { name: 'Wed', groq: 180, gemini: 110, huggingface: 70 },
  { name: 'Thu', groq: 200, gemini: 130, huggingface: 85 },
  { name: 'Fri', groq: 240, gemini: 160, huggingface: 100 },
  { name: 'Sat', groq: 190, gemini: 140, huggingface: 75 },
  { name: 'Sun', groq: 160, gemini: 100, huggingface: 60 },
]

const performanceData = [
  { name: '00:00', requests: 120, latency: 45 },
  { name: '04:00', requests: 80, latency: 40 },
  { name: '08:00', requests: 200, latency: 55 },
  { name: '12:00', requests: 350, latency: 60 },
  { name: '16:00', requests: 280, latency: 50 },
  { name: '20:00', requests: 220, latency: 48 },
]

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your AI usage and performance metrics</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Requests"
            value="12,847"
            change="+12.5%"
            icon={<Activity className="h-6 w-6" />}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value="1,234"
            change="+8.2%"
            icon={<Users className="h-6 w-6" />}
            color="green"
          />
          <StatCard
            title="API Calls"
            value="45,892"
            change="+23.1%"
            icon={<Zap className="h-6 w-6" />}
            color="purple"
          />
          <StatCard
            title="Success Rate"
            value="99.8%"
            change="+0.3%"
            icon={<TrendingUp className="h-6 w-6" />}
            color="pink"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">AI Provider Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="groq" fill="#0ea5e9" />
              <Bar dataKey="gemini" fill="#8b5cf6" />
              <Bar dataKey="huggingface" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Performance Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#0ea5e9" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#ec4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </Layout>
  )
}

function StatCard({ title, value, change, icon, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </motion.div>
  )
}
