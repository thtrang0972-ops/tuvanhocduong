import { createClient } from '@supabase/supabase-js'

// HÃY NHÌN VÀO TÊN BIẾN SAU CHỮ env.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
