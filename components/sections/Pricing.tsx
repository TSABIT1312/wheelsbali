"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "daily" | "weekly" | "monthly";

const tabs: { id: Tab; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

const dailyRows = [
  { bike: "Automatic Scooter (110–125cc)", rate: "IDR 80,000", includes: "1 helmet, delivery available" },
  { bike: "Large Scooter (150–155cc)", rate: "IDR 100,000", includes: "1 helmet, delivery available" },
  { bike: "Trail / Adventure (150cc+)", rate: "IDR 150,000", includes: "1 helmet, delivery available" },
  { bike: "Extra helmet", rate: "IDR 15,000", includes: "Per day add-on" },
];

const weeklyRows = [
  { bike: "Automatic Scooter (110–125cc)", rate: "IDR 450,000", saving: "Save 20%" },
  { bike: "Large Scooter (150–155cc)", rate: "IDR 600,000", saving: "Save 14%" },
  { bike: "Trail / Adventure (150cc+)", rate: "IDR 900,000", saving: "Save 14%" },
];

const monthlyRows = [
  { bike: "Automatic Scooter (110–125cc)", rate: "IDR 1,200,000", saving: "Save 50%" },
  { bike: "Large Scooter (150–155cc)", rate: "IDR 1,500,000", saving: "Save 50%" },
  { bike: "Trail / Adventure (150cc+)", rate: "IDR 2,200,000", saving: "Save 51%" },
];

const thStyle: React.CSSProperties = {
  background: "#0A0A0A",
  color: "#FFFFFF",
  padding: "14px 20px",
  textAlign: "left",
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 500,
};

const tdStyle: React.CSSProperties = {
  padding: "14px 20px",
  borderBottom: "1px solid #E0E0E0",
  fontSize: 14,
  color: "#0A0A0A",
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>("daily");

  return (
    <section
      id="pricing"
      style={{
        padding: "88px 6vw",
        background: "#F5F5F5",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      {/* Header */}
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
        Rental plans
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
        Simple, honest pricing.
      </h2>
      <p style={{ fontSize: 16, color: "#333333", fontWeight: 300, maxWidth: 500, lineHeight: 1.75, marginBottom: 40 }}>
        The longer you rent, the more you save. Monthly is our best value for long-stay visitors and digital nomads.
      </p>

      {/* Tabs */}
      <div
        style={{
          display: "inline-flex",
          border: "1px solid #E0E0E0",
          marginBottom: 40,
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "11px 28px",
              border: "none",
              borderRight: i < tabs.length - 1 ? "1px solid #E0E0E0" : "none",
              background: activeTab === tab.id ? "#0A0A0A" : "transparent",
              color: activeTab === tab.id ? "#FFFFFF" : "#777777",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-barlow), sans-serif",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #E0E0E0",
                background: "#FFFFFF",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>Bike Type</th>
                  <th style={thStyle}>
                    {activeTab === "daily" ? "Daily Rate" : activeTab === "weekly" ? "Weekly Rate" : "Monthly Rate"}
                  </th>
                  <th style={thStyle}>
                    {activeTab === "daily" ? "Includes" : "Saving vs Daily"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === "daily" ? dailyRows : activeTab === "weekly" ? weeklyRows : monthlyRows).map(
                  (row, i) => (
                    <tr
                      key={i}
                      style={{ transition: "background 0.15s" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "#F5F5F5")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "transparent")
                      }
                    >
                      <td style={{ ...tdStyle, borderBottom: i === (activeTab === "daily" ? dailyRows : activeTab === "weekly" ? weeklyRows : monthlyRows).length - 1 ? "none" : "1px solid #E0E0E0" }}>
                        {row.bike}
                      </td>
                      <td
                        style={{
                          ...tdStyle,
                          borderBottom: i === (activeTab === "daily" ? dailyRows : activeTab === "weekly" ? weeklyRows : monthlyRows).length - 1 ? "none" : "1px solid #E0E0E0",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-barlow-condensed), sans-serif",
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#0A0A0A",
                          }}
                        >
                          {row.rate}
                        </span>
                      </td>
                      <td
                        style={{
                          ...tdStyle,
                          borderBottom: i === (activeTab === "daily" ? dailyRows : activeTab === "weekly" ? weeklyRows : monthlyRows).length - 1 ? "none" : "1px solid #E0E0E0",
                        }}
                      >
                        {"saving" in row ? (
                          <span
                            style={{
                              fontSize: 10,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              border: "1px solid #0A0A0A",
                              padding: "2px 7px",
                              fontWeight: 600,
                            }}
                          >
                            {row.saving}
                          </span>
                        ) : (
                          row.includes
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>

      <p style={{ marginTop: 24, fontSize: 14, color: "#777777", fontWeight: 300 }}>
        Free delivery within 10km. Small fee for longer distances — ask us for details.
      </p>
    </section>
  );
}
