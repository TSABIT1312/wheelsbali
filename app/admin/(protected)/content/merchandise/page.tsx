import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { toggleMerchandisePublishedAction } from '@/actions/merchandise'
import MerchandiseDeleteButton from '@/components/admin/MerchandiseDeleteButton'
import type { Merchandise } from '@/lib/types/database'

export const metadata: Metadata = {
  title: 'Merchandise — Wheels Bali Admin',
}

export default async function MerchandisePage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('merchandise')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  const list = (data ?? []) as Merchandise[]

  return (
    <div style={{ fontFamily: 'var(--font-barlow), sans-serif', maxWidth: 1040 }}>
      <div style={{ marginBottom: 12 }}>
        <Link
          href="/admin/content"
          style={{
            fontSize: 12,
            color: '#777777',
            fontWeight: 300,
            textDecoration: 'none',
          }}
        >
          ← Content
        </Link>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 40,
          marginTop: 12,
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
            Merchandise.
          </h1>
          <p style={{ fontSize: 14, color: '#777777', fontWeight: 300 }}>
            {list.length} {list.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        <Link
          href="/admin/content/merchandise/new"
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
          + Add product
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
            No products yet.{' '}
            <Link
              href="/admin/content/merchandise/new"
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
                gridTemplateColumns: '56px 1fr 140px 100px 120px 120px',
                alignItems: 'center',
                padding: '10px 24px',
                gap: 0,
              }}
            >
              {['', 'Name', 'Price', 'Badge', 'Status', ''].map((col, i) => (
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
              ))}
            </div>

            {list.map((item) => {
              const toggleAction = toggleMerchandisePublishedAction.bind(
                null,
                item.id,
                item.is_published,
              )

              return (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    display: 'grid',
                    gridTemplateColumns: '56px 1fr 140px 100px 120px 120px',
                    alignItems: 'center',
                    padding: '14px 24px',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: '#F5F5F5',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
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
                      {item.name}
                    </div>
                    {item.description && (
                      <div
                        style={{
                          fontSize: 11,
                          color: '#777777',
                          fontWeight: 300,
                          marginTop: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.description}
                      </div>
                    )}
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
                    Rp {item.price.toLocaleString('id-ID')}
                  </div>

                  {/* Badge */}
                  <div style={{ fontSize: 12, color: '#777777' }}>
                    {item.badge ?? '—'}
                  </div>

                  {/* Published toggle */}
                  <form action={toggleAction}>
                    <button
                      type="submit"
                      style={{
                        padding: '4px 10px',
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        border: `1px solid ${item.is_published ? 'rgba(34,197,94,0.5)' : '#E0E0E0'}`,
                        background: item.is_published
                          ? 'rgba(34,197,94,0.08)'
                          : 'transparent',
                        color: item.is_published ? '#16a34a' : '#999',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-barlow), sans-serif',
                      }}
                    >
                      {item.is_published ? 'Published' : 'Hidden'}
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
                      href={`/admin/content/merchandise/${item.id}`}
                      style={{
                        fontSize: 12,
                        color: '#0A0A0A',
                        fontWeight: 500,
                        textDecoration: 'none',
                      }}
                    >
                      Edit
                    </Link>
                    <MerchandiseDeleteButton id={item.id} name={item.name} />
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
