import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BookingForm from '@/components/admin/BookingForm'

export const metadata: Metadata = {
  title: 'New Booking — Wheels Bali Admin',
}

export default async function NewBookingPage() {
  const supabase = await createClient()
  const { data: motorcycles } = await supabase
    .from('motorcycles')
    .select('id, name, category, price_day, price_week, price_month')
    .order('sort_order', { ascending: true })

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 720 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/admin/bookings"
            style={{
              fontSize: 12,
              color: '#777777',
              fontWeight: 300,
              textDecoration: 'none',
            }}
          >
            ← Bookings
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
          New booking.
        </h1>
        <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
          Manually create a booking. Price is calculated automatically.
        </p>
      </div>

      <div
        className="admin-panel"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
        }}
      >
        <BookingForm motorcycles={motorcycles ?? []} />
      </div>
    </div>
  )
}
