import Layout from '@/components/Layout'
import { Key, Database, Shield, Bell } from 'lucide-react'

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Settings</h1>
          <p className="text-lg text-gray-600">Configure your DevIgnite AI environment</p>
        </div>

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

        <div className="bg-lovable-50 border border-lovable-200 rounded-2xl p-6">
          <p className="text-sm text-lovable-900">
            <strong>Note:</strong> Update your <code className="bg-white px-2.5 py-1 rounded border border-lovable-200 font-mono text-xs">.env.local</code> file 
            with these values for them to take effect. Refer to <code className="bg-white px-2.5 py-1 rounded border border-lovable-200 font-mono text-xs">.env.example</code> for all available options.
          </p>
        </div>
      </div>
    </Layout>
  )
}

function SettingsCard({ icon, title, description, children }: any) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 hover:border-lovable-200 transition-all">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 rounded-lg bg-lovable-100 text-lovable-600">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function InputField({ label, placeholder, type = 'text' }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lovable-500 focus:border-transparent text-sm placeholder:text-gray-400 transition-all"
      />
    </div>
  )
}
