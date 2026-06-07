import { createAdminClient } from '@/lib/supabase/server'
import type { MotorcycleWithImages, ContentHero, ContentFAQ, Merchandise } from '@/lib/types/database'
import { HERO_ROW_ID } from '@/lib/types/database'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Fleet from '@/components/sections/Fleet'
import Pricing from '@/components/sections/Pricing'
import BookingProcess from '@/components/sections/BookingProcess'
import DeliveryAreas from '@/components/sections/DeliveryAreas'
import Requirements from '@/components/sections/Requirements'
import FAQ from '@/components/sections/FAQ'
import MerchandiseSection from '@/components/sections/Merchandise'
import CTAStrip from '@/components/sections/CTAStrip'
import Contact from '@/components/sections/Contact'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export const revalidate = 3600

export default async function Home() {
  const supabase = createAdminClient()

  const [{ data: hero }, { data: motorcycles }, { data: faqs }, { data: merchandise }] =
    await Promise.all([
      supabase.from('content_hero').select('*').eq('id', HERO_ROW_ID).single(),
      supabase
        .from('motorcycles')
        .select('*, motorcycle_images(*)')
        .eq('is_available', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('content_faq')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
      supabase
        .from('merchandise')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true }),
    ])

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero data={hero as ContentHero | null} />
        <WhyChooseUs />
        <Fleet motorcycles={(motorcycles ?? []) as MotorcycleWithImages[]} />
        <Pricing />
        <BookingProcess />
        <DeliveryAreas />
        <Requirements />
        <FAQ faqs={(faqs ?? []) as ContentFAQ[]} />
        <MerchandiseSection products={(merchandise ?? []) as Merchandise[]} />
        <CTAStrip />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
