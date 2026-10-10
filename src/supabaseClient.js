import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://supabase.co';
const supabaseAnonKey = 'sb_publishable_imtM66ca8oimmP5xsSJQCw_rwI5fl_R';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

