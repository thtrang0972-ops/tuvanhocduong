import { createClient } from '@supabase/supabase-js';

// Thay thế bằng URL và Anon Key thật lấy từ Supabase Dashboard của bạn
const supabaseUrl = 'URL_SUPABASE_CỦA_BẠN';
// Bạn bôi đen chữ 'ANON_KEY_CỦA_BẠN' (giữ lại 2 dấu nháy đơn) rồi nhấn Ctrl + V để dán vào
const supabaseAnonKey = 'sb_publishable_6EuTk5xjrXEow15X...'; 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
