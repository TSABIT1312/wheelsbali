'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-barlow), sans-serif',
        background: '#FFFFFF',
      }}
    >
      <header
        style={{
          height: 64,
          borderBottom: '1px solid #E0E0E0',
          padding: '0 6vw',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontWeight: 800,
            fontStyle: 'italic',
            fontSize: 22,
            letterSpacing: '-0.02em',
            color: '#0A0A0A',
            textDecoration: 'none',
          }}
        >
          WHEELS BALI
        </Link>
      </header>

      <main
        id="main-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 6vw',
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#777777',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{ display: 'block', width: 32, height: 1, background: '#777777' }}
          />
          Something went wrong
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontSize: 'clamp(48px, 8vw, 100px)',
            fontWeight: 800,
            fontStyle: 'italic',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            color: '#0A0A0A',
            marginBottom: 24,
          }}
        >
          Unexpected
          <br />
          error.
        </h1>

        <p
          style={{
            fontSize: 16,
            color: '#777777',
            fontWeight: 300,
            maxWidth: 420,
            lineHeight: 1.7,
            marginBottom: 40,
          }}
        >
          An error occurred while loading this page. Please try again — if the
          problem persists, WhatsApp us directly.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              padding: '13px 28px',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-barlow), sans-serif',
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              background: 'transparent',
              color: '#0A0A0A',
              padding: '12px 28px',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid #0A0A0A',
            }}
          >
            Go home
          </Link>
        </div>
      </main>
    </div>
  )
}
