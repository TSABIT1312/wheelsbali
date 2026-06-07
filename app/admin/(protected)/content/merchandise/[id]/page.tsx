import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MerchandiseForm from '@/components/admin/MerchandiseForm'
import MerchandiseDeleteButton from '@/components/admin/MerchandiseDeleteButton'
import type { Merchandise } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Edit Product — Wheels Bali Admin',
}

export default async function EditMerchandisePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data } = await supabase
    .from('merchandise')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const product = data as Merchandise

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 720 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/admin/content/merchandise"
            style={{
              fontSize: 12,
              color: '#777777',
              fontWeight: 300,
              textDecoration: 'none',
            }}
          >
            ← Merchandise
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <h1
              className="admin-h1"
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontWeight: 700,
                fontStyle: 'italic',
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                color: '#0A0A0A',
                marginBottom: 8,
              }}
            >
              Edit product.
            </h1>
            <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
              {product.name}
            </p>
          </div>
          <MerchandiseDeleteButton id={product.id} name={product.name} />
        </div>
      </div>

      <div
        className="admin-panel"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
        }}
      >
        <MerchandiseForm key={product.updated_at} product={product} />
      </div>
    </div>
  )
}
