'use client'

import { useActionState, useState, useMemo } from 'react'
import { createBookingAction } from '@/actions/bookings'
import type { BookingFormState } from '@/actions/bookings'

type MotorcycleOption = {
  id: string
  name: string
  category: string
  price_day: number
  price_week: number
  price_month: number
}

const RENTAL_LABELS: Record<string, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
}

const CATEGORY_LABELS: Record<string, string> = {
  automatic: 'Automatic',
  large_scooter: 'Large Scooter',
  trail: 'Trail',
}

const baseInput: React.CSSProperties = {
  display: 'block',
  width: '100%',
  border: '1px solid #E0E0E0',
  padding: '10px 12px',
  fontSize: 14,
  fontFamily: 'var(--font-barlow), sans-serif',
  background: '#FFFFFF',
  color: '#0A0A0A',
  outline: 'none',
  boxSizing: 'border-box',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string[]
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#0A0A0A',
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
      {error?.[0] && (
        <div style={{ fontSize: 12, color: '#ef4444', marginTop: 4 }}>
          {error[0]}
        </div>
      )}
    </div>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        marginTop: 8,
      }}
    >
      <span
        style={{
          display: 'block',
          width: 20,
          height: 1,
          background: '#E0E0E0',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 10,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#777777',
          flexShrink: 0,
        }}
      >
        {title}
      </span>
      <span style={{ flex: 1, height: 1, background: '#E0E0E0' }} />
    </div>
  )
}

function errBorder(hasErr: boolean) {
  return hasErr ? '#fca5a5' : '#E0E0E0'
}

export default function BookingForm({
  motorcycles,
}: {
  motorcycles: MotorcycleOption[]
}) {
  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(
    createBookingAction,
    null,
  )

  const [selectedMotoId, setSelectedMotoId] = useState('')
  const [rentalType, setRentalType] = useState('daily')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const err = state?.errors ?? {}

  const pricePreview = useMemo(() => {
    if (!selectedMotoId || !startDate || !endDate) return null
    const moto = motorcycles.find((m) => m.id === selectedMotoId)
    if (!moto) return null
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null
    const days = Math.ceil((end.getTime() - start.getTime()) / 86_400_000)
    if (days <= 0) return null
    if (rentalType === 'daily') return days * moto.price_day
    if (rentalType === 'weekly') return Math.ceil(days / 7) * moto.price_week
    if (rentalType === 'monthly') return Math.ceil(days / 30) * moto.price_month
    return null
  }, [selectedMotoId, startDate, endDate, rentalType, motorcycles])

  return (
    <form action={formAction}>
      {state?.message && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: 24,
            background: '#fff1f1',
            border: '1px solid #fca5a5',
            fontSize: 13,
            color: '#dc2626',
          }}
        >
          {state.message}
        </div>
      )}

      <SectionDivider title="Motorcycle" />

      <Field label="Motorcycle" error={err.motorcycle_id}>
        <select
          name="motorcycle_id"
          value={selectedMotoId}
          onChange={(e) => setSelectedMotoId(e.target.value)}
          style={{
            ...baseInput,
            cursor: 'pointer',
            borderColor: errBorder(!!err.motorcycle_id),
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = errBorder(!!err.motorcycle_id))
          }
        >
          <option value="">No motorcycle assigned</option>
          {motorcycles.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} — {CATEGORY_LABELS[m.category] ?? m.category}
            </option>
          ))}
        </select>
      </Field>

      <SectionDivider title="Customer" />

      <div className="admin-form-2col">
        <Field label="Name *" error={err.customer_name}>
          <input
            type="text"
            name="customer_name"
            placeholder="Full name"
            required
            style={{
              ...baseInput,
              borderColor: errBorder(!!err.customer_name),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = errBorder(!!err.customer_name))
            }
          />
        </Field>

        <Field label="Phone *" error={err.customer_phone}>
          <input
            type="tel"
            name="customer_phone"
            placeholder="+62 812 3456 7890"
            required
            style={{
              ...baseInput,
              borderColor: errBorder(!!err.customer_phone),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = errBorder(
                !!err.customer_phone,
              ))
            }
          />
        </Field>
      </div>

      <Field label="Email">
        <input
          type="email"
          name="customer_email"
          placeholder="customer@email.com"
          style={{ ...baseInput }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
        />
      </Field>

      <SectionDivider title="Rental Period" />

      <Field label="Rental type *" error={err.rental_type}>
        <select
          name="rental_type"
          value={rentalType}
          onChange={(e) => setRentalType(e.target.value)}
          style={{
            ...baseInput,
            cursor: 'pointer',
            borderColor: errBorder(!!err.rental_type),
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = errBorder(!!err.rental_type))
          }
        >
          {Object.entries(RENTAL_LABELS).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <div className="admin-form-2col">
        <Field label="Start date *" error={err.start_date}>
          <input
            type="date"
            name="start_date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{
              ...baseInput,
              borderColor: errBorder(!!err.start_date),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = errBorder(!!err.start_date))
            }
          />
        </Field>

        <Field label="End date *" error={err.end_date}>
          <input
            type="date"
            name="end_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{
              ...baseInput,
              borderColor: errBorder(!!err.end_date),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = errBorder(!!err.end_date))
            }
          />
        </Field>
      </div>

      {pricePreview !== null && (
        <div
          style={{
            padding: '10px 14px',
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid rgba(34,197,94,0.25)',
            fontSize: 13,
            color: '#15803d',
            marginBottom: 20,
          }}
        >
          Estimated price:{' '}
          <strong style={{ fontWeight: 600 }}>
            Rp {pricePreview.toLocaleString('id-ID')}
          </strong>
        </div>
      )}

      <SectionDivider title="Additional" />

      <Field label="Delivery address">
        <input
          type="text"
          name="delivery_address"
          placeholder="Hotel or villa address"
          style={{ ...baseInput }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
        />
      </Field>

      <Field label="Notes">
        <textarea
          name="notes"
          placeholder="Internal notes…"
          rows={3}
          style={{
            ...baseInput,
            resize: 'vertical',
            minHeight: 80,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
        />
      </Field>

      <div
        style={{ marginTop: 8, display: 'flex', gap: 16, alignItems: 'center' }}
      >
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: '11px 28px',
            background: pending ? '#999' : '#0A0A0A',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: pending ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-barlow), sans-serif',
            transition: 'background 0.15s',
          }}
        >
          {pending ? 'Creating…' : 'Create booking'}
        </button>
        <a
          href="/admin/bookings"
          style={{
            fontSize: 13,
            color: '#777777',
            fontWeight: 300,
            textDecoration: 'none',
          }}
        >
          ← Back to list
        </a>
      </div>
    </form>
  )
}
