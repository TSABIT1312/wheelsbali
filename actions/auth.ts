'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type LoginState = { error: string } | null

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email')
  const password = formData.get('password')

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password
  ) {
    return { error: 'Email and password are required.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    // Don't expose the actual error — prevents user enumeration
    return { error: 'Invalid email or password.' }
  }

  const next = (formData.get('next') as string | null)?.trim() ?? ''
  // Validate to prevent open redirect: only allow /admin/* paths
  const destination =
    next.startsWith('/admin') && !next.includes('//') ? next : '/admin'
  redirect(destination)
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
