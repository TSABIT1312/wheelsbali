"use client";

import { motion } from "framer-motion";

const WA_URL = "https://wa.me/6281387070350";

export default function CTAStrip() {
  return (
    <section
      style={{
        background: "#0A0A0A",
        color: "#FFFFFF",
        padding: "72px 6vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        flexWrap: "wrap",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <h2
          style={{
            fontFamily: "var(--font-barlow-condensed), sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: "#FFFFFF",
          }}
        >
          Ready to explore Bali?
        </h2>
        <p style={{ fontSize: 15, opacity: 0.6, marginTop: 8, fontWeight: 300 }}>
          Most bookings confirmed within 30 minutes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}
      >
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#FFFFFF",
            color: "#0A0A0A",
            padding: "14px 32px",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.8")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          WhatsApp to Book
        </a>
        <a
          href="#contact"
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            padding: "13px 32px",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "inline-block",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
            (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          }}
        >
          Send Inquiry
        </a>
      </motion.div>
    </section>
  );
}
