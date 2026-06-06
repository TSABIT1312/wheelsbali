'use client'

import { deleteBookingAction } from '@/actions/bookings'

export default function BookingDeleteButton({ bookingId }: { bookingId: string }) {
  return (
    <form
      action={deleteBookingAction.bind(null, bookingId)}
      onSubmit={(e) => {
        if (!confirm('Permanently delete this booking? This cannot be undone.')) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        style={{
          padding: '9px 20px',
          background: 'transparent',
          color: '#dc2626',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          border: '1px solid rgba(239,68,68,0.4)',
          cursor: 'pointer',
          fontFamily: 'var(--font-barlow), sans-serif',
        }}
      >
        Delete booking
      </button>
    </form>
  )
}
