'use client'

import { useActionState, useRef } from 'react'
import { updateBookingStatusAction } from '@/actions/bookings'
import type { BookingStatusState } from '@/actions/bookings'
import type { BookingStatus } from '@/lib/types/database'

type Transition = {
  to: BookingStatus
  label: string
  style: 'primary' | 'danger'
}

const TRANSITIONS: Partial<Record<BookingStatus, Transition[]>> = {
  pending: [
    { to: 'confirmed', label: 'Confirm booking', style: 'primary' },
    { to: 'cancelled', label: 'Cancel booking', style: 'danger' },
  ],
  confirmed: [
    { to: 'active', label: 'Set active', style: 'primary' },
    { to: 'cancelled', label: 'Cancel booking', style: 'danger' },
  ],
  active: [
    { to: 'completed', label: 'Mark completed', style: 'primary' },
    { to: 'cancelled', label: 'Cancel booking', style: 'danger' },
  ],
}

export default function BookingActions({
  bookingId,
  currentStatus,
  hasConflict,
}: {
  bookingId: string
  currentStatus: BookingStatus
  hasConflict: boolean
}) {
  const action = updateBookingStatusAction.bind(null, bookingId)
  const [state, formAction, pending] = useActionState<BookingStatusState, FormData>(
    action,
    null,
  )

  // Uncontrolled hidden input — set via ref before form submits
  const statusInputRef = useRef<HTMLInputElement>(null)

  const transitions = TRANSITIONS[currentStatus] ?? []
  if (transitions.length === 0) return null

  return (
    <div>
      {hasConflict && (
        <div
          style={{
            padding: '10px 14px',
            marginBottom: 16,
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.3)',
            fontSize: 13,
            color: '#92400e',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ fontWeight: 600 }}>Availability conflict.</strong>{' '}
          This motorcycle already has a confirmed or active booking overlapping
          these dates. Confirm only after resolving the conflict.
        </div>
      )}

      <form
        action={formAction}
        onSubmit={(e) => {
          const target = statusInputRef.current?.value
          if (target === 'cancelled') {
            if (!confirm('Cancel this booking? This cannot be undone.')) {
              e.preventDefault()
            }
          }
        }}
      >
        <input
          ref={statusInputRef}
          type="hidden"
          name="status"
          defaultValue=""
        />

        {(state?.error) && (
          <div
            style={{
              padding: '10px 14px',
              marginBottom: 14,
              background: '#fff1f1',
              border: '1px solid #fca5a5',
              fontSize: 13,
              color: '#dc2626',
            }}
          >
            {state.error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {transitions.map(({ to, label, style }) => {
            const isDanger = style === 'danger'
            const blockedByConflict = (to === 'confirmed' || to === 'active') && hasConflict
            const disabled = pending || blockedByConflict

            return (
              <button
                key={to}
                type="submit"
                disabled={disabled}
                onClick={() => {
                  if (statusInputRef.current) {
                    statusInputRef.current.value = to
                  }
                }}
                style={{
                  padding: '9px 20px',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: isDanger
                    ? '1px solid rgba(239,68,68,0.4)'
                    : '1px solid #0A0A0A',
                  background: isDanger
                    ? 'transparent'
                    : disabled
                      ? '#999'
                      : '#0A0A0A',
                  color: isDanger ? '#dc2626' : '#FFFFFF',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-barlow), sans-serif',
                  opacity: disabled ? 0.6 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                {pending ? '…' : label}
              </button>
            )
          })}
        </div>
      </form>
    </div>
  )
}
