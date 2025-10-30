import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  const { data, error } = await supabase
    .from('tenants')
    .insert([{ name }])
    .select()
    .single()
  
  if (error) throw error
  return data as Tenant
}

export const logAudit = async (tenantId: string, userId: string, action: string, meta: any = {}) => {
  const { data, error } = await supabase
    .from('enterprise_audit')
    .insert([{
      tenant_id: tenantId,
      user_id: userId,
      action,
      meta
    }])
    .select()
    .single()
  
  if (error) throw error
  return data as AuditLog
}
