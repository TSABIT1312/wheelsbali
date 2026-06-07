// ============================================================
// Auto-maintained Supabase database types.
// Keep in sync with supabase/migrations/*.sql.
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      // ── motorcycles ──────────────────────────────
      motorcycles: {
        Row: {
          id: string
          name: string
          category: 'automatic' | 'large_scooter' | 'trail'
          models: string | null
          engine_cc: string | null
          tag: string | null
          price_day: number
          price_week: number
          price_month: number
          is_available: boolean
          sort_order: number
          wa_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'automatic' | 'large_scooter' | 'trail'
          models?: string | null
          engine_cc?: string | null
          tag?: string | null
          price_day: number
          price_week: number
          price_month: number
          is_available?: boolean
          sort_order?: number
          wa_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'automatic' | 'large_scooter' | 'trail'
          models?: string | null
          engine_cc?: string | null
          tag?: string | null
          price_day?: number
          price_week?: number
          price_month?: number
          is_available?: boolean
          sort_order?: number
          wa_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      // ── motorcycle_images ─────────────────────────
      motorcycle_images: {
        Row: {
          id: string
          motorcycle_id: string
          storage_path: string
          url: string
          is_primary: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          motorcycle_id: string
          storage_path: string
          url: string
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          motorcycle_id?: string
          storage_path?: string
          url?: string
          is_primary?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'motorcycle_images_motorcycle_id_fkey'
            columns: ['motorcycle_id']
            referencedRelation: 'motorcycles'
            referencedColumns: ['id']
          },
        ]
      }

      // ── bookings ──────────────────────────────────
      bookings: {
        Row: {
          id: string
          motorcycle_id: string | null
          customer_name: string
          customer_email: string | null
          customer_phone: string
          rental_type: 'daily' | 'weekly' | 'monthly'
          start_date: string
          end_date: string
          total_price: number | null
          status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          delivery_address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          motorcycle_id?: string | null
          customer_name: string
          customer_email?: string | null
          customer_phone: string
          rental_type: 'daily' | 'weekly' | 'monthly'
          start_date: string
          end_date: string
          total_price?: number | null
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          delivery_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          motorcycle_id?: string | null
          customer_name?: string
          customer_email?: string | null
          customer_phone?: string
          rental_type?: 'daily' | 'weekly' | 'monthly'
          start_date?: string
          end_date?: string
          total_price?: number | null
          status?: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
          delivery_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'bookings_motorcycle_id_fkey'
            columns: ['motorcycle_id']
            referencedRelation: 'motorcycles'
            referencedColumns: ['id']
          },
        ]
      }

      // ── content_hero ──────────────────────────────
      content_hero: {
        Row: {
          id: string
          heading: string[]
          subtext: string
          stats: Json
          updated_at: string
        }
        Insert: {
          id?: string
          heading?: string[]
          subtext?: string
          stats?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          heading?: string[]
          subtext?: string
          stats?: Json
          updated_at?: string
        }
        Relationships: []
      }

      // ── content_testimonials ──────────────────────
      content_testimonials: {
        Row: {
          id: string
          name: string
          location: string | null
          rating: number
          body: string
          is_published: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          location?: string | null
          rating?: number
          body: string
          is_published?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string | null
          rating?: number
          body?: string
          is_published?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }

      // ── content_faq ───────────────────────────────
      content_faq: {
        Row: {
          id: string
          question: string
          answer: string
          is_published: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          is_published?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          is_published?: boolean
          sort_order?: number
          created_at?: string
        }
        Relationships: []
      }

      // ── merchandise ───────────────────────────────
      merchandise: {
        Row: {
          id: string
          name: string
          price: number
          image_url: string
          description: string | null
          badge: string | null
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          image_url: string
          description?: string | null
          badge?: string | null
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          image_url?: string
          description?: string | null
          badge?: string | null
          is_published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      // ── content_gallery ───────────────────────────
      content_gallery: {
        Row: {
          id: string
          storage_path: string
          url: string
          alt_text: string | null
          sort_order: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          storage_path: string
          url: string
          alt_text?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          storage_path?: string
          url?: string
          alt_text?: string | null
          sort_order?: number
          is_published?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// ────────────────────────────────────────────────────────────
// Generic helpers (mirrors the pattern Supabase CLI generates)
// ────────────────────────────────────────────────────────────
type PublicTables = Database['public']['Tables']

export type Tables<T extends keyof PublicTables> =
  PublicTables[T]['Row']

export type TablesInsert<T extends keyof PublicTables> =
  PublicTables[T]['Insert']

export type TablesUpdate<T extends keyof PublicTables> =
  PublicTables[T]['Update']

// ────────────────────────────────────────────────────────────
// Named convenience types — use these throughout the app
// ────────────────────────────────────────────────────────────
export type Motorcycle      = Tables<'motorcycles'>
export type MotorcycleInsert = TablesInsert<'motorcycles'>
export type MotorcycleUpdate = TablesUpdate<'motorcycles'>

export type MotorcycleImage       = Tables<'motorcycle_images'>
export type MotorcycleImageInsert = TablesInsert<'motorcycle_images'>
export type MotorcycleImageUpdate = TablesUpdate<'motorcycle_images'>

export type Booking       = Tables<'bookings'>
export type BookingInsert = TablesInsert<'bookings'>
export type BookingUpdate = TablesUpdate<'bookings'>

export type ContentHero       = Tables<'content_hero'>
export type ContentHeroInsert = TablesInsert<'content_hero'>
export type ContentHeroUpdate = TablesUpdate<'content_hero'>

export type ContentTestimonial       = Tables<'content_testimonials'>
export type ContentTestimonialInsert = TablesInsert<'content_testimonials'>
export type ContentTestimonialUpdate = TablesUpdate<'content_testimonials'>

export type ContentFAQ       = Tables<'content_faq'>
export type ContentFAQInsert = TablesInsert<'content_faq'>
export type ContentFAQUpdate = TablesUpdate<'content_faq'>

export type ContentGallery       = Tables<'content_gallery'>
export type ContentGalleryInsert = TablesInsert<'content_gallery'>
export type ContentGalleryUpdate = TablesUpdate<'content_gallery'>

export type Merchandise       = Tables<'merchandise'>
export type MerchandiseInsert = TablesInsert<'merchandise'>
export type MerchandiseUpdate = TablesUpdate<'merchandise'>

// ────────────────────────────────────────────────────────────
// Enum-like string unions (match DB CHECK constraints)
// ────────────────────────────────────────────────────────────
export type MotorcycleCategory = Motorcycle['category']
export type BookingStatus      = Booking['status']
export type RentalType         = Booking['rental_type']

// ────────────────────────────────────────────────────────────
// Derived / composed types used by the UI
// ────────────────────────────────────────────────────────────

/** Hero stat item — matches the jsonb shape in content_hero.stats */
export type HeroStat = { num: string; label: string }

/** Motorcycle with its images pre-joined */
export type MotorcycleWithImages = Motorcycle & {
  motorcycle_images: MotorcycleImage[]
}

/** Booking with the associated motorcycle name for list views */
export type BookingWithMotorcycle = Booking & {
  motorcycles: Pick<Motorcycle, 'id' | 'name'> | null
}

/** Fixed id used to upsert the single content_hero row */
export const HERO_ROW_ID = '00000000-0000-0000-0000-000000000001' as const
