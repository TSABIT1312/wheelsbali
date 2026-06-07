'use client'

import { deleteMerchandiseAction } from '@/actions/merchandise'

export default function MerchandiseDeleteButton({
  id,
  name,
}: {
  id: string
  name: string
}) {
  return (
    <form
      action={deleteMerchandiseAction.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        style={{
          fontSize: 12,
          color: '#ef4444',
          fontWeight: 400,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'var(--font-barlow), sans-serif',
        }}
      >
        Delete
      </button>
    </form>
  )
}
