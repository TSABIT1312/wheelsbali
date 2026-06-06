'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { BookingStatus, RentalType } from '@/lib/types/database'

// ─── Availability check ───────────────────────────────────────────────────────

async function hasConflict(
  motorcycleId: string,
  startDate: string,
  endDate: string,
  excludeBookingId?: string,
): Promise<boolean> {
  const admin = createAdminClient()
  // Overlap: existing.start < new.end AND existing.end > new.start
  let q = admin
    .from('bookings')
    .select('id', { count: 'exact', head: true })
    .eq('motorcycle_id', motorcycleId)
    .in('status', ['confirmed', 'active'])
    .lt('start_date', endDate)
    .gt('end_date', startDate)

  if (excludeBookingId) q = q.neq('id', excludeBookingId)

  const { count } = await q
  return (count ?? 0) > 0
}

// ─── Status update ────────────────────────────────────────────────────────────

export type BookingStatusState = { error?: string } | null

export async function updateBookingStatusAction(
  id: string,
  _prevState: BookingStatusState,
  formData: FormData,
): Promise<BookingStatusState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized.' }

  const newStatus = formData.get('status') as BookingStatus | null
  const validStatuses: BookingStatus[] = ['pending', 'confirmed', 'active', 'completed', 'cancelled']
  if (!newStatus || !validStatuses.includes(newStatus)) {
    return { error: 'Invalid status.' }
  }

  const admin = createAdminClient()

  if (newStatus === 'confirmed' || newStatus === 'active') {
    const { data: booking } = await admin
      .from('bookings')
      .select('motorcycle_id, start_date, end_date')
      .eq('id', id)
      .single()

    if (booking?.motorcycle_id) {
      const conflict = await hasConflict(
        booking.motorcycle_id,
        booking.start_date,
        booking.end_date,
        id,
      )
      if (conflict) {
        return {
          error:
            'This motorcycle already has a confirmed or active booking overlapping these dates. Resolve the conflict first.',
        }
      }
    }
  }

  const { error } = await admin
    .from('bookings')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) return { error: 'Failed to update status. Please try again.' }

  revalidatePath('/admin/bookings')
  revalidatePath(`/admin/bookings/${id}`)
  return null
}

// ─── Create booking ───────────────────────────────────────────────────────────

export type BookingFormState = {
  errors?: {
    motorcycle_id?: string[]
    customer_name?: string[]
    customer_phone?: string[]
    rental_type?: string[]
    start_date?: string[]
    end_date?: string[]
  }
  message?: string
} | null

export async function createBookingAction(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { message: 'Unauthorized.' }

  const motorcycle_id = (formData.get('motorcycle_id') as string | null)?.trim() || null
  const customer_name = (formData.get('customer_name') as string | null)?.trim() ?? ''
  const customer_phone = (formData.get('customer_phone') as string | null)?.trim() ?? ''
  const customer_email = (formData.get('customer_email') as string | null)?.trim() || null
  const rental_type = (formData.get('rental_type') as string | null) ?? ''
  const start_date = (formData.get('start_date') as string | null) ?? ''
  const end_date = (formData.get('end_date') as string | null) ?? ''
  const delivery_address = (formData.get('delivery_address') as string | null)?.trim() || null
  const notes = (formData.get('notes') as string | null)?.trim() || null

  type FieldErrors = NonNullable<BookingFormState>['errors']
  const errors: FieldErrors = {}

  if (!customer_name) errors.customer_name = ['Customer name is required.']
  if (!customer_phone) errors.customer_phone = ['Phone number is required.']
  if (!['daily', 'weekly', 'monthly'].includes(rental_type)) {
    errors.rental_type = ['Please select a rental type.']
  }
  if (!start_date) errors.start_date = ['Start date is required.']
  if (!end_date) errors.end_date = ['End date is required.']
  if (start_date && end_date && start_date >= end_date) {
    errors.end_date = ['End date must be after start date.']
  }

  if (Object.keys(errors).length > 0) return { errors }

  // Availability check
  if (motorcycle_id) {
    const conflict = await hasConflict(motorcycle_id, start_date, end_date)
    if (conflict) {
      return {
        errors: {
          motorcycle_id: [
            'This motorcycle is not available for the selected dates.',
          ],
        },
      }
    }
  }

  // Auto-calculate price
  let total_price: number | null = null
  if (motorcycle_id) {
    const admin = createAdminClient()
    const { data: moto } = await admin
      .from('motorcycles')
      .select('price_day, price_week, price_month')
      .eq('id', motorcycle_id)
      .single()

    if (moto && start_date && end_date) {
      const days = Math.ceil(
        (new Date(end_date).getTime() - new Date(start_date).getTime()) /
          86_400_000,
      )
      if (days > 0) {
        if (rental_type === 'daily') total_price = days * moto.price_day
        else if (rental_type === 'weekly')
          total_price = Math.ceil(days / 7) * moto.price_week
        else if (rental_type === 'monthly')
          total_price = Math.ceil(days / 30) * moto.price_month
      }
    }
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('bookings')
    .insert({
      motorcycle_id,
      customer_name,
      customer_phone,
      customer_email,
      rental_type: rental_type as RentalType,
      start_date,
      end_date,
      total_price,
      delivery_address,
      notes,
      status: 'pending',
    })
    .select('id')
    .single()

  if (error || !data) return { message: 'Failed to create booking. Please try again.' }

  redirect(`/admin/bookings/${data.id}`)
}

// ─── Update booking details ───────────────────────────────────────────────────

export type BookingDetailsState = { error?: string; message?: string } | null

export async function updateBookingDetailsAction(
  id: string,
  _prevState: BookingDetailsState,
  formData: FormData,
): Promise<BookingDetailsState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized.' }

  const notes = (formData.get('notes') as string | null)?.trim() || null
  const delivery_address = (formData.get('delivery_address') as string | null)?.trim() || null
  const total_price_raw = (formData.get('total_price') as string | null)?.trim()
  const total_price = total_price_raw ? Number(total_price_raw) : null

  if (total_price !== null && (isNaN(total_price) || total_price < 0)) {
    return { error: 'Total price must be a positive number.' }
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('bookings')
    .update({ notes, delivery_address, total_price })
    .eq('id', id)

  if (error) return { error: 'Failed to save changes. Please try again.' }

  revalidatePath(`/admin/bookings/${id}`)
  return { message: 'Changes saved.' }
}

// ─── Delete booking ───────────────────────────────────────────────────────────

export async function deleteBookingAction(
  id: string,
  _formData?: FormData,
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const admin = createAdminClient()
  await admin.from('bookings').delete().eq('id', id)

  revalidatePath('/admin/bookings')
  redirect('/admin/bookings')
}
