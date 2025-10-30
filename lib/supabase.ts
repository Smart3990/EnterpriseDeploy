import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

export interface Tenant {
  id: string
  name: string
  created_at: string
}

export interface AuditLog {
  id: string
  tenant_id: string
  user_id: string
  action: string
  meta: any
  created_at: string
}

export const getTenants = async () => {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Tenant[]
}

export const createTenant = async (name: string) => {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY.')
  }
  
  const { data, error } = await supabaseAdmin
    .from('tenants')
    .insert([{ name }])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating tenant:', error)
    throw error
  }
  return data as Tenant
}

export const logAudit = async (tenantId: string, userId: string, action: string, meta: any = {}) => {
  if (!supabaseAdmin) {
    console.warn('Supabase admin client not configured. Audit log not saved.')
    return null
  }
  
  const { data, error } = await supabaseAdmin
    .from('enterprise_audit')
    .insert([{
      tenant_id: tenantId,
      user_id: userId,
      action,
      meta
    }])
    .select()
    .single()
  
  if (error) {
    console.error('Error logging audit:', error)
    throw error
  }
  return data as AuditLog
}
