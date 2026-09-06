import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Do not throw — this lets the marketing pages of the site keep working
  // in environments (like a first `npm run dev`) where Supabase hasn't been
  // configured yet. Anything that actually calls supabase (auth, forms,
  // course/blog data) will fail loudly and visibly at the call site instead.
  console.warn(
    '[Codeallo] Supabase environment variables are missing. Copy .env.example to .env and fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

// IMPORTANT: this is the public anon key only. Never put the Supabase
// service-role key in any file under src/ — it must only ever be used from
// trusted server-side contexts (Supabase Edge Functions, a backend you
// control), never shipped to the browser.
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')
