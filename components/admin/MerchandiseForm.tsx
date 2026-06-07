'use client'

import { useActionState, useState } from 'react'
import {
  createMerchandiseAction,
  updateMerchandiseAction,
} from '@/actions/merchandise'
import type { MerchandiseFormState } from '@/actions/merchandise'
import type { Merchandise } from '@/lib/types/database'

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
  hint,
  children,
}: {
  label: string
  error?: string[]
  hint?: string
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
      {hint && !error?.[0] && (
        <div style={{ fontSize: 11, color: '#777777', marginTop: 4 }}>{hint}</div>
      )}
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

export default function MerchandiseForm({
  product,
}: {
  product?: Merchandise
}) {
  const isEdit = !!product

  const action = isEdit
    ? updateMerchandiseAction.bind(null, product.id)
    : createMerchandiseAction

  const [state, formAction, pending] = useActionState<
    MerchandiseFormState,
    FormData
  >(action, null)

  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '')

  const err = state?.errors ?? {}
  const showPreview = /^https?:\/\//i.test(imageUrl)

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
          defaultValue={product?.name ?? ''}
          placeholder="e.g. Wheels Bali T-Shirt"
          required
          style={{ ...baseInput, borderColor: inputBorderColor(!!err.name) }}
        />
      </Field>

      <Field
        label="Price (IDR) *"
        error={err.price}
        hint="Enter whole rupiah, e.g. 150000"
      >
        <input
          type="number"
          name="price"
          inputMode="numeric"
          min={1}
          step={1}
          defaultValue={product?.price ?? ''}
          placeholder="150000"
          required
          style={{ ...baseInput, borderColor: inputBorderColor(!!err.price) }}
        />
      </Field>

      <Field label="Description" hint="Optional. Short product blurb.">
        <textarea
          name="description"
          defaultValue={product?.description ?? ''}
          rows={3}
          placeholder="Soft cotton, oversized cut, screen-printed logo."
          style={{ ...baseInput, resize: 'vertical', minHeight: 72 }}
        />
      </Field>

      <Field label="Badge / Label" hint="Optional. E.g. 'New', 'Limited'.">
        <input
          type="text"
          name="badge"
          defaultValue={product?.badge ?? ''}
          placeholder="New"
          style={baseInput}
        />
      </Field>

      <SectionDivider title="Image" />

      <Field
        label="Image URL *"
        error={err.image_url}
        hint="Paste a public image URL. You can upload to Supabase Storage and use that public link."
      >
        <input
          type="url"
          name="image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://…/product.jpg"
          required
          style={{
            ...baseInput,
            borderColor: inputBorderColor(!!err.image_url),
          }}
        />
      </Field>

      {showPreview && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            maxWidth: 220,
            background: '#F5F5F5',
            border: '1px solid #E0E0E0',
            marginBottom: 24,
            overflow: 'hidden',
          }}
        >
          {/* Use unoptimized <img> so any URL works without next.config domain whitelist */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.opacity = '0.2'
            }}
          />
        </div>
      )}

      <SectionDivider title="Visibility" />

      <Field
        label="Sort Order"
        hint="Lower numbers appear first. Defaults to 0."
      >
        <input
          type="number"
          name="sort_order"
          defaultValue={product?.sort_order ?? 0}
          step={1}
          style={baseInput}
        />
      </Field>

      <Field label="Published">
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            color: '#333333',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            name="is_published"
            value="true"
            defaultChecked={product?.is_published ?? true}
            style={{
              width: 16,
              height: 16,
              accentColor: '#0A0A0A',
              cursor: 'pointer',
            }}
          />
          Show this product on the public homepage
        </label>
      </Field>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: '12px 24px',
            background: '#0A0A0A',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.6 : 1,
            fontFamily: 'var(--font-barlow), sans-serif',
          }}
        >
          {pending
            ? 'Saving…'
            : isEdit
              ? 'Save changes'
              : 'Create product'}
        </button>
      </div>
    </form>
  )
}

