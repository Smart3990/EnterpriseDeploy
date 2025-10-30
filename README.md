# DevIgnite AI – Enterprise-Ready AI Development Suite

## 🚀 Overview
DevIgnite AI is an all-in-one AI development, automation, and marketing suite designed for enterprises, fully deployable on Replit.

### Highlights
- **Lovable-inspired UI** - Beautiful React + Tailwind CSS + Framer Motion interface
- **Multi-AI Provider Support** - Integrated with Groq, Google Gemini, and HuggingFace
- **Intelligent Fallback System** - Automatic failover across AI providers for 99.9% uptime
- **n8n Workflow Automation** - Connect to 800+ automation templates
- **Supabase Integration** - PostgreSQL database with enterprise schema
- **Analytics Dashboard** - Real-time metrics with Recharts visualizations
- **Enterprise Features** - Multi-tenant support, audit logging, Auth0 authentication
- **Error Tracking** - Integrated Sentry monitoring

## 🏗️ Tech Stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- Recharts

### Backend & Services
- Supabase (PostgreSQL)
- Groq SDK
- Google Gemini API
- HuggingFace Inference
- n8n Automation
- Sentry Error Tracking

## 🚀 Getting Started on Replit

### 1. Environment Setup
Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required API keys:
- `GEMINI_API_KEY` - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- `GROQ_API_KEY` - Get from [Groq Console](https://console.groq.com)
- `HF_API_KEY` - Get from [HuggingFace](https://huggingface.co/settings/tokens)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

Optional:
- `NEXT_PUBLIC_AUTH0_DOMAIN` - Auth0 domain
- `NEXT_PUBLIC_AUTH0_CLIENT_ID` - Auth0 client ID
- `N8N_ENDPOINT` - Your n8n instance URL
- `N8N_API_KEY` - n8n API key
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN for error tracking

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup
Apply the enterprise schema to your Supabase database:

```sql
-- Copy and run the SQL from attached_assets/enterprise_schema_1761855248967.sql
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enterprise_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid,
  user_id uuid,
  action text,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5000`

## 📁 Project Structure

```
devignite-ai/
├── components/          # React components
│   ├── Layout.tsx       # Main layout with navigation
│   └── AIGeneratorCard.tsx
├── pages/               # Next.js pages
│   ├── index.tsx        # AI Studio (main page)
│   ├── analytics.tsx    # Analytics dashboard
│   ├── automation.tsx   # n8n workflows
│   ├── settings.tsx     # Configuration
│   └── api/             # API routes
│       ├── generate.ts  # AI generation endpoint
│       └── automation/
│           └── trigger.ts
├── services/            # Business logic
│   ├── aiService.ts     # Multi-AI provider service
│   └── n8nService.ts    # n8n integration
├── lib/                 # Utilities
│   └── supabase.ts      # Supabase client
└── styles/
    └── globals.css      # Global styles
```

## 🎯 Features

### AI Content Generation
- **Multi-Provider Support**: Groq, Gemini, and HuggingFace
- **Automatic Failover**: If one provider fails, automatically tries others
- **Model Selection**: Choose from various AI models
- **Real-time Generation**: Stream results as they're generated

### Analytics Dashboard
- **Usage Metrics**: Track AI provider usage over time
- **Performance Monitoring**: Monitor request latency and success rates
- **Beautiful Visualizations**: Interactive charts with Recharts
- **Key Metrics**: Total requests, active users, API calls, success rate

### Workflow Automation
- **n8n Integration**: Connect to external automation workflows
- **Trigger Management**: Manually trigger workflows from the UI
- **Status Monitoring**: Track workflow execution status
- **800+ Templates**: Access pre-built automation templates

### Enterprise Features
- **Multi-Tenant Architecture**: Support multiple organizations
- **Audit Logging**: Track all user actions and system events
- **Auth0 Integration**: Secure authentication (setup required)
- **Error Tracking**: Sentry integration for monitoring

## 🔧 Configuration

### AI Providers
The AI service automatically falls back to alternative providers if one fails:
1. Primary provider (as specified in request)
2. First fallback (next available provider)
3. Second fallback (remaining provider)

### Tailwind Configuration
Custom theme with:
- Primary color palette (blue shades)
- Custom animations (fade-in, slide-up)
- Responsive design utilities

### Next.js Configuration
- Cache control headers for development
- Image optimization
- TypeScript support
- Path aliases (`@/*`)

## 📊 API Endpoints

### POST `/api/generate`
Generate AI content

**Request:**
```json
{
  "prompt": "Your prompt here",
  "provider": "groq" | "gemini" | "huggingface"
}
```

**Response:**
```json
{
  "success": true,
  "content": "Generated content..."
}
```

### POST `/api/automation/trigger`
Trigger n8n workflow

**Request:**
```json
{
  "workflowId": "workflow-id",
  "data": { ... }
}
```

## 🚀 Deployment

### Replit Deployments
1. Click the "Deploy" button in Replit
2. Configure environment variables
3. Deploy!

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Support

For issues or questions, please check the documentation or contact support.

## 📄 License

Private - Enterprise Use Only
