import type { BookingStatus } from '@/lib/types/database'

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  pending: {
    label: 'Pending',
    bg: 'rgba(245,158,11,0.1)',
    text: '#b45309',
    border: 'rgba(245,158,11,0.35)',
  },
  confirmed: {
    label: 'Confirmed',
    bg: 'rgba(59,130,246,0.1)',
    text: '#1d4ed8',
    border: 'rgba(59,130,246,0.35)',
  },
  active: {
    label: 'Active',
    bg: 'rgba(34,197,94,0.1)',
    text: '#15803d',
    border: 'rgba(34,197,94,0.35)',
  },
  completed: {
    label: 'Completed',
    bg: 'rgba(107,114,128,0.1)',
    text: '#4b5563',
    border: 'rgba(107,114,128,0.3)',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'rgba(239,68,68,0.1)',
    text: '#dc2626',
    border: 'rgba(239,68,68,0.3)',
  },
}

export default function BookingStatusBadge({
  status,
}: {
  status: BookingStatus
}) {
  const { label, bg, text, border } = STATUS_CONFIG[status]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        background: bg,
        color: text,
        border: `1px solid ${border}`,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-barlow), sans-serif',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
