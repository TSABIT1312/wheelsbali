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
      }}
    >
      <div className="type-eyebrow" style={{ marginBottom: 20 }}>
        Booking process
      </div>

      <h2 className="type-section" style={{ marginBottom: 0 }}>
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
            <div className="type-step-num" style={{ marginBottom: 20 }}>
              {step.num}
            </div>
            <h3 className="type-sub" style={{ fontSize: 16, marginBottom: 10 }}>
              {step.title}
            </h3>
            <p className="type-small" style={{ color: "#777777" }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
