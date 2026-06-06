-- ============================================================
-- 0001_schema.sql
-- Core table definitions for Wheels Bali
-- Run this in the Supabase SQL Editor (or via Supabase CLI)
-- ============================================================

-- ────────────────────────────────────────────────
-- Shared trigger: keeps updated_at current
-- ────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ────────────────────────────────────────────────
-- motorcycles
-- ────────────────────────────────────────────────
CREATE TABLE motorcycles (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  category     text        NOT NULL
                             CHECK (category IN ('automatic', 'large_scooter', 'trail')),
  models       text,
  engine_cc    text,
  tag          text,
  price_day    integer     NOT NULL CHECK (price_day    > 0),
  price_week   integer     NOT NULL CHECK (price_week   > 0),
  price_month  integer     NOT NULL CHECK (price_month  > 0),
  is_available boolean     NOT NULL DEFAULT true,
  sort_order   integer     NOT NULL DEFAULT 0,
  wa_message   text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER motorcycles_updated_at
  BEFORE UPDATE ON motorcycles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ────────────────────────────────────────────────
-- motorcycle_images
-- ────────────────────────────────────────────────
CREATE TABLE motorcycle_images (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  motorcycle_id  uuid        NOT NULL
                               REFERENCES motorcycles(id) ON DELETE CASCADE,
  storage_path   text        NOT NULL,
  url            text        NOT NULL,
  is_primary     boolean     NOT NULL DEFAULT false,
  sort_order     integer     NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX motorcycle_images_motorcycle_id_idx
  ON motorcycle_images(motorcycle_id);


-- ────────────────────────────────────────────────
-- bookings
-- ────────────────────────────────────────────────
CREATE TABLE bookings (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  motorcycle_id    uuid        REFERENCES motorcycles(id) ON DELETE SET NULL,
  customer_name    text        NOT NULL,
  customer_email   text,
  customer_phone   text        NOT NULL,
  rental_type      text        NOT NULL
                                 CHECK (rental_type IN ('daily', 'weekly', 'monthly')),
  start_date       date        NOT NULL,
  end_date         date        NOT NULL,
  total_price      integer,
  status           text        NOT NULL DEFAULT 'pending'
                                 CHECK (status IN ('pending','confirmed','active','completed','cancelled')),
  delivery_address text,
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT bookings_dates_check CHECK (end_date >= start_date)
);

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX bookings_status_idx    ON bookings(status);
CREATE INDEX bookings_dates_idx     ON bookings(start_date, end_date);
CREATE INDEX bookings_motorcycle_idx ON bookings(motorcycle_id);


-- ────────────────────────────────────────────────
-- content_hero  (single-row table; upserted by fixed id)
-- ────────────────────────────────────────────────
CREATE TABLE content_hero (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  heading    text[]      NOT NULL DEFAULT ARRAY['Exciting', 'Ride in', 'Bali.'],
  subtext    text        NOT NULL DEFAULT 'Motorbikes and scooters delivered to your door. Daily, weekly, and monthly rental — clean bikes, fair prices, no stress.',
  stats      jsonb       NOT NULL DEFAULT '[
    {"num": "500+", "label": "Happy riders"},
    {"num": "7",    "label": "Areas covered"},
    {"num": "3hr",  "label": "Delivery time"},
    {"num": "24/7", "label": "WhatsApp support"}
  ]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER content_hero_updated_at
  BEFORE UPDATE ON content_hero
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ────────────────────────────────────────────────
-- content_testimonials
-- ────────────────────────────────────────────────
CREATE TABLE content_testimonials (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  location     text,
  rating       integer     NOT NULL DEFAULT 5
                             CHECK (rating BETWEEN 1 AND 5),
  body         text        NOT NULL,
  is_published boolean     NOT NULL DEFAULT true,
  sort_order   integer     NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX content_testimonials_published_idx
  ON content_testimonials(is_published, sort_order);


-- ────────────────────────────────────────────────
-- content_faq
-- ────────────────────────────────────────────────
CREATE TABLE content_faq (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  question     text        NOT NULL,
  answer       text        NOT NULL,
  is_published boolean     NOT NULL DEFAULT true,
  sort_order   integer     NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX content_faq_published_idx
  ON content_faq(is_published, sort_order);


-- ────────────────────────────────────────────────
-- content_gallery
-- ────────────────────────────────────────────────
CREATE TABLE content_gallery (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text        NOT NULL,
  url          text        NOT NULL,
  alt_text     text,
  sort_order   integer     NOT NULL DEFAULT 0,
  is_published boolean     NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX content_gallery_published_idx
  ON content_gallery(is_published, sort_order);
