import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
      }}
    >
      {/* Minimal header */}
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
          className="type-sub"
          style={{ fontSize: 18, color: '#0A0A0A', textDecoration: 'none' }}
        >
          Wheels Bali
        </Link>
      </header>

      {/* Content */}
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
        <div className="type-eyebrow" style={{ marginBottom: 20 }}>
          404
        </div>

        <h1 className="type-hero" style={{ marginBottom: 24 }}>
          Page not
          <br />
          found.
        </h1>

        <p
          className="type-body"
          style={{ color: '#777777', maxWidth: 400, marginBottom: 40 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/"
            className="type-btn"
            style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              padding: '13px 28px',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Back to home
          </Link>
          <Link
            href="/#fleet"
            className="type-btn"
            style={{
              background: 'transparent',
              color: '#0A0A0A',
              padding: '12px 28px',
              textDecoration: 'none',
              border: '1px solid #0A0A0A',
              display: 'inline-block',
            }}
          >
            Browse bikes
          </Link>
        </div>
      </main>
    </div>
  )
}
