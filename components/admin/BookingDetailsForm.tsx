'use client'

import { useActionState } from 'react'
import { updateBookingDetailsAction } from '@/actions/bookings'
import type { BookingDetailsState } from '@/actions/bookings'

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
}

export default function BookingDetailsForm({
  bookingId,
  defaultNotes,
  defaultDeliveryAddress,
  defaultTotalPrice,
}: {
  bookingId: string
  defaultNotes: string
  defaultDeliveryAddress: string
  defaultTotalPrice: number | null
}) {
  const action = updateBookingDetailsAction.bind(null, bookingId)
  const [state, formAction, pending] = useActionState<BookingDetailsState, FormData>(
    action,
    null,
  )

  return (
    <form action={formAction}>
      {state?.error && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: 16,
            background: '#fff1f1',
            border: '1px solid #fca5a5',
            fontSize: 13,
            color: '#dc2626',
          }}
        >
          {state.error}
        </div>
      )}
      {state?.message && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: 16,
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.3)',
            fontSize: 13,
            color: '#16a34a',
          }}
        >
          {state.message}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
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
          Delivery address
        </div>
        <input
          type="text"
          name="delivery_address"
          defaultValue={defaultDeliveryAddress}
          placeholder="Hotel or villa address"
          style={{ ...baseInput }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
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
          Total price (IDR)
        </div>
        <input
          type="number"
          name="total_price"
          defaultValue={defaultTotalPrice ?? ''}
          placeholder="Leave blank to auto-calculate"
          min={0}
          style={{ ...baseInput }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
        />
      </div>

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
          Notes
        </div>
        <textarea
          name="notes"
          defaultValue={defaultNotes}
          placeholder="Internal notes…"
          rows={3}
          style={{ ...baseInput, resize: 'vertical', minHeight: 80 }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        style={{
          padding: '9px 22px',
          background: pending ? '#999' : '#0A0A0A',
          color: '#FFFFFF',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: pending ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-barlow), sans-serif',
        }}
      >
        {pending ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}
