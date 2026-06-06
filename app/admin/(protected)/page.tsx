import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Dashboard — Wheels Bali Admin',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalBikes },
    { count: availableBikes },
    { count: totalBookings },
    { count: pendingBookings },
  ] = await Promise.all([
    supabase
      .from('motorcycles')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('motorcycles')
      .select('*', { count: 'exact', head: true })
      .eq('is_available', true),
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
  ])

  const stats = [
    { label: 'Total bikes', value: totalBikes ?? 0 },
    { label: 'Available', value: availableBikes ?? 0 },
    { label: 'Bookings', value: totalBookings ?? 0 },
    { label: 'Pending', value: pendingBookings ?? 0 },
  ]

  const quickLinks = [
    {
      title: 'Manage bikes',
      sub: 'Add, edit, toggle availability',
      href: '/admin/motorcycles',
    },
    {
      title: 'View bookings',
      sub: 'Review and update booking status',
      href: '/admin/bookings',
    },
    {
      title: 'Edit content',
      sub: 'Hero, FAQ, testimonials, gallery',
      href: '/admin/content',
    },
  ]

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 960 }}>
      {/* Page heading */}
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
          Overview.
        </h1>
        <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
          Welcome back. Here&apos;s a snapshot of the business.
        </p>
      </div>

      {/* Stats grid */}
      <div
        className="admin-stats-4"
        style={{
          gap: 1,
          background: '#E0E0E0',
          border: '1px solid #E0E0E0',
          marginBottom: 48,
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{ background: '#FFFFFF', padding: '28px 24px' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 'clamp(36px, 8vw, 52px)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#0A0A0A',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#777777',
                marginTop: 8,
                fontWeight: 400,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick links label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#777777',
          marginBottom: 16,
        }}
      >
        <span
          style={{ display: 'block', width: 24, height: 1, background: '#777777' }}
        />
        Quick actions
      </div>

      {/* Quick links grid */}
      <div
        className="admin-quick-3"
        style={{
          gap: 1,
          background: '#E0E0E0',
          border: '1px solid #E0E0E0',
        }}
      >
        {quickLinks.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="hover-bg-f5"
            style={{
              display: 'block',
              padding: '28px 24px',
              background: '#FFFFFF',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 20,
                fontWeight: 700,
                fontStyle: 'italic',
                color: '#0A0A0A',
                marginBottom: 6,
                letterSpacing: '-0.01em',
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#777777',
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              {card.sub}
            </div>
            <div
              style={{ fontSize: 18, color: '#E0E0E0', marginTop: 20 }}
            >
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
