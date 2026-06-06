import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MotorcycleForm from '@/components/admin/MotorcycleForm'
import ImageUploader from '@/components/admin/ImageUploader'
import type { MotorcycleWithImages } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Edit Motorcycle — Wheels Bali Admin',
}

export default async function EditMotorcyclePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()
  const { data } = await supabase
    .from('motorcycles')
    .select('*, motorcycle_images(*)')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const motorcycle = data as unknown as MotorcycleWithImages

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 720 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 12 }}>
          <Link
            href="/admin/motorcycles"
            style={{
              fontSize: 12,
              color: '#777777',
              fontWeight: 300,
              textDecoration: 'none',
            }}
          >
            ← Motorcycles
          </Link>
        </div>
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
          Edit motorcycle.
        </h1>
        <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
          {motorcycle.name}
        </p>
      </div>

      {/* Details form */}
      <div
        className="admin-panel"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
          marginBottom: 24,
        }}
      >
        <MotorcycleForm key={motorcycle.updated_at} motorcycle={motorcycle} />
      </div>

      {/* Image management */}
      <div
        className="admin-panel"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0E0E0',
        }}
      >
        <ImageUploader
          motorcycleId={id}
          images={motorcycle.motorcycle_images}
        />
      </div>
    </div>
  )
}
