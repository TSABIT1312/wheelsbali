"use client";

import { motion } from "framer-motion";
import type { Merchandise } from "@/lib/types/database";

const WA_NUMBER = "6281387070350";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function MerchandiseSection({
  products,
}: {
  products: Merchandise[];
}) {
  if (products.length === 0) return null;

  return (
    <section
      id="merchandise"
      style={{
        padding: "88px 6vw",
        background: "#F5F5F5",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
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
          <span
            style={{
              display: "block",
              width: 32,
              height: 1,
              background: "#777777",
            }}
          />
          Wheels Bali Gear
        </div>
        <h2
          style={{
            fontFamily: "var(--font-barlow-condensed), sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: "#0A0A0A",
          }}
        >
          Ride the brand.
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "#777777",
            fontWeight: 300,
            marginTop: 12,
            maxWidth: 480,
          }}
        >
          Wheels Bali branded gear — take a piece of the island home.
        </p>
      </div>

      {/* Product grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 1,
          background: "#E0E0E0",
          border: "1px solid #E0E0E0",
        }}
      >
        {products.map((item) => {
          const waText = `Hi Wheels Bali! I'd like to order: ${item.name} (Rp ${item.price.toLocaleString("id-ID")})`;
          const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;

          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              style={{
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: "#EBEBEB",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image_url}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {item.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 8px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div
                style={{
                  padding: "20px 20px 24px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "#0A0A0A",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    marginBottom: 6,
                  }}
                >
                  {item.name}
                </div>
                {item.description && (
                  <p
                    style={{
                      fontSize: 13,
                      color: "#777777",
                      fontWeight: 300,
                      lineHeight: 1.5,
                      marginBottom: 12,
                      flex: 1,
                    }}
                  >
                    {item.description}
                  </p>
                )}
                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-barlow-condensed), sans-serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#0A0A0A",
                      marginBottom: 14,
                    }}
                  >
                    Rp {item.price.toLocaleString("id-ID")}
                  </div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "11px 20px",
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
