"use client";

import { motion } from "framer-motion";

const areas = [
  { name: "Canggu", sub: "Echo Beach, Berawa, Pererenan" },
  { name: "Uluwatu", sub: "Bingin, Padang, Jimbaran" },
  { name: "Seminyak", sub: "Kuta, Legian, Double Six" },
  { name: "Ubud", sub: "Central Ubud, Tegalalang" },
  { name: "Denpasar", sub: "City centre & surrounds" },
  { name: "Sanur", sub: "Beach strip & nearby areas" },
  { name: "Everywhere else", sub: "Nusa Dua, Gianyar & more" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function DeliveryAreas() {
  return (
    <section
      id="areas"
      style={{
        padding: "88px 6vw",
        background: "#F5F5F5",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#777777",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ display: "block", width: 32, height: 1, background: "#777777" }} />
        Delivery areas
      </div>

      <h2
        style={{
          fontFamily: "var(--font-barlow-condensed), sans-serif",
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 700,
          fontStyle: "italic",
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          marginBottom: 12,
          color: "#0A0A0A",
        }}
      >
        We cover all of Bali.
      </h2>
      <p style={{ fontSize: 16, color: "#333333", fontWeight: 300, maxWidth: 500, lineHeight: 1.75 }}>
        Not sure if we cover your area? Just ask — we almost certainly do.
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 1,
          background: "#E0E0E0",
          border: "1px solid #E0E0E0",
          marginTop: 56,
        }}
      >
        {areas.map((area) => (
          <motion.div
            key={area.name}
            variants={itemVariants}
            style={{ background: "#F5F5F5", padding: "28px 20px" }}
          >
            <h3
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontSize: 22,
                fontWeight: 700,
                fontStyle: "italic",
                marginBottom: 4,
                color: "#0A0A0A",
              }}
            >
              {area.name}
            </h3>
            <p style={{ fontSize: 12, color: "#777777", letterSpacing: "0.02em" }}>
              {area.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
