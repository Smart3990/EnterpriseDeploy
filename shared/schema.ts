import { pgTable, text, timestamp, boolean, jsonb, uuid, integer } from 'drizzle-orm/pg-core';

export const scheduledPosts = pgTable('scheduled_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  platform: text('platform').notNull(),
  content: text('content').notNull(),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }).notNull(),
  status: text('status').notNull().default('queued'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  errorMessage: text('error_message'),
  retryCount: integer('retry_count').default(0),
});

export const generatedContent = pgTable('generated_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  prompt: text('prompt').notNull(),
  result: jsonb('result'),
  provider: text('provider'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  success: boolean('success').default(true),
});

export type ScheduledPost = typeof scheduledPosts.$inferSelect;
export type InsertScheduledPost = typeof scheduledPosts.$inferInsert;
export type GeneratedContent = typeof generatedContent.$inferSelect;
export type InsertGeneratedContent = typeof generatedContent.$inferInsert;
