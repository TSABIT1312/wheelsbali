import type { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/server'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const admin = createAdminClient()
  const { data: motorcycles } = await admin
    .from('motorcycles')
    .select('id, updated_at')
    .eq('is_available', true)

  const bikeRoutes: MetadataRoute.Sitemap = (motorcycles ?? []).map((moto) => ({
    url: `https://wheelsbali.com/bikes/${moto.id}`,
    lastModified: moto.updated_at,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://wheelsbali.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...bikeRoutes,
  ]
}
