'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'

export type MerchandiseFormState = {
  errors?: {
    name?: string[]
    price?: string[]
    image_url?: string[]
  }
  message?: string
} | null

type ParsedValues = {
  name: string
  price: number
  image_url: string
  description: string | null
  badge: string | null
  is_published: boolean
  sort_order: number
}

function parseForm(formData: FormData): {
  values: ParsedValues
  errors: NonNullable<MerchandiseFormState>['errors']
  hasErrors: boolean
} {
  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const priceRaw = (formData.get('price') as string | null)?.trim() ?? ''
  const price = Number(priceRaw)
  const image_url = (formData.get('image_url') as string | null)?.trim() ?? ''
  const description = (formData.get('description') as string | null)?.trim() || null
  const badge = (formData.get('badge') as string | null)?.trim() || null
  const is_published = formData.get('is_published') === 'true'
  const sort_order = Number(formData.get('sort_order')) || 0

  const errors: NonNullable<MerchandiseFormState>['errors'] = {}
  if (!name) errors.name = ['Product name is required.']
  if (!priceRaw || isNaN(price) || price <= 0)
    errors.price = ['Price must be a positive number.']
  if (!image_url) {
    errors.image_url = ['Image URL is required.']
  } else if (!/^https?:\/\//i.test(image_url)) {
    errors.image_url = ['Image URL must start with http:// or https://']
  }

  return {
    values: { name, price, image_url, description, badge, is_published, sort_order },
    errors,
    hasErrors: Object.keys(errors).length > 0,
  }
}

export async function createMerchandiseAction(
  _prevState: MerchandiseFormState,
  formData: FormData,
): Promise<MerchandiseFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized.' }

  const { values, errors, hasErrors } = parseForm(formData)
  if (hasErrors) return { errors }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('merchandise')
    .insert(values)
    .select('id')
    .single()

  if (error || !data) return { message: 'Failed to create product. Please try again.' }

  revalidatePath('/admin/content/merchandise')
  revalidatePath('/', 'page')
  redirect(`/admin/content/merchandise/${data.id}`)
}

export async function updateMerchandiseAction(
  id: string,
  _prevState: MerchandiseFormState,
  formData: FormData,
): Promise<MerchandiseFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized.' }

  const { values, errors, hasErrors } = parseForm(formData)
  if (hasErrors) return { errors }

  const admin = createAdminClient()
  const { error } = await admin.from('merchandise').update(values).eq('id', id)

  if (error) return { message: 'Failed to save changes. Please try again.' }

  revalidatePath('/admin/content/merchandise')
  revalidatePath(`/admin/content/merchandise/${id}`)
  revalidatePath('/', 'page')
  return { message: 'Changes saved.' }
}

export async function deleteMerchandiseAction(
  id: string,
  _formData?: FormData,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const admin = createAdminClient()
  await admin.from('merchandise').delete().eq('id', id)

  revalidatePath('/admin/content/merchandise')
  revalidatePath('/', 'page')
  redirect('/admin/content/merchandise')
}

export async function toggleMerchandisePublishedAction(
  id: string,
  currentValue: boolean,
  _formData?: FormData,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const admin = createAdminClient()
  await admin.from('merchandise').update({ is_published: !currentValue }).eq('id', id)

  revalidatePath('/admin/content/merchandise')
  revalidatePath('/', 'page')
}
