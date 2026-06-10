"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    num: "01",
    title: "Well-maintained bikes",
    desc: "Every bike is regularly serviced. You get a bike that starts first time, every time.",
  },
  {
    num: "02",
    title: "Delivery & pickup depends on location",
    desc: "We bring the bike to you and collect it when you're done. Delivery fee depends on your location.",
  },
  {
    num: "03",
    title: "Real WhatsApp support",
    desc: "Got a flat tyre at midnight? Message us. We're here throughout your rental.",
  },
  {
    num: "04",
    title: "Transparent pricing",
    desc: "What we quote is what you pay. The longer you rent, the more you save.",
  },
  {
    num: "05",
    title: "Quick booking",
    desc: "WhatsApp us or fill the form. Most bookings confirmed in under 30 minutes.",
  },
  {
    num: "06",
    title: "All Bali areas",
    desc: "Canggu, Uluwatu, Seminyak, Ubud, Denpasar, Sanur — if you're in Bali, we reach you.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "88px 6vw",
        background: "#F5F5F5",
      }}
    >
      <div className="type-eyebrow" style={{ marginBottom: 20 }}>
        Why choose us
      </div>

      <h2 className="type-section" style={{ marginBottom: 20 }}>
        Simple. Reliable. Delivered to you.
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 1,
          background: "#E0E0E0",
          border: "1px solid #E0E0E0",
          marginTop: 56,
        }}
      >
        {reasons.map((item) => (
          <motion.div
            key={item.num}
            variants={itemVariants}
            style={{
              background: "#F5F5F5",
              padding: "36px 28px",
            }}
          >
            <div
              className="type-badge"
              style={{ color: "#AAAAAA", marginBottom: 20 }}
            >
              {item.num}
            </div>
            <h3
              className="type-sub"
              style={{ fontSize: 17, marginBottom: 10 }}
            >
              {item.title}
            </h3>
            <p className="type-small" style={{ color: "#777777" }}>
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
