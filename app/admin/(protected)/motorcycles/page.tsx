import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { toggleAvailabilityAction } from '@/actions/motorcycles'
import DeleteButton from '@/components/admin/DeleteButton'
import type { MotorcycleWithImages } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Motorcycles — Wheels Bali Admin',
}

const CATEGORY_LABEL: Record<string, string> = {
  automatic: 'Automatic',
  large_scooter: 'Large Scooter',
  trail: 'Trail',
}

export default async function MotorcyclesPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('motorcycles')
    .select('*, motorcycle_images(*)')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  const list = (data ?? []) as unknown as MotorcycleWithImages[]

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 1040 }}>
      {/* Page header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        <div style={{ minWidth: 0 }}>
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
            Motorcycles.
          </h1>
          <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
            {list.length} {list.length === 1 ? 'bike' : 'bikes'} in the fleet
          </p>
        </div>
        <Link
          href="/admin/motorcycles/new"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#0A0A0A',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          + Add bike
        </Link>
      </div>

      {list.length === 0 ? (
        <div
          style={{
            border: '1px solid #E0E0E0',
            background: '#FFFFFF',
            padding: '60px 40px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
            No motorcycles yet.{' '}
            <Link
              href="/admin/motorcycles/new"
              style={{ color: '#0A0A0A', fontWeight: 500 }}
            >
              Add the first one →
            </Link>
          </p>
        </div>
      ) : (
        <div className="admin-table-scroll">
        <div
          className="admin-table-inner"
          style={{
            border: '1px solid #E0E0E0',
            background: '#E0E0E0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {/* Column headers */}
          <div
            style={{
              background: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: '60px 1fr 140px 160px 120px 120px',
              alignItems: 'center',
              padding: '10px 24px',
              gap: 0,
            }}
          >
            {['', 'Name', 'Category', 'Price / Day', 'Status', ''].map(
              (col, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#777777',
                    textAlign: i === 5 ? 'right' : 'left',
                  }}
                >
                  {col}
                </span>
              ),
            )}
          </div>

          {list.map((m) => {
            const primaryImage =
              m.motorcycle_images.find((img) => img.is_primary) ??
              m.motorcycle_images[0] ??
              null

            const toggleAction = toggleAvailabilityAction.bind(
              null,
              m.id,
              m.is_available,
            )

            return (
              <div
                key={m.id}
                style={{
                  background: '#FFFFFF',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr 140px 160px 120px 120px',
                  alignItems: 'center',
                  padding: '14px 24px',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 44,
                    height: 33,
                    background: '#F5F5F5',
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={m.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="44px"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        color: '#D0D0D0',
                      }}
                    >
                      □
                    </div>
                  )}
                </div>

                {/* Name */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-barlow-condensed), sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      fontStyle: 'italic',
                      color: '#0A0A0A',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {m.name}
                  </div>
                  {m.tag && (
                    <div
                      style={{
                        fontSize: 11,
                        color: '#777777',
                        fontWeight: 300,
                        marginTop: 1,
                      }}
                    >
                      {m.tag}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div style={{ fontSize: 12, color: '#777777' }}>
                  {CATEGORY_LABEL[m.category] ?? m.category}
                </div>

                {/* Price */}
                <div
                  style={{
                    fontFamily: 'var(--font-barlow-condensed), sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0A0A0A',
                  }}
                >
                  Rp {m.price_day.toLocaleString('id-ID')}
                </div>

                {/* Availability toggle */}
                <form action={toggleAction}>
                  <button
                    type="submit"
                    style={{
                      padding: '4px 10px',
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      border: `1px solid ${m.is_available ? 'rgba(34,197,94,0.5)' : '#E0E0E0'}`,
                      background: m.is_available
                        ? 'rgba(34,197,94,0.08)'
                        : 'transparent',
                      color: m.is_available ? '#16a34a' : '#999',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-barlow), sans-serif',
                    }}
                  >
                    {m.is_available ? 'Available' : 'Unavailable'}
                  </button>
                </form>

                {/* Actions */}
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    href={`/admin/motorcycles/${m.id}`}
                    style={{
                      fontSize: 12,
                      color: '#0A0A0A',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    Edit
                  </Link>
                  <DeleteButton id={m.id} name={m.name} />
                </div>
              </div>
            )
          })}
        </div>
        </div>
      )}
    </div>
  )
}
