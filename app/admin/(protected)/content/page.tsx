import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content — Wheels Bali Admin',
}

const sections = [
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

      <div
        style={{
          padding: '20px 24px',
          background: 'rgba(245,158,11,0.06)',
          border: '1px solid rgba(245,158,11,0.3)',
          fontSize: 13,
          color: '#92400e',
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ fontWeight: 600 }}>Coming soon.</strong> Content
        editing is under development. For now, edit the seed data directly in
        your Supabase dashboard.
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
        {sections.map((s) => (
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
