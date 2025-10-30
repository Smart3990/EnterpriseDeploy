import Layout from '@/components/Layout'
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
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Analytics</h1>
          <p className="text-lg text-gray-600">Monitor your AI usage and performance metrics</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Requests"
            value="12,847"
            change="+12.5%"
            icon={<Activity className="h-5 w-5" />}
          />
          <StatCard
            title="Active Users"
            value="1,234"
            change="+8.2%"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="API Calls"
            value="45,892"
            change="+23.1%"
            icon={<Zap className="h-5 w-5" />}
          />
          <StatCard
            title="Success Rate"
            value="99.8%"
            change="+0.3%"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">AI Provider Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="groq" fill="#a855f7" radius={[8, 8, 0, 0]} />
              <Bar dataKey="gemini" fill="#c084fc" radius={[8, 8, 0, 0]} />
              <Bar dataKey="huggingface" fill="#d8b4fe" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Performance Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
              <YAxis yAxisId="left" tick={{ fill: '#6b7280' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#a855f7" strokeWidth={3} />
              <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#d8b4fe" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  )
}

function StatCard({ title, value, change, icon }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-lovable-200 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-lovable-100 text-lovable-600">
          {icon}
        </div>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}
