'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Admin error]', error)
  }, [error])

  return (
    <div
      style={{
        maxWidth: 480,
        fontFamily: 'var(--font-barlow), sans-serif',
      }}
    >
      <div
        style={{
          padding: '20px 24px',
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.3)',
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#991b1b',
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Something went wrong
        </div>
        <p style={{ fontSize: 14, color: '#991b1b', fontWeight: 300, lineHeight: 1.6 }}>
          {error.message || 'An unexpected error occurred while loading this page.'}
        </p>
        {error.digest && (
          <p
            style={{
              fontSize: 11,
              color: '#bb2222',
              marginTop: 8,
              fontFamily: 'monospace',
            }}
          >
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={reset}
          style={{
            padding: '9px 22px',
            background: '#0A0A0A',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-barlow), sans-serif',
          }}
        >
          Try again
        </button>
        <Link
          href="/admin"
          style={{
            padding: '8px 22px',
            background: 'transparent',
            color: '#0A0A0A',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid #E0E0E0',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}
