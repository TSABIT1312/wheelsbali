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

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>("daily");

  const rows =
    activeTab === "daily" ? dailyRows : activeTab === "weekly" ? weeklyRows : monthlyRows;

  return (
    <section
      id="pricing"
      style={{
        padding: "88px 6vw",
        background: "#F5F5F5",
      }}
    >
      {/* Header */}
      <div className="type-eyebrow" style={{ marginBottom: 20 }}>
        Rental plans
      </div>

      <h2 className="type-section" style={{ marginBottom: 12 }}>
        Simple, honest pricing.
      </h2>
      <p
        className="type-body"
        style={{ color: "#333333", maxWidth: 500, marginBottom: 40 }}
      >
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
            className="type-btn-sm"
            style={{
              padding: "11px 28px",
              border: "none",
              borderRight: i < tabs.length - 1 ? "1px solid #E0E0E0" : "none",
              background: activeTab === tab.id ? "#0A0A0A" : "transparent",
              color: activeTab === tab.id ? "#FFFFFF" : "#777777",
              cursor: "pointer",
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
                  <th
                    className="type-th"
                    style={{
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      padding: "14px 20px",
                      textAlign: "left",
                    }}
                  >
                    Bike Type
                  </th>
                  <th
                    className="type-th"
                    style={{
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      padding: "14px 20px",
                      textAlign: "left",
                    }}
                  >
                    {activeTab === "daily" ? "Daily Rate" : activeTab === "weekly" ? "Weekly Rate" : "Monthly Rate"}
                  </th>
                  <th
                    className="type-th"
                    style={{
                      background: "#0A0A0A",
                      color: "#FFFFFF",
                      padding: "14px 20px",
                      textAlign: "left",
                    }}
                  >
                    {activeTab === "daily" ? "Includes" : "Saving vs Daily"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
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
                    <td
                      className="type-small"
                      style={{
                        padding: "14px 20px",
                        borderBottom: i === rows.length - 1 ? "none" : "1px solid #E0E0E0",
                        color: "#0A0A0A",
                      }}
                    >
                      {row.bike}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        borderBottom: i === rows.length - 1 ? "none" : "1px solid #E0E0E0",
                      }}
                    >
                      <span className="type-price-table">{row.rate}</span>
                    </td>
                    <td
                      className="type-small"
                      style={{
                        padding: "14px 20px",
                        borderBottom: i === rows.length - 1 ? "none" : "1px solid #E0E0E0",
                        color: "#0A0A0A",
                      }}
                    >
                      {"saving" in row ? (
                        <span
                          className="type-badge"
                          style={{
                            border: "1px solid #0A0A0A",
                            padding: "3px 8px",
                          }}
                        >
                          {row.saving}
                        </span>
                      ) : (
                        row.includes
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>

      <p
        className="type-small"
        style={{ marginTop: 24, color: "#777777" }}
      >
        Free delivery within 10km. Small fee for longer distances — ask us for details.
      </p>
    </section>
  );
}
