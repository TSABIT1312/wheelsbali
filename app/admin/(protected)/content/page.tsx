import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Content — Wheels Bali Admin',
}

const comingSoon = [
  {
    title: 'Hero section',
    desc: 'Edit the homepage heading, subtext, and stats strip.',
  },
  {
    title: 'FAQ',
    desc: 'Add, edit, reorder, and publish/unpublish FAQ items.',
  },
  {
    title: 'Testimonials',
    desc: 'Manage customer reviews shown on the homepage.',
  },
  {
    title: 'Gallery',
    desc: 'Upload and manage photos for the homepage gallery.',
  },
]

const live = [
  {
    title: 'Merchandise',
    desc: 'Manage branded products shown on the homepage.',
    href: '/admin/content/merchandise',
  },
]

export default function ContentPage() {
  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 720 }}>
      <div style={{ marginBottom: 40 }}>
        <h1
          className="admin-h1"
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: 1.0,
            letterSpacing: '-0.01em',
            color: '#0A0A0A',
            marginBottom: 8,
          }}
        >
          Content.
        </h1>
        <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
          Manage the public-facing copy and media.
        </p>
      </div>

      {/* Live sections */}
      <div
        style={{
          border: '1px solid #E0E0E0',
          background: '#E0E0E0',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginBottom: 24,
        }}
      >
        {live.map((s) => (
          <Link
            key={s.title}
            href={s.href}
            style={{
              background: '#FFFFFF',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              textDecoration: 'none',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 18,
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#0A0A0A',
                  marginBottom: 4,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.title}
              </div>
              <div style={{ fontSize: 13, color: '#777777', fontWeight: 300 }}>
                {s.desc}
              </div>
            </div>
            <span style={{ fontSize: 18, color: '#777777', flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </div>

      {/* Coming soon sections */}
      <div
        style={{
          padding: '20px 24px',
          background: 'rgba(245,158,11,0.06)',
          border: '1px solid rgba(245,158,11,0.3)',
          fontSize: 13,
          color: '#92400e',
          marginBottom: 16,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ fontWeight: 600 }}>Coming soon.</strong> The sections
        below are under development. For now, edit them directly in your
        Supabase dashboard.
      </div>

      <div
        style={{
          border: '1px solid #E0E0E0',
          background: '#E0E0E0',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {comingSoon.map((s) => (
          <div
            key={s.title}
            style={{
              background: '#FFFFFF',
              padding: '20px 24px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 18,
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#0A0A0A',
                marginBottom: 4,
                letterSpacing: '-0.01em',
              }}
            >
              {s.title}
            </div>
            <div style={{ fontSize: 13, color: '#777777', fontWeight: 300 }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
