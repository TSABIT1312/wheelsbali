'use client'

import { deleteMotorcycleAction } from '@/actions/motorcycles'

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteMotorcycleAction.bind(null, id)}
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
