-- ============================================================
-- 0003_seed.sql
-- Initial data seeded from the static landing page components
-- ============================================================

-- ────────────────────────────────────────────────
-- Hero content (single row, fixed id for safe upserts)
-- ────────────────────────────────────────────────
INSERT INTO content_hero (id, heading, subtext, stats)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  ARRAY['Exciting', 'Ride in', 'Bali.'],
  'Motorbikes and scooters delivered to your door. Daily, weekly, and monthly rental — clean bikes, fair prices, no stress.',
  '[
    {"num": "500+", "label": "Happy riders"},
    {"num": "7",    "label": "Areas covered"},
    {"num": "3hr",  "label": "Delivery time"},
    {"num": "24/7", "label": "WhatsApp support"}
  ]'::jsonb
);


-- ────────────────────────────────────────────────
-- Motorcycles  (sourced from components/sections/Fleet.tsx)
-- Prices are in IDR (full integers, not shorthand)
-- ────────────────────────────────────────────────
INSERT INTO motorcycles
  (name, category, models, engine_cc, tag, price_day, price_week, price_month, sort_order, wa_message)
VALUES
  (
    'Automatic Scooter',
    'automatic',
    'Honda Beat / Yamaha Mio',
    '110–125cc',
    'Most popular',
    80000,
    450000,
    1200000,
    1,
    'Hi, I''m interested in renting the Automatic Scooter (Honda Beat / Yamaha Mio). Can you share availability and pricing?'
  ),
  (
    'Large Scooter',
    'large_scooter',
    'Honda Vario / Yamaha NMAX',
    '150–155cc',
    'Great for touring',
    100000,
    600000,
    1500000,
    2,
    'Hi, I''m interested in renting the Large Scooter (Honda Vario / Yamaha NMAX). Can you share availability and pricing?'
  ),
  (
    'Trail / Adventure',
    'trail',
    'Honda CRF / Kawasaki KLX',
    '150cc+',
    'Off-road ready',
    150000,
    900000,
    2200000,
    3,
    'Hi, I''m interested in renting the Trail / Adventure bike (Honda CRF / Kawasaki KLX). Can you share availability and pricing?'
  );


-- ────────────────────────────────────────────────
-- FAQ items  (sourced from components/sections/FAQ.tsx)
-- ────────────────────────────────────────────────
INSERT INTO content_faq (question, answer, sort_order)
VALUES
  (
    'Do you deliver to my hotel or villa?',
    'Yes — free delivery within 10km of our main areas. If you''re further away, there''s a small extra charge. Tell us your location and we''ll confirm. Most of Bali is no problem.',
    1
  ),
  (
    'Do I need an International Driving Permit?',
    'An IDP is recommended for riding legally in Bali. You can get one from your home country''s automobile association before you travel. If you already have an Indonesian SIM, that works too. Message us if you''re unsure.',
    2
  ),
  (
    'What happens if the bike breaks down?',
    'WhatsApp us immediately. We''ll either send someone to assist or arrange a replacement bike. We don''t leave you stranded.',
    3
  ),
  (
    'Is there a security deposit?',
    'Yes, a small refundable deposit around IDR 300,000–500,000. Returned when you give back the bike in good condition. We''ll confirm the exact amount when you book.',
    4
  ),
  (
    'Can I extend my rental?',
    'Absolutely. Just WhatsApp us before your rental ends and we''ll extend it — subject to availability. We''re flexible.',
    5
  ),
  (
    'Do you have bikes for beginners?',
    'Yes. Our automatic scooters (Honda Beat, Yamaha Mio) are perfect for beginners — easy with no gears. Tell us you''re a first-timer and we''ll recommend the right bike and give you a quick orientation on delivery.',
    6
  ),
  (
    'How do I pay?',
    'We accept cash (IDR) at delivery. If you''d like to pay upfront via transfer, just ask and we''ll arrange it.',
    7
  ),
  (
    'Can I rent for longer than a month?',
    'Yes — we love long-term renters. Digital nomads and expats often rent for 3, 6, or 12 months. Message us and we''ll give you the best rate we can.',
    8
  );
