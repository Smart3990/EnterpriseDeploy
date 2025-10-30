-- Marketing features database schema
-- Create scheduled_posts table for social media scheduling

CREATE TABLE IF NOT EXISTS scheduled_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_scheduled_at ON scheduled_posts(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_scheduled_posts_status ON scheduled_posts(status);

-- Create generated_content table to track AI generations
CREATE TABLE IF NOT EXISTS generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  result JSONB,
  provider TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  success BOOLEAN DEFAULT TRUE
);

-- Create index for analytics
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON generated_content(type);
CREATE INDEX IF NOT EXISTS idx_generated_content_created_at ON generated_content(created_at);

-- Add RLS policies
ALTER TABLE scheduled_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users (customize based on your auth setup)
CREATE POLICY "Allow all operations on scheduled_posts" ON scheduled_posts
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on generated_content" ON generated_content
  FOR ALL USING (true);
