import type { Metadata } from 'next'
import Link from 'next/link'
import MotorcycleForm from '@/components/admin/MotorcycleForm'

export const metadata: Metadata = {
  title: 'New Motorcycle — Wheels Bali Admin',
}

export default function NewMotorcyclePage() {
  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 720 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/admin/motorcycles"
            style={{
              fontSize: 12,
              color: '#777777',
              fontWeight: 300,
              textDecoration: 'none',
            }}
          >
            ← Motorcycles
          </Link>
        </div>
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
          Add motorcycle.
        </h1>
        <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
          After creating, you&apos;ll be taken to the edit page to add photos.
        </p>
      </div>

      <div
        className="admin-panel"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
        }}
      >
        <MotorcycleForm />
      </div>
    </div>
  )
}
