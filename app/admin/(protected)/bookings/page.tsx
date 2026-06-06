import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import BookingStatusBadge from '@/components/admin/BookingStatusBadge'
import type { BookingWithMotorcycle, BookingStatus } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Bookings — Wheels Bali Admin',
}

const STATUS_TABS: { label: string; value: string }[] = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

const VALID_STATUSES: BookingStatus[] = [
  'pending', 'confirmed', 'active', 'completed', 'cancelled',
]

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status: rawStatus } = await searchParams
  const statusFilter = VALID_STATUSES.includes(rawStatus as BookingStatus)
    ? (rawStatus as BookingStatus)
    : null

  const supabase = await createClient()

  // Stats (always full counts, regardless of filter)
  const [
    { count: totalCount },
    { count: pendingCount },
    { count: confirmedCount },
    { count: activeCount },
  ] = await Promise.all([
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'active'),
  ])

  // Bookings list
  let query = supabase
    .from('bookings')
    .select('*, motorcycles(id, name)')
    .order('created_at', { ascending: false })

  if (statusFilter) {
    query = query.eq('status', statusFilter)
  }

  const { data } = await query
  const bookings = (data ?? []) as unknown as BookingWithMotorcycle[]

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 1100 }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 32,
        }}
      >
        <div style={{ minWidth: 0 }}>
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
            Bookings.
          </h1>
          <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
            {totalCount ?? 0} total bookings
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#0A0A0A',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          + Add booking
        </Link>
      </div>

      {/* Stats strip */}
      <div
        className="admin-stats-4"
        style={{
          gap: 1,
          background: '#E0E0E0',
          border: '1px solid #E0E0E0',
          marginBottom: 28,
        }}
      >
        {[
          { label: 'Total', value: totalCount ?? 0 },
          { label: 'Pending', value: pendingCount ?? 0, accent: '#b45309' },
          { label: 'Confirmed', value: confirmedCount ?? 0, accent: '#1d4ed8' },
          { label: 'Active', value: activeCount ?? 0, accent: '#15803d' },
        ].map((s) => (
          <div
            key={s.label}
            style={{ background: '#FFFFFF', padding: '20px 24px' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 'clamp(28px, 6vw, 40px)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: s.accent ?? '#0A0A0A',
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#777777',
                marginTop: 6,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Status filter tabs */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          flexWrap: 'wrap',
          borderBottom: '1px solid #E0E0E0',
          marginBottom: 24,
        }}
      >
        {STATUS_TABS.map(({ label, value }) => {
          const isActive =
            (value === '' && !statusFilter) ||
            (value !== '' && statusFilter === value)
          return (
            <Link
              key={value}
              href={value ? `/admin/bookings?status=${value}` : '/admin/bookings'}
              style={{
                padding: '8px 16px',
                fontSize: 12,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? '#0A0A0A' : '#777777',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #0A0A0A' : '2px solid transparent',
                marginBottom: -1,
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Bookings table */}
      {bookings.length === 0 ? (
        <div
          style={{
            border: '1px solid #E0E0E0',
            background: '#FFFFFF',
            padding: '60px 40px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
            No bookings{statusFilter ? ` with status "${statusFilter}"` : ''}.
          </p>
        </div>
      ) : (
        <div className="admin-table-scroll">
        <div
          className="admin-table-inner"
          style={{
            border: '1px solid #E0E0E0',
            background: '#E0E0E0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {/* Column headers */}
          <div
            style={{
              background: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: '1fr 140px 200px 100px 100px 60px',
              alignItems: 'center',
              padding: '10px 24px',
            }}
          >
            {['Customer', 'Motorcycle', 'Period', 'Price', 'Status', ''].map(
              (col, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#777777',
                    textAlign: i === 5 ? 'right' : 'left',
                  }}
                >
                  {col}
                </span>
              ),
            )}
          </div>

          {bookings.map((b) => (
            <Link
              key={b.id}
              href={`/admin/bookings/${b.id}`}
              className="hover-bg-f9"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 140px 200px 100px 100px 60px',
                alignItems: 'center',
                padding: '14px 24px',
                background: '#FFFFFF',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.1s',
              }}
            >
              {/* Customer */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#0A0A0A',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {b.customer_name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#777777',
                    fontWeight: 300,
                    marginTop: 1,
                  }}
                >
                  {b.customer_phone}
                </div>
              </div>

              {/* Motorcycle */}
              <div
                style={{
                  fontSize: 13,
                  color: b.motorcycles ? '#0A0A0A' : '#BBBBBB',
                  fontWeight: b.motorcycles ? 400 : 300,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {b.motorcycles?.name ?? '—'}
              </div>

              {/* Period */}
              <div>
                <div
                  style={{ fontSize: 12, color: '#0A0A0A', lineHeight: 1.4 }}
                >
                  {formatDate(b.start_date)} → {formatDate(b.end_date)}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: '#777777',
                    fontWeight: 300,
                    marginTop: 1,
                    textTransform: 'capitalize',
                  }}
                >
                  {b.rental_type}
                </div>
              </div>

              {/* Price */}
              <div
                style={{
                  fontFamily: 'var(--font-barlow-condensed), sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: b.total_price ? '#0A0A0A' : '#BBBBBB',
                }}
              >
                {b.total_price
                  ? `Rp ${b.total_price.toLocaleString('id-ID')}`
                  : '—'}
              </div>

              {/* Status */}
              <BookingStatusBadge status={b.status} />

              {/* Arrow */}
              <div
                style={{ textAlign: 'right', fontSize: 14, color: '#CCCCCC' }}
              >
                →
              </div>
            </Link>
          ))}
        </div>
        </div>
      )}
    </div>
  )
}
