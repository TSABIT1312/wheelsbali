import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Admin Login — Wheels Bali',
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const safeNext =
    typeof next === 'string' && next.startsWith('/admin') && !next.includes('//')
      ? next
      : undefined
  return <LoginForm next={safeNext} />
}
