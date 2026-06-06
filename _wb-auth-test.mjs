import { createServerClient } from '@supabase/ssr'

const cookies = new Map()
const cookieStore = {
  getAll: () => Array.from(cookies, ([name, value]) => ({ name, value })),
  setAll: (cs) => cs.forEach(({ name, value }) => cookies.set(name, value)),
}

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { cookies: cookieStore }
)

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@wheelsbali.com',
  password: 'WheelsBali2026!',
})

if (error) { console.error('FAIL', error.message); process.exit(1) }
const cookieHeader = Array.from(cookies, ([n, v]) => `${n}=${v}`).join('; ')
console.log('COOKIE_HEADER=' + cookieHeader)
