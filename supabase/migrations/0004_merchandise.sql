-- ============================================================
-- 0004_merchandise.sql
-- New table: merchandise (Wheels Bali branded products on the
-- public homepage). Follows the same RLS pattern as
-- content_testimonials / content_faq / content_gallery:
--   * public can SELECT rows where is_published = true
--   * authenticated admin can SELECT all rows + write
-- Image is stored as a URL string — admin can paste any URL
-- (a Supabase Storage public URL or an external link).
-- Run this in the Supabase SQL Editor.
-- ============================================================

-- ────────────────────────────────────────────────
-- merchandise
-- ────────────────────────────────────────────────
CREATE TABLE merchandise (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  price        integer     NOT NULL CHECK (price > 0),
  image_url    text        NOT NULL,
  description  text,
  badge        text,
  is_published boolean     NOT NULL DEFAULT true,
  sort_order   integer     NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER merchandise_updated_at
  BEFORE UPDATE ON merchandise
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX merchandise_published_idx
  ON merchandise(is_published, sort_order);


-- ────────────────────────────────────────────────
-- RLS — mirrors content_testimonials policy structure
-- ────────────────────────────────────────────────
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchandise_select_public"
  ON merchandise FOR SELECT
  USING (is_published = true);

CREATE POLICY "merchandise_select_admin"
  ON merchandise FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "merchandise_insert_admin"
  ON merchandise FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "merchandise_update_admin"
  ON merchandise FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "merchandise_delete_admin"
  ON merchandise FOR DELETE
  USING (auth.role() = 'authenticated');
