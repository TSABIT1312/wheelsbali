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
      }}
    >
      <div className="type-eyebrow" style={{ marginBottom: 20 }}>
        Delivery areas
      </div>

      <h2 className="type-section" style={{ marginBottom: 12 }}>
        We cover all of Bali.
      </h2>
      <p className="type-body" style={{ color: "#333333", maxWidth: 500 }}>
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
              className="type-sub"
              style={{ fontSize: 20, marginBottom: 6 }}
            >
              {area.name}
            </h3>
            <p
              className="type-caption"
              style={{ color: "#777777", letterSpacing: "0.02em" }}
            >
              {area.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
