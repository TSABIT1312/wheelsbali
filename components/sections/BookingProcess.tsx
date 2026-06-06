"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Send us a message",
    desc: "WhatsApp us or fill the inquiry form. Tell us which bike, your dates, and your location in Bali.",
  },
  {
    num: "02",
    title: "We confirm availability",
    desc: "We check and send you rental details and price. Quick reply guaranteed.",
  },
  {
    num: "03",
    title: "Bike delivered to you",
    desc: "We bring the bike to your villa, hotel, or wherever you're staying. No need to come to us.",
  },
  {
    num: "04",
    title: "Ride & enjoy Bali",
    desc: "You're set. Message us anytime for help. We collect the bike when you're done.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BookingProcess() {
  return (
    <section
      style={{
        padding: "88px 6vw",
        background: "#FFFFFF",
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
        Booking process
      </div>

      <h2
        style={{
          fontFamily: "var(--font-barlow-condensed), sans-serif",
          fontSize: "clamp(36px, 5vw, 60px)",
          fontWeight: 700,
          fontStyle: "italic",
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          marginBottom: 0,
          color: "#0A0A0A",
        }}
      >
        How it works.
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 48,
          marginTop: 56,
        }}
      >
        {steps.map((step) => (
          <motion.div key={step.num} variants={itemVariants}>
            <div
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontSize: 72,
                fontWeight: 800,
                fontStyle: "italic",
                lineHeight: 1,
                color: "#E0E0E0",
                marginBottom: 16,
                letterSpacing: "-0.03em",
              }}
            >
              {step.num}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "#0A0A0A" }}>
              {step.title}
            </h3>
            <p style={{ fontSize: 14, color: "#777777", lineHeight: 1.65, fontWeight: 300 }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
