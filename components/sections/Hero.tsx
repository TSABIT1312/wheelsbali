"use client";

import { motion } from "framer-motion";
import type { ContentHero, HeroStat } from "@/lib/types/database";

const WA_URL = "https://wa.me/6281387070350";

const DEFAULT_HEADING = ["Exciting", "Ride in", "Bali."];
const DEFAULT_SUBTEXT =
  "Motorbikes and scooters delivered to your door. Daily, weekly, and monthly rental — clean bikes, fair prices, no stress.";
const DEFAULT_STATS: HeroStat[] = [
  { num: "500+", label: "Happy riders" },
  { num: "7", label: "Areas covered" },
  { num: "3hr", label: "Delivery time" },
  { num: "24/7", label: "WhatsApp support" },
];

export default function Hero({ data }: { data?: ContentHero | null }) {
  const heading =
    data?.heading && data.heading.length > 0 ? data.heading : DEFAULT_HEADING;
  const subtext = data?.subtext || DEFAULT_SUBTEXT;
  const stats: HeroStat[] =
    Array.isArray(data?.stats) && (data.stats as unknown[]).length > 0
      ? (data.stats as unknown as HeroStat[])
      : DEFAULT_STATS;

  return (
    <section
      id="home"
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 6vw 72px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E0E0E0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Eyebrow tag — top right */}
      <div
        className="hero-tag-wrap"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <span
          className="hero-tag type-badge"
          style={{ color: "#777777", whiteSpace: "nowrap" }}
        >
          Bali&apos;s trusted motorbike rental
        </span>
      </div>

      {/* Main content */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: "var(--ff-brand)",
            fontSize: "clamp(44px, 11vw, 136px)",
            fontWeight: 700,
            lineHeight: 0.93,
            letterSpacing: "-0.06em",
            color: "#0A0A0A",
            transform: "skewX(-45deg)",
            textShadow: "1px 0 0 #0A0A0A, 0.5px 0.5px 0 rgba(10,10,10,0.4)",
            marginBottom: 40,
          }}
        >
          {heading.map((line, i) => (
            <span key={i}>
              {line}
              {i < heading.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <p
            className="type-body"
            style={{ color: "#333333", maxWidth: 420 }}
          >
            {subtext}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="type-btn"
              style={{
                background: "#0A0A0A",
                color: "#FFFFFF",
                padding: "14px 32px",
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.75")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              WhatsApp to Book
            </a>
            <a
              href="#fleet"
              className="type-btn"
              style={{
                background: "transparent",
                color: "#0A0A0A",
                padding: "13px 32px",
                textDecoration: "none",
                border: "1px solid #0A0A0A",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
              }}
            >
              See Our Fleet
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: "flex",
            gap: 48,
            marginTop: 56,
            paddingTop: 40,
            borderTop: "1px solid #E0E0E0",
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="type-stat">{stat.num}</div>
              <div
                className="type-badge"
                style={{ color: "#777777", marginTop: 6 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
