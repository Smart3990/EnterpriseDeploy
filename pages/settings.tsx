import Layout from '@/components/Layout'
import { motion } from 'framer-motion'
import { Key, Database, Shield, Bell } from 'lucide-react'

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your DevIgnite AI environment</p>
        </motion.div>

        <div className="grid gap-6">
          <SettingsCard
            icon={<Key className="h-6 w-6" />}
            title="API Keys"
            description="Manage your AI provider API keys"
            color="blue"
          >
            <div className="space-y-4">
              <InputField label="Groq API Key" placeholder="gsk_..." type="password" />
              <InputField label="Gemini API Key" placeholder="AIza..." type="password" />
              <InputField label="HuggingFace API Key" placeholder="hf_..." type="password" />
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Database className="h-6 w-6" />}
            title="Database"
            description="Configure Supabase connection"
            color="green"
          >
            <div className="space-y-4">
              <InputField label="Supabase URL" placeholder="https://xxx.supabase.co" />
              <InputField label="Anon Key" placeholder="eyJ..." type="password" />
              <InputField label="Service Role Key" placeholder="eyJ..." type="password" />
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Shield className="h-6 w-6" />}
            title="Authentication"
            description="Auth0 configuration"
            color="purple"
          >
            <div className="space-y-4">
              <InputField label="Auth0 Domain" placeholder="your-domain.auth0.com" />
              <InputField label="Client ID" placeholder="..." type="password" />
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Bell className="h-6 w-6" />}
            title="Monitoring"
            description="Error tracking and analytics"
            color="pink"
          >
            <div className="space-y-4">
              <InputField label="Sentry DSN" placeholder="https://..." />
              <InputField label="n8n Endpoint" placeholder="https://..." />
              <InputField label="n8n API Key" placeholder="..." type="password" />
            </div>
          </SettingsCard>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Update your <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file 
              with these values for them to take effect. Refer to <code className="bg-blue-100 px-2 py-1 rounded">.env.example</code> for all available options.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}

function SettingsCard({ icon, title, description, color, children }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    pink: 'bg-pink-100 text-pink-600',
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

function InputField({ label, placeholder, type = 'text' }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>
  )
}
