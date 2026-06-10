"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContentFAQ } from "@/lib/types/database";

const STATIC_FAQS: ContentFAQ[] = [
  {
    id: "1",
    question: "Do you deliver to my hotel or villa?",
    answer:
      "Yes — free delivery within 10km of our main areas. If you're further away, there's a small extra charge. Tell us your location and we'll confirm. Most of Bali is no problem.",
    is_published: true,
    sort_order: 0,
    created_at: "",
  },
  {
    id: "2",
    question: "Do I need an International Driving Permit?",
    answer:
      "An IDP is recommended for riding legally in Bali. You can get one from your home country's automobile association before you travel. If you already have an Indonesian SIM, that works too. Message us if you're unsure.",
    is_published: true,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "3",
    question: "What happens if the bike breaks down?",
    answer:
      "WhatsApp us immediately. We'll either send someone to assist or arrange a replacement bike. We don't leave you stranded.",
    is_published: true,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "4",
    question: "Is there a security deposit?",
    answer:
      "Yes, a small refundable deposit around IDR 300,000–500,000. Returned when you give back the bike in good condition. We'll confirm the exact amount when you book.",
    is_published: true,
    sort_order: 3,
    created_at: "",
  },
  {
    id: "5",
    question: "Can I extend my rental?",
    answer:
      "Absolutely. Just WhatsApp us before your rental ends and we'll extend it — subject to availability. We're flexible.",
    is_published: true,
    sort_order: 4,
    created_at: "",
  },
  {
    id: "6",
    question: "Do you have bikes for beginners?",
    answer:
      "Yes. Our automatic scooters (Honda Beat, Yamaha Mio) are perfect for beginners — easy with no gears. Tell us you're a first-timer and we'll recommend the right bike and give you a quick orientation on delivery.",
    is_published: true,
    sort_order: 5,
    created_at: "",
  },
  {
    id: "7",
    question: "How do I pay?",
    answer:
      "We accept cash (IDR) at delivery. If you'd like to pay upfront via transfer, just ask and we'll arrange it.",
    is_published: true,
    sort_order: 6,
    created_at: "",
  },
  {
    id: "8",
    question: "Can I rent for longer than a month?",
    answer:
      "Yes — we love long-term renters. Digital nomads and expats often rent for 3, 6, or 12 months. Message us and we'll give you the best rate we can.",
    is_published: true,
    sort_order: 7,
    created_at: "",
  },
];

export default function FAQ({ faqs }: { faqs?: ContentFAQ[] }) {
  const items = faqs && faqs.length > 0 ? faqs : STATIC_FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: "88px 6vw",
        background: "#FFFFFF",
      }}
    >
      <div className="type-eyebrow" style={{ marginBottom: 20 }}>
        FAQ
      </div>

      <h2 className="type-section" style={{ marginBottom: 0 }}>
        Common questions.
      </h2>

      <div style={{ maxWidth: 680, marginTop: 56 }}>
        {items.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.id} style={{ borderBottom: "1px solid #E0E0E0" }}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="type-body"
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "20px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  gap: 16,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#777777")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#0A0A0A")
                }
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontSize: 22,
                    flexShrink: 0,
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#0A0A0A",
                    display: "inline-block",
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="type-small"
                      style={{ padding: "0 0 20px", color: "#777777" }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
