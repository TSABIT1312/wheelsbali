import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import BookingStatusBadge from '@/components/admin/BookingStatusBadge'
import BookingActions from '@/components/admin/BookingActions'
import BookingDetailsForm from '@/components/admin/BookingDetailsForm'
import BookingDeleteButton from '@/components/admin/BookingDeleteButton'
import type { BookingStatus } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Booking — Wheels Bali Admin',
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      className="admin-info-row"
      style={{
        padding: '12px 0',
        borderBottom: '1px solid #F0F0F0',
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#777777',
          paddingTop: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, color: '#0A0A0A', lineHeight: 1.5 }}>
        {value ?? <span style={{ color: '#BBBBBB' }}>—</span>}
      </div>
    </div>
  )
}

function Card({
  sectionLabel,
  children,
}: {
  sectionLabel: string
  children: React.ReactNode
}) {
  return (
    <div
      className="admin-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        marginBottom: 20,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#777777',
          marginBottom: 16,
        }}
      >
        {sectionLabel}
      </div>
      {children}
    </div>
  )
}

type ConflictBooking = {
  id: string
  customer_name: string
  start_date: string
  end_date: string
  status: BookingStatus
}

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data } = await supabase
    .from('bookings')
    .select('*, motorcycles(id, name, category)')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const booking = data as typeof data & {
    motorcycles: { id: string; name: string; category: string } | null
  }

  // Check for overlapping confirmed/active bookings on the same motorcycle
  let conflicts: ConflictBooking[] = []
  if (booking.motorcycle_id) {
    const admin = createAdminClient()
    const { data: conflictData } = await admin
      .from('bookings')
      .select('id, customer_name, start_date, end_date, status')
      .eq('motorcycle_id', booking.motorcycle_id)
      .in('status', ['confirmed', 'active'])
      .lt('start_date', booking.end_date)
      .gt('end_date', booking.start_date)
      .neq('id', id)
      .limit(5)

    conflicts = (conflictData ?? []) as ConflictBooking[]
  }

  const hasConflict = conflicts.length > 0
  const isTerminal =
    booking.status === 'completed' || booking.status === 'cancelled'

  const ref = booking.id.slice(0, 8).toUpperCase()

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 760 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/admin/bookings"
            style={{ fontSize: 12, color: '#777777', fontWeight: 300, textDecoration: 'none' }}
          >
            ← Bookings
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <h1
            className="admin-h1"
            style={{
              fontFamily: 'var(--font-barlow-condensed), sans-serif',
              fontWeight: 700,
              fontStyle: 'italic',
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
            }}
          >
            #{ref}
          </h1>
          <BookingStatusBadge status={booking.status as BookingStatus} />
        </div>
        <p style={{ fontSize: 13, color: '#777777', fontWeight: 300, marginTop: 6 }}>
          Created{' '}
          {new Date(booking.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Conflict alert */}
      {hasConflict && (
        <div
          style={{
            padding: '14px 18px',
            marginBottom: 24,
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.3)',
            fontSize: 13,
            color: '#991b1b',
            lineHeight: 1.6,
          }}
        >
          <strong style={{ fontWeight: 600 }}>Scheduling conflict.</strong>{' '}
          This motorcycle is already booked for overlapping dates:
          <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
            {conflicts.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/admin/bookings/${c.id}`}
                  style={{ color: '#991b1b', fontWeight: 500 }}
                >
                  #{c.id.slice(0, 8).toUpperCase()}
                </Link>{' '}
                — {c.customer_name} ({formatDate(c.start_date)} → {formatDate(c.end_date)}) [{c.status}]
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Booking info */}
      <Card sectionLabel="Customer">
        <InfoRow label="Name" value={booking.customer_name} />
        <InfoRow label="Phone" value={booking.customer_phone} />
        <InfoRow label="Email" value={booking.customer_email} />
        <InfoRow label="Delivery address" value={booking.delivery_address} />
      </Card>

      <Card sectionLabel="Rental">
        <InfoRow
          label="Motorcycle"
          value={
            booking.motorcycles ? (
              <Link
                href={`/admin/motorcycles/${booking.motorcycles.id}`}
                style={{ color: '#0A0A0A', fontWeight: 500 }}
              >
                {booking.motorcycles.name}
              </Link>
            ) : (
              <span style={{ color: '#BBBBBB' }}>Not assigned</span>
            )
          }
        />
        <InfoRow
          label="Period"
          value={`${formatDate(booking.start_date)} → ${formatDate(booking.end_date)}`}
        />
        <InfoRow
          label="Rental type"
          value={<span style={{ textTransform: 'capitalize' }}>{booking.rental_type}</span>}
        />
        <InfoRow
          label="Total price"
          value={
            booking.total_price
              ? `Rp ${booking.total_price.toLocaleString('id-ID')}`
              : null
          }
        />
        {booking.notes && <InfoRow label="Notes" value={booking.notes} />}
      </Card>

      {/* Status transitions */}
      {!isTerminal && (
        <Card sectionLabel="Update status">
          <BookingActions
            bookingId={booking.id}
            currentStatus={booking.status as BookingStatus}
            hasConflict={hasConflict}
          />
        </Card>
      )}

      {/* Edit mutable fields */}
      <Card sectionLabel="Edit details">
        <BookingDetailsForm
          key={booking.updated_at}
          bookingId={booking.id}
          defaultNotes={booking.notes ?? ''}
          defaultDeliveryAddress={booking.delivery_address ?? ''}
          defaultTotalPrice={booking.total_price ?? null}
        />
      </Card>

      {/* Delete */}
      <Card sectionLabel="Danger zone">
        <BookingDeleteButton bookingId={booking.id} />
      </Card>
    </div>
  )
}
