'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { MotorcycleCategory } from '@/lib/types/database'

export type MotorcycleFormState = {
  errors?: {
    name?: string[]
    category?: string[]
    price_day?: string[]
    price_week?: string[]
    price_month?: string[]
  }
  message?: string
} | null

type ParsedValues = {
  name: string
  category: MotorcycleCategory
  models: string | null
  engine_cc: string | null
  tag: string | null
  wa_message: string | null
  price_day: number
  price_week: number
  price_month: number
  is_available: boolean
}

function parseMotorcycleForm(formData: FormData): {
  values: ParsedValues
  errors: NonNullable<MotorcycleFormState>['errors']
  hasErrors: boolean
} {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const category = (formData.get('category') as string | null)?.trim() ?? ''
  const models = (formData.get('models') as string | null)?.trim() || null
  const engine_cc = (formData.get('engine_cc') as string | null)?.trim() || null
  const tag = (formData.get('tag') as string | null)?.trim() || null
  const wa_message = (formData.get('wa_message') as string | null)?.trim() || null
  const price_day = Number(formData.get('price_day'))
  const price_week = Number(formData.get('price_week'))
  const price_month = Number(formData.get('price_month'))
  const is_available = formData.get('is_available') === 'true'

  const errors: NonNullable<MotorcycleFormState>['errors'] = {}
  if (!name) errors.name = ['Name is required.']
  if (!['automatic', 'large_scooter', 'trail'].includes(category)) {
    errors.category = ['Please select a category.']
  }
  if (!price_day || price_day <= 0) errors.price_day = ['Must be greater than 0.']
  if (!price_week || price_week <= 0) errors.price_week = ['Must be greater than 0.']
  if (!price_month || price_month <= 0) errors.price_month = ['Must be greater than 0.']

  return {
    values: { name, category: category as MotorcycleCategory, models, engine_cc, tag, wa_message, price_day, price_week, price_month, is_available },
    errors,
    hasErrors: Object.keys(errors).length > 0,
  }
}

export async function createMotorcycleAction(
  _prevState: MotorcycleFormState,
  formData: FormData,
): Promise<MotorcycleFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized.' }

  const { values, errors, hasErrors } = parseMotorcycleForm(formData)
  if (hasErrors) return { errors }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('motorcycles')
    .insert(values)
    .select('id')
    .single()

  if (error || !data) return { message: 'Failed to create motorcycle. Please try again.' }

  revalidatePath('/admin/motorcycles')
  revalidatePath('/', 'page')
  redirect(`/admin/motorcycles/${data.id}`)
}

export async function updateMotorcycleAction(
  id: string,
  _prevState: MotorcycleFormState,
  formData: FormData,
): Promise<MotorcycleFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized.' }

  const { values, errors, hasErrors } = parseMotorcycleForm(formData)
  if (hasErrors) return { errors }

  const admin = createAdminClient()
  const { error } = await admin.from('motorcycles').update(values).eq('id', id)

  if (error) return { message: 'Failed to update motorcycle. Please try again.' }

  revalidatePath('/admin/motorcycles')
  revalidatePath(`/admin/motorcycles/${id}`)
  revalidatePath('/', 'page')
  revalidatePath(`/bikes/${id}`, 'page')
  return { message: 'Changes saved.' }
}

export async function deleteMotorcycleAction(
  id: string,
  _formData?: FormData,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const admin = createAdminClient()

  const { data: images } = await admin
    .from('motorcycle_images')
    .select('storage_path')
    .eq('motorcycle_id', id)

  if (images && images.length > 0) {
    await admin.storage
      .from('motorcycle-images')
      .remove(images.map((img) => img.storage_path))
  }

  await admin.from('motorcycles').delete().eq('id', id)

  revalidatePath('/admin/motorcycles')
  revalidatePath('/', 'page')
  redirect('/admin/motorcycles')
}

export async function toggleAvailabilityAction(
  id: string,
  currentValue: boolean,
  _formData?: FormData,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const admin = createAdminClient()
  await admin.from('motorcycles').update({ is_available: !currentValue }).eq('id', id)

  revalidatePath('/admin/motorcycles')
  revalidatePath('/', 'page')
  revalidatePath(`/bikes/${id}`, 'page')
}

export type ImageUploadState = { error?: string; success?: boolean } | null

export async function uploadImageAction(
  motorcycleId: string,
  _prevState: ImageUploadState,
  formData: FormData,
): Promise<ImageUploadState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized.' }

  const file = formData.get('file') as File | null
  if (!file || file.size === 0) return { error: 'No file selected.' }

  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) return { error: 'Only JPEG, PNG, and WebP are allowed.' }
  if (file.size > 5 * 1024 * 1024) return { error: 'Image must be under 5 MB.' }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const storagePath = `${motorcycleId}/${Date.now()}.${ext}`

  const admin = createAdminClient()
  const { error: uploadError } = await admin.storage
    .from('motorcycle-images')
    .upload(storagePath, file, { contentType: file.type, upsert: false })

  if (uploadError) return { error: 'Upload failed. Please try again.' }

  const { data: urlData } = admin.storage
    .from('motorcycle-images')
    .getPublicUrl(storagePath)

  const { count } = await admin
    .from('motorcycle_images')
    .select('*', { count: 'exact', head: true })
    .eq('motorcycle_id', motorcycleId)

  const { error: insertError } = await admin.from('motorcycle_images').insert({
    motorcycle_id: motorcycleId,
    storage_path: storagePath,
    url: urlData.publicUrl,
    is_primary: count === 0,
    sort_order: count ?? 0,
  })

  if (insertError) {
    await admin.storage.from('motorcycle-images').remove([storagePath])
    return { error: 'Failed to save image record. Please try again.' }
  }

  revalidatePath(`/admin/motorcycles/${motorcycleId}`)
  revalidatePath('/', 'page')
  revalidatePath(`/bikes/${motorcycleId}`, 'page')
  return { success: true }
}

export async function deleteImageAction(
  imageId: string,
  storagePath: string,
  motorcycleId: string,
  _formData?: FormData,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const admin = createAdminClient()
  await admin.storage.from('motorcycle-images').remove([storagePath])
  await admin.from('motorcycle_images').delete().eq('id', imageId)

  revalidatePath(`/admin/motorcycles/${motorcycleId}`)
  revalidatePath('/', 'page')
  revalidatePath(`/bikes/${motorcycleId}`, 'page')
}
