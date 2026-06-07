import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import type { MotorcycleWithImages } from '@/lib/types/database'

export const revalidate = 3600

const WA_NUMBER = '6281387070350'

const CATEGORY_LABEL: Record<string, string> = {
  automatic: 'Automatic Scooter',
  large_scooter: 'Large Scooter',
  trail: 'Trail / Adventure',
}

function formatIDR(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}K`
  }
  return amount.toString()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('motorcycles')
    .select('name, models, engine_cc, motorcycle_images(*)')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Bike not found — Wheels Bali' }

  const moto = data as unknown as MotorcycleWithImages
  const primaryImage =
    moto.motorcycle_images.find((img) => img.is_primary) ??
    moto.motorcycle_images[0] ??
    null

  const desc = [
    `Rent the ${moto.name} in Bali.`,
    moto.models ? `${moto.models}.` : null,
    moto.engine_cc ? `${moto.engine_cc}.` : null,
    'Delivered to your door. Book via WhatsApp.',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    title: `${moto.name} — Wheels Bali Motorbike Rental`,
    description: desc,
    alternates: { canonical: `/bikes/${id}` },
    openGraph: {
      title: `${moto.name} — Wheels Bali`,
      description: desc,
      images: primaryImage ? [{ url: primaryImage.url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${moto.name} — Wheels Bali`,
      description: desc,
      images: primaryImage ? [primaryImage.url] : [],
    },
  }
}

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createAdminClient()

  const { data } = await supabase
    .from('motorcycles')
    .select('*, motorcycle_images(*)')
    .eq('id', id)
    .single()

  if (!data) notFound()

  const moto = data as unknown as MotorcycleWithImages

  const images = [...moto.motorcycle_images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.sort_order - b.sort_order
  })

  const primaryImage = images[0] ?? null

  const waMsg =
    moto.wa_message ||
    `Hi, I'm interested in renting the ${moto.name}. Can you share availability and pricing?`

  // Related bikes: 3 other available bikes
  const { data: relatedData } = await supabase
    .from('motorcycles')
    .select('*, motorcycle_images(*)')
    .eq('is_available', true)
    .neq('id', id)
    .order('sort_order', { ascending: true })
    .limit(3)

  const related = (relatedData ?? []) as unknown as MotorcycleWithImages[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: moto.name,
    description: [moto.models, moto.engine_cc].filter(Boolean).join(' · '),
    image: primaryImage?.url,
    brand: { '@type': 'Brand', name: 'Wheels Bali' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'IDR',
      lowPrice: moto.price_day,
      highPrice: moto.price_month,
    },
  }

  const subtitle = [moto.models, moto.engine_cc].filter(Boolean).join(' · ')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Nav bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
          padding: '0 6vw',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-barlow), sans-serif',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontSize: 22,
            fontWeight: 800,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            color: '#0A0A0A',
            textDecoration: 'none',
          }}
        >
          Wheels Bali
        </Link>
        <Link
          href="/#fleet"
          style={{
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#777777',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          ← All bikes
        </Link>
      </header>

      <main id="main-content" style={{ fontFamily: 'var(--font-barlow), sans-serif', background: '#FFFFFF' }}>
        {/* Hero: image + info */}
        <div
          className="bike-detail-hero"
          style={{
            display: 'grid',
            padding: '56px 6vw',
            alignItems: 'start',
          }}
        >
          {/* Left: image gallery */}
          <div>
            {/* Primary image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                background: '#F5F5F5',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: 12,
              }}
            >
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={moto.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 96,
                  }}
                >
                  🏍️
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                }}
              >
                {images.slice(1, 5).map((img) => (
                  <div
                    key={img.id}
                    style={{
                      aspectRatio: '1 / 1',
                      background: '#F5F5F5',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={moto.name}
                      fill
                      sizes="(max-width: 768px) 25vw, 12vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: bike info */}
          <div style={{ paddingTop: 8 }}>
            {moto.tag && (
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: '#0A0A0A',
                  color: '#FFFFFF',
                  padding: '5px 10px',
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {moto.tag}
              </span>
            )}

            <h1
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 800,
                fontStyle: 'italic',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: '#0A0A0A',
                marginBottom: 8,
              }}
            >
              {moto.name}
            </h1>

            {subtitle && (
              <p
                style={{
                  fontSize: 14,
                  color: '#777777',
                  marginBottom: 8,
                  letterSpacing: '0.02em',
                }}
              >
                {subtitle}
              </p>
            )}

            <p
              style={{
                fontSize: 13,
                color: '#AAAAAA',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 32,
              }}
            >
              {CATEGORY_LABEL[moto.category] ?? moto.category}
            </p>

            {/* Price grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 1,
                background: '#E0E0E0',
                border: '1px solid #E0E0E0',
                marginBottom: 28,
              }}
            >
              {[
                { label: 'Per day', amount: moto.price_day },
                { label: 'Per week', amount: moto.price_week },
                { label: 'Per month', amount: moto.price_month },
              ].map((tier) => (
                <div
                  key={tier.label}
                  style={{
                    background: '#FFFFFF',
                    padding: '16px 12px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-barlow-condensed), sans-serif',
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#0A0A0A',
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {formatIDR(tier.amount)}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#777777',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tier.label}
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                fontSize: 12,
                color: '#AAAAAA',
                marginBottom: 28,
                fontWeight: 300,
              }}
            >
              Prices in IDR. Includes 1 helmet. Ask about long-term discounts.
            </p>

            {/* Book CTA */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '16px 32px',
                background: '#0A0A0A',
                color: '#FFFFFF',
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                textDecoration: 'none',
                marginBottom: 12,
                transition: 'opacity 0.2s',
              }}
            >
              Book via WhatsApp
            </a>

            <p
              style={{
                fontSize: 12,
                color: '#777777',
                textAlign: 'center',
                fontWeight: 300,
              }}
            >
              Delivery to your hotel or villa · No hidden fees
            </p>
          </div>
        </div>

        {/* Related bikes */}
        {related.length > 0 && (
          <div
            style={{
              padding: '56px 6vw 80px',
              borderTop: '1px solid #E0E0E0',
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#777777',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                style={{ display: 'block', width: 32, height: 1, background: '#777777' }}
              />
              More bikes
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-barlow-condensed), sans-serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                fontStyle: 'italic',
                lineHeight: 1.0,
                letterSpacing: '-0.01em',
                color: '#0A0A0A',
                marginBottom: 32,
              }}
            >
              You might also like.
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 1,
                background: '#E0E0E0',
                border: '1px solid #E0E0E0',
              }}
            >
              {related.map((r) => {
                const rPrimary =
                  r.motorcycle_images.find((img) => img.is_primary) ??
                  r.motorcycle_images[0] ??
                  null
                return (
                  <Link
                    key={r.id}
                    href={`/bikes/${r.id}`}
                    style={{
                      background: '#FFFFFF',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <div
                      style={{
                        height: 160,
                        background: '#F5F5F5',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {rPrimary ? (
                        <Image
                          src={rPrimary.url}
                          alt={r.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 48,
                          }}
                        >
                          🏍️
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-barlow-condensed), sans-serif',
                          fontSize: 20,
                          fontWeight: 700,
                          fontStyle: 'italic',
                          color: '#0A0A0A',
                          marginBottom: 2,
                        }}
                      >
                        {r.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#777777' }}>
                        from {formatIDR(r.price_day)} / day
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          background: '#0A0A0A',
          padding: '40px 6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          fontFamily: 'var(--font-barlow), sans-serif',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-barlow-condensed), sans-serif',
            fontSize: 18,
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#FFFFFF',
          }}
        >
          Wheels Bali
        </span>
        <span style={{ fontSize: 12, color: '#777777', fontWeight: 300 }}>
          © {new Date().getFullYear()} Wheels Bali. All rights reserved.
        </span>
      </footer>
    </>
  )
}
