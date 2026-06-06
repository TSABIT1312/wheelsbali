'use client'

import { usePathname } from 'next/navigation'
import { useMobileMenu } from './MobileMenuContext'

const SECTION_TITLES: Record<string, string> = {
  '/admin/motorcycles': 'Motorcycles',
  '/admin/bookings': 'Bookings',
  '/admin/content': 'Content',
}

function resolveSectionTitle(pathname: string): string {
  for (const [prefix, title] of Object.entries(SECTION_TITLES)) {
    if (pathname.startsWith(prefix)) return title
  }
  return 'Dashboard'
}

export default function AdminHeader({ email }: { email: string }) {
  const pathname = usePathname()
  const section = resolveSectionTitle(pathname)
  const { open, toggle } = useMobileMenu()

  return (
    <header
      className="admin-header"
      style={{
        height: 56,
        background: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-barlow), sans-serif',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
        <button
          type="button"
          onClick={toggle}
          className="admin-hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="admin-sidebar"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            {open ? (
              <>
                <path d="M2 2L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M1 1H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1 7H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1 13H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>

        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0A0A0A',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {section}
        </span>
      </div>

      <span
        className="admin-hide-xs"
        style={{
          fontSize: 12,
          color: '#777777',
          fontWeight: 300,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          marginLeft: 12,
          minWidth: 0,
        }}
      >
        {email}
      </span>
    </header>
  )
}
