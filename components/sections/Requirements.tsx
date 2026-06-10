"use client";

import { motion } from "framer-motion";

const docsNeeded = [
  "Valid passport or national ID",
  "International Driving Permit (IDP) or Indonesian SIM",
  "Your WhatsApp number",
  "Delivery address in Bali",
];

const whatWeProvide = [
  "1 helmet included with every rental",
  "Bike in good working condition",
  "Full fuel tank at delivery",
  "WhatsApp support throughout",
  "Free collection at end of rental",
];

export default function Requirements() {
  return (
    <section
      id="requirements"
      style={{
        padding: "88px 6vw",
        background: "#FFFFFF",
      }}
    >
      <div className="type-eyebrow" style={{ marginBottom: 20 }}>
        What you need
      </div>

      <h2 className="type-section" style={{ marginBottom: 0 }}>
        Rental requirements.
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          background: "#E0E0E0",
          border: "1px solid #E0E0E0",
          marginTop: 56,
        }}
        className="req-grid"
      >
        {/* Documents Needed */}
        <div style={{ background: "#FFFFFF", padding: "40px 36px" }}>
          <span className="type-list-heading">Documents needed</span>
          <ul style={{ listStyle: "none" }}>
            {docsNeeded.map((item, i) => (
              <li
                key={i}
                className="type-body"
                style={{
                  padding: "12px 0",
                  borderBottom: i < docsNeeded.length - 1 ? "1px solid #E0E0E0" : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  color: "#0A0A0A",
                }}
              >
                <span style={{ fontWeight: 600, flexShrink: 0 }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What We Provide */}
        <div style={{ background: "#FFFFFF", padding: "40px 36px" }}>
          <span className="type-list-heading">What we provide</span>
          <ul style={{ listStyle: "none" }}>
            {whatWeProvide.map((item, i) => (
              <li
                key={i}
                className="type-body"
                style={{
                  padding: "12px 0",
                  borderBottom: i < whatWeProvide.length - 1 ? "1px solid #E0E0E0" : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  color: "#0A0A0A",
                }}
              >
                <span style={{ fontWeight: 600, flexShrink: 0 }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Licence notice */}
      <div
        style={{
          marginTop: 24,
          padding: "20px 24px",
          border: "1px solid #0A0A0A",
          maxWidth: 680,
        }}
      >
        <strong
          className="type-small"
          style={{ fontWeight: 600, display: "block", marginBottom: 6 }}
        >
          Licence requirement
        </strong>
        <p className="type-small" style={{ color: "#333333" }}>
          Riding in Bali requires a valid licence. An International Driving Permit (IDP) is the safest option.
          If you&apos;re unsure, message us on WhatsApp and we&apos;ll help you figure it out before you book.
        </p>
      </div>
    </section>
  );
}
