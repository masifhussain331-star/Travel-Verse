import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  !supabaseUrl.includes('placeholder') &&
  supabaseAnonKey.trim() !== ''
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured) {
  console.info(
    '%c[TRAVELVERSE]%c Running with local resilient storage engine (Demo Mode). To connect live Supabase, configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env',
    'color: #2563eb; font-weight: bold;',
    'color: #64748b;'
  );
}

