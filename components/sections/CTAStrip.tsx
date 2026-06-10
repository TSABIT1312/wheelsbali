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
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div
          className="type-eyebrow"
          style={{ color: "rgba(255,255,255,0.4)", marginBottom: 16 }}
        >
          Ready to explore
        </div>
        <h2
          className="type-section"
          style={{ color: "#FFFFFF", marginBottom: 10 }}
        >
          Ready to explore Bali?
        </h2>
        <p className="type-body" style={{ color: "rgba(255,255,255,0.55)" }}>
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
          className="type-btn"
          style={{
            background: "#FFFFFF",
            color: "#0A0A0A",
            padding: "14px 32px",
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
          className="type-btn"
          style={{
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            padding: "13px 32px",
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
