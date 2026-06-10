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
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="type-eyebrow" style={{ marginBottom: 20 }}>
          Wheels Bali Gear
        </div>
        <h2 className="type-section" style={{ marginBottom: 12 }}>
          Ride the brand.
        </h2>
        <p className="type-body" style={{ color: "#777777", maxWidth: 480 }}>
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
                    className="type-badge"
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "#0A0A0A",
                      color: "#FFFFFF",
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
                <h3
                  className="type-sub"
                  style={{ fontSize: 20, marginBottom: 6 }}
                >
                  {item.name}
                </h3>
                {item.description && (
                  <p
                    className="type-small"
                    style={{
                      color: "#777777",
                      marginBottom: 12,
                      flex: 1,
                    }}
                  >
                    {item.description}
                  </p>
                )}
                <div style={{ marginTop: "auto" }}>
                  <div
                    className="type-price"
                    style={{ fontSize: 22, marginBottom: 14 }}
                  >
                    Rp {item.price.toLocaleString("id-ID")}
                  </div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="type-btn-sm"
                    style={{
                      display: "block",
                      textAlign: "center",
                      padding: "11px 20px",
                      background: "#0A0A0A",
                      color: "#FFFFFF",
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
