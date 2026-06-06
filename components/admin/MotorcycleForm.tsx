'use client'

import { useActionState } from 'react'
import {
  createMotorcycleAction,
  updateMotorcycleAction,
} from '@/actions/motorcycles'
import type { MotorcycleFormState } from '@/actions/motorcycles'
import type { Motorcycle } from '@/lib/types/database'

const CATEGORY_OPTIONS = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'large_scooter', label: 'Large Scooter' },
  { value: 'trail', label: 'Trail' },
]

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
          display: 'block',
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

function inputBorderColor(hasError: boolean) {
  return hasError ? '#fca5a5' : '#E0E0E0'
}

export default function MotorcycleForm({
  motorcycle,
}: {
  motorcycle?: Motorcycle
}) {
  const isEdit = !!motorcycle

  const action = isEdit
    ? updateMotorcycleAction.bind(null, motorcycle.id)
    : createMotorcycleAction

  const [state, formAction, pending] = useActionState<
    MotorcycleFormState,
    FormData
  >(action, null)

  const err = state?.errors ?? {}

  return (
    <form action={formAction}>
      {state?.message && (
        <div
          style={{
            padding: '12px 16px',
            marginBottom: 24,
            background:
              state.message === 'Changes saved.'
                ? 'rgba(34,197,94,0.08)'
                : '#fff1f1',
            border: `1px solid ${
              state.message === 'Changes saved.'
                ? 'rgba(34,197,94,0.3)'
                : '#fca5a5'
            }`,
            fontSize: 13,
            color:
              state.message === 'Changes saved.' ? '#16a34a' : '#dc2626',
          }}
        >
          {state.message}
        </div>
      )}

      <SectionDivider title="Basic Info" />

      <Field label="Name *" error={err.name}>
        <input
          type="text"
          name="name"
          defaultValue={motorcycle?.name ?? ''}
          placeholder="e.g. Honda Vario 160"
          required
          style={{ ...baseInput, borderColor: inputBorderColor(!!err.name) }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = inputBorderColor(!!err.name))
          }
        />
      </Field>

      <div className="admin-form-2col">
        <Field label="Category *" error={err.category}>
          <select
            name="category"
            defaultValue={motorcycle?.category ?? ''}
            style={{
              ...baseInput,
              borderColor: inputBorderColor(!!err.category),
              cursor: 'pointer',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = inputBorderColor(!!err.category))
            }
          >
            <option value="">Select category</option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tag">
          <input
            type="text"
            name="tag"
            defaultValue={motorcycle?.tag ?? ''}
            placeholder="e.g. Best Seller"
            style={{ ...baseInput }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
          />
        </Field>
      </div>

      <div className="admin-form-2col">
        <Field label="Models">
          <input
            type="text"
            name="models"
            defaultValue={motorcycle?.models ?? ''}
            placeholder="e.g. 2022, 2023"
            style={{ ...baseInput }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
          />
        </Field>

        <Field label="Engine">
          <input
            type="text"
            name="engine_cc"
            defaultValue={motorcycle?.engine_cc ?? ''}
            placeholder="e.g. 160cc"
            style={{ ...baseInput }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
          />
        </Field>
      </div>

      <SectionDivider title="Pricing (IDR)" />

      <div
        className="admin-form-3col"
      >
        <Field label="Per Day *" error={err.price_day}>
          <input
            type="number"
            name="price_day"
            defaultValue={motorcycle?.price_day ?? ''}
            placeholder="80000"
            min={1}
            required
            style={{
              ...baseInput,
              borderColor: inputBorderColor(!!err.price_day),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = inputBorderColor(
                !!err.price_day,
              ))
            }
          />
        </Field>

        <Field label="Per Week *" error={err.price_week}>
          <input
            type="number"
            name="price_week"
            defaultValue={motorcycle?.price_week ?? ''}
            placeholder="500000"
            min={1}
            required
            style={{
              ...baseInput,
              borderColor: inputBorderColor(!!err.price_week),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = inputBorderColor(
                !!err.price_week,
              ))
            }
          />
        </Field>

        <Field label="Per Month *" error={err.price_month}>
          <input
            type="number"
            name="price_month"
            defaultValue={motorcycle?.price_month ?? ''}
            placeholder="1700000"
            min={1}
            required
            style={{
              ...baseInput,
              borderColor: inputBorderColor(!!err.price_month),
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = inputBorderColor(
                !!err.price_month,
              ))
            }
          />
        </Field>
      </div>

      <SectionDivider title="Settings" />

      <div
        className="admin-form-price"
      >
        <Field label="Availability">
          <select
            name="is_available"
            defaultValue={String(motorcycle?.is_available ?? true)}
            style={{ ...baseInput, cursor: 'pointer' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </Field>

        <Field label="WhatsApp Pre-fill">
          <input
            type="text"
            name="wa_message"
            defaultValue={motorcycle?.wa_message ?? ''}
            placeholder="Hi, I'd like to rent…"
            style={{ ...baseInput }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0A0A0A')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E0E0E0')}
          />
        </Field>
      </div>

      <div style={{ marginTop: 8, display: 'flex', gap: 16, alignItems: 'center' }}>
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
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create motorcycle'}
        </button>
        {isEdit && (
          <a
            href="/admin/motorcycles"
            style={{
              fontSize: 13,
              color: '#777777',
              fontWeight: 300,
              textDecoration: 'none',
            }}
          >
            ← Back to list
          </a>
        )}
      </div>
    </form>
  )
}
