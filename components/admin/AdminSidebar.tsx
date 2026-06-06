'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/actions/auth'
import { useMobileMenu } from './MobileMenuContext'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Motorcycles', href: '/admin/motorcycles' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Content', href: '/admin/content' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { open, close } = useMobileMenu()

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Backdrop (mobile only, hidden via CSS on desktop) */}
      <div
        className={`admin-backdrop${open ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`admin-sidebar${open ? ' is-open' : ''}`}
        style={{
          background: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'var(--font-barlow), sans-serif',
          overflowY: 'auto',
        }}
        aria-label="Admin navigation"
      >
        {/* Brand */}
        <div
          style={{
            padding: '28px 24px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <div
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 17,
                fontWeight: 700,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
              }}
            >
              Wheels Bali
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginTop: 2,
              }}
            >
              Admin
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '9px 24px',
                  fontSize: 13,
                  fontWeight: active ? 500 : 400,
                  letterSpacing: '0.01em',
                  color: active ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  borderLeft: active
                    ? '2px solid #FFFFFF'
                    : '2px solid transparent',
                  background: active
                    ? 'rgba(255,255,255,0.07)'
                    : 'transparent',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(255,255,255,0.8)'
                    el.style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(255,255,255,0.45)'
                    el.style.background = 'transparent'
                  }
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '12px 0',
            flexShrink: 0,
          }}
        >
          <form action={logoutAction}>
            <button
              type="submit"
              style={{
                display: 'block',
                width: '100%',
                padding: '9px 24px',
                textAlign: 'left',
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '0.01em',
                color: 'rgba(255,255,255,0.35)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-barlow), sans-serif',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.75)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.35)')
              }
            >
              Sign out →
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
