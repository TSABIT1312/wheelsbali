"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { MotorcycleWithImages } from "@/lib/types/database";

const WA_NUMBER = "6281387070350";

const CATEGORY_EMOJI: Record<string, string> = {
  automatic: "🛵",
  large_scooter: "🏍️",
  trail: "🏍️",
};

function formatIDR(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${m % 1 === 0 ? m : m.toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}K`;
  }
  return amount.toString();
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function Fleet({
  motorcycles,
}: {
  motorcycles: MotorcycleWithImages[];
}) {
  return (
    <section
      id="fleet"
      style={{
        padding: "88px 6vw",
        background: "#FFFFFF",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
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
              style={{ display: "block", width: 32, height: 1, background: "#777777" }}
            />
            Our bikes
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
            Choose your ride.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#333333",
              fontWeight: 300,
              maxWidth: 480,
              lineHeight: 1.75,
            }}
          >
            From lightweight automatics to adventure bikes — we have the right
            bike for every rider.
          </p>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1,
          background: "#E0E0E0",
          border: "1px solid #E0E0E0",
        }}
      >
        {motorcycles.map((moto) => {
          const primaryImage =
            moto.motorcycle_images.find((img) => img.is_primary) ??
            moto.motorcycle_images[0] ??
            null;
          const emoji = CATEGORY_EMOJI[moto.category] ?? "🏍️";
          const waMsg =
            moto.wa_message ||
            `Hi, I'm interested in renting the ${moto.name}. Can you share availability and pricing?`;
          const subtitle = [moto.models, moto.engine_cc]
            .filter(Boolean)
            .join(" · ");

          return (
            <motion.div
              key={moto.id}
              variants={itemVariants}
              style={{ background: "#FFFFFF" }}
            >
              {/* Visual */}
              <div
                style={{
                  height: 220,
                  background: "#F5F5F5",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={moto.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 72,
                    }}
                  >
                    {emoji}
                  </div>
                )}
                {moto.tag && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      padding: "5px 10px",
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  >
                    {moto.tag}
                  </span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: 24 }}>
                <h3
                  style={{
                    fontFamily: "var(--font-barlow-condensed), sans-serif",
                    fontSize: 26,
                    fontWeight: 700,
                    fontStyle: "italic",
                    marginBottom: 4,
                    letterSpacing: "-0.01em",
                    color: "#0A0A0A",
                  }}
                >
                  {moto.name}
                </h3>
                {subtitle && (
                  <p
                    style={{
                      fontSize: 13,
                      color: "#777777",
                      marginBottom: 20,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Price grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 1,
                    background: "#E0E0E0",
                    border: "1px solid #E0E0E0",
                    marginBottom: 20,
                  }}
                >
                  {[
                    { amt: formatIDR(moto.price_day), per: "day" },
                    { amt: formatIDR(moto.price_week), per: "week" },
                    { amt: formatIDR(moto.price_month), per: "month" },
                  ].map((p) => (
                    <div
                      key={p.per}
                      style={{
                        background: "#FFFFFF",
                        padding: 12,
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-barlow-condensed), sans-serif",
                          fontSize: 20,
                          fontWeight: 700,
                          display: "block",
                          color: "#0A0A0A",
                        }}
                      >
                        {p.amt}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#777777",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.per}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div style={{ display: "flex", gap: 8 }}>
                  <Link
                    href={`/bikes/${moto.id}`}
                    style={{
                      flex: 1,
                      display: "block",
                      textAlign: "center",
                      padding: "10px 12px",
                      background: "transparent",
                      color: "#0A0A0A",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      textDecoration: "none",
                      border: "1px solid #0A0A0A",
                      transition: "all 0.2s",
                      fontFamily: "var(--font-barlow), sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "#0A0A0A";
                      (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
                    }}
                  >
                    View details
                  </Link>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: "block",
                      textAlign: "center",
                      padding: "10px 12px",
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                      fontFamily: "var(--font-barlow), sans-serif",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.opacity = "0.7")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.opacity = "1")
                    }
                  >
                    Book via WA
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <p
        style={{
          marginTop: 20,
          fontSize: 13,
          color: "#777777",
          fontWeight: 300,
        }}
      >
        * Prices in IDR. All rentals include 1 helmet. WhatsApp us for exact
        current pricing and availability.
      </p>
    </section>
  );
}
