-- ============================================================
-- 0002_rls.sql
-- Row Level Security policies for all tables
-- ============================================================

-- ────────────────────────────────────────────────
-- Enable RLS on every table
-- ────────────────────────────────────────────────
ALTER TABLE motorcycles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_images    ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings             ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_hero         ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_faq          ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_gallery      ENABLE ROW LEVEL SECURITY;


-- ────────────────────────────────────────────────
-- motorcycles
-- Public can read all rows.
-- Authenticated admin can write.
-- ────────────────────────────────────────────────
CREATE POLICY "motorcycles_select_public"
  ON motorcycles FOR SELECT
  USING (true);

CREATE POLICY "motorcycles_insert_admin"
  ON motorcycles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "motorcycles_update_admin"
  ON motorcycles FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "motorcycles_delete_admin"
  ON motorcycles FOR DELETE
  USING (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────
-- motorcycle_images
-- Same access pattern as motorcycles.
-- ────────────────────────────────────────────────
CREATE POLICY "motorcycle_images_select_public"
  ON motorcycle_images FOR SELECT
  USING (true);

CREATE POLICY "motorcycle_images_insert_admin"
  ON motorcycle_images FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "motorcycle_images_update_admin"
  ON motorcycle_images FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "motorcycle_images_delete_admin"
  ON motorcycle_images FOR DELETE
  USING (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────
-- bookings
-- Anon can INSERT (future public booking form).
-- Only authenticated admin can SELECT / UPDATE / DELETE.
-- ────────────────────────────────────────────────
CREATE POLICY "bookings_insert_anon"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "bookings_select_admin"
  ON bookings FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "bookings_update_admin"
  ON bookings FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "bookings_delete_admin"
  ON bookings FOR DELETE
  USING (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────
-- content_hero
-- Public can read. Authenticated admin can write.
-- ────────────────────────────────────────────────
CREATE POLICY "content_hero_select_public"
  ON content_hero FOR SELECT
  USING (true);

CREATE POLICY "content_hero_insert_admin"
  ON content_hero FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "content_hero_update_admin"
  ON content_hero FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_hero_delete_admin"
  ON content_hero FOR DELETE
  USING (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────
-- content_testimonials
-- Public sees only published rows.
-- Admin sees all rows (OR logic: second policy overrides for authenticated).
-- ────────────────────────────────────────────────
CREATE POLICY "content_testimonials_select_public"
  ON content_testimonials FOR SELECT
  USING (is_published = true);

CREATE POLICY "content_testimonials_select_admin"
  ON content_testimonials FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_testimonials_insert_admin"
  ON content_testimonials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "content_testimonials_update_admin"
  ON content_testimonials FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_testimonials_delete_admin"
  ON content_testimonials FOR DELETE
  USING (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────
-- content_faq
-- Same pattern as testimonials.
-- ────────────────────────────────────────────────
CREATE POLICY "content_faq_select_public"
  ON content_faq FOR SELECT
  USING (is_published = true);

CREATE POLICY "content_faq_select_admin"
  ON content_faq FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_faq_insert_admin"
  ON content_faq FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "content_faq_update_admin"
  ON content_faq FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_faq_delete_admin"
  ON content_faq FOR DELETE
  USING (auth.role() = 'authenticated');


-- ────────────────────────────────────────────────
-- content_gallery
-- Same pattern as testimonials.
-- ────────────────────────────────────────────────
CREATE POLICY "content_gallery_select_public"
  ON content_gallery FOR SELECT
  USING (is_published = true);

CREATE POLICY "content_gallery_select_admin"
  ON content_gallery FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_gallery_insert_admin"
  ON content_gallery FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "content_gallery_update_admin"
  ON content_gallery FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "content_gallery_delete_admin"
  ON content_gallery FOR DELETE
  USING (auth.role() = 'authenticated');
