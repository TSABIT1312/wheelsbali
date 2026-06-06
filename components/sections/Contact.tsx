"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const WA_NUMBER = "628123456789";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #E0E0E0",
  background: "#FFFFFF",
  fontFamily: "var(--font-barlow), sans-serif",
  fontSize: 14,
  color: "#0A0A0A",
  outline: "none",
  appearance: "none" as const,
  fontWeight: 300,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: "#777777",
  marginBottom: 7,
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    startDate: "",
    endDate: "",
    bikeType: "",
    location: "",
    rentalType: "",
    helmets: "1 helmet (included)",
    notes: "",
    licenceConfirm: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Wheels Bali! I'd like to make an inquiry.

Name: ${form.name}
WhatsApp: ${form.whatsapp}
Dates: ${form.startDate} to ${form.endDate}
Bike: ${form.bikeType}
Location: ${form.location}
Rental type: ${form.rentalType}
Helmets: ${form.helmets}
${form.notes ? `Notes: ${form.notes}` : ""}`;

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <section
      id="contact"
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
        Get in touch
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
        Book your bike or ask anything.
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.55 }}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
          marginTop: 56,
        }}
        className="contact-grid"
      >
        {/* Left: Info */}
        <div>
          <p style={{ fontSize: 16, color: "#333333", fontWeight: 300, lineHeight: 1.75, marginBottom: 40 }}>
            The fastest way is WhatsApp — we usually reply within 30 minutes. Or fill the form and we&apos;ll get back to you.
          </p>

          <div style={{ border: "1px solid #E0E0E0" }}>
            {[
              {
                icon: "💬",
                title: "WhatsApp (fastest)",
                sub: "+62 812-3456-7890 · Replies in under 30 min",
                href: `https://wa.me/${WA_NUMBER}`,
              },
              {
                icon: "📍",
                title: "Based in Bali, Indonesia",
                sub: "Delivery across all areas of Bali",
                href: undefined,
              },
              {
                icon: "🕐",
                title: "Operating hours",
                sub: "Every day, 8am – 9pm Bali time (WITA)",
                href: undefined,
              },
            ].map((method, i, arr) => {
              const El = method.href ? "a" : "div";
              return (
                <El
                  key={i}
                  {...(method.href
                    ? {
                        href: method.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "18px 20px",
                    borderBottom: i < arr.length - 1 ? "1px solid #E0E0E0" : "none",
                    textDecoration: "none",
                    color: "#0A0A0A",
                    transition: "background 0.15s",
                    cursor: method.href ? "pointer" : "default",
                  }}
                  onMouseEnter={
                    method.href
                      ? (e) => ((e.currentTarget as HTMLElement).style.background = "#F5F5F5")
                      : undefined
                  }
                  onMouseLeave={
                    method.href
                      ? (e) => ((e.currentTarget as HTMLElement).style.background = "transparent")
                      : undefined
                  }
                >
                  <span style={{ fontSize: 18, width: 36, textAlign: "center", flexShrink: 0 }}>
                    {method.icon}
                  </span>
                  <div>
                    <strong style={{ display: "block", fontSize: 14, fontWeight: 500 }}>
                      {method.title}
                    </strong>
                    <span style={{ fontSize: 12, color: "#777777" }}>{method.sub}</span>
                  </div>
                </El>
              );
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ border: "1px solid #E0E0E0" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid #E0E0E0" }}>
            <h3
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontSize: 22,
                fontWeight: 700,
                fontStyle: "italic",
                color: "#0A0A0A",
              }}
            >
              Quick Inquiry Form
            </h3>
            <p style={{ fontSize: 13, color: "#777777", marginTop: 4 }}>
              Fill this in and we&apos;ll WhatsApp you back with availability and pricing.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: 28 }}>
            {/* Name + WhatsApp */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle}>Your name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
                />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp number</label>
                <input
                  type="tel"
                  required
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
                />
              </div>
            </div>

            {/* Dates */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle}>Start date</label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
                />
              </div>
              <div>
                <label style={labelStyle}>End date</label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
                />
              </div>
            </div>

            {/* Bike type */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Bike type</label>
              <select
                required
                value={form.bikeType}
                onChange={(e) => setForm({ ...form, bikeType: e.target.value })}
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
              >
                <option value="">Select a bike type</option>
                <option>Automatic Scooter (best for beginners)</option>
                <option>Large Scooter 150cc (more power)</option>
                <option>Trail / Adventure Bike</option>
                <option>Not sure — help me choose</option>
              </select>
            </div>

            {/* Location */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Delivery location in Bali</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Canggu, Seminyak, Ubud..."
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
              />
            </div>

            {/* Rental type + Helmets */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="form-row">
              <div>
                <label style={labelStyle}>Rental type</label>
                <select
                  required
                  value={form.rentalType}
                  onChange={(e) => setForm({ ...form, rentalType: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
                >
                  <option value="">Select...</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Long-term (2+ months)</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Helmets needed</label>
                <select
                  value={form.helmets}
                  onChange={(e) => setForm({ ...form, helmets: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                  onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
                >
                  <option>1 helmet (included)</option>
                  <option>2 helmets</option>
                  <option>No helmet needed</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Anything else we should know?</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "#0A0A0A")}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "#E0E0E0")}
              />
            </div>

            {/* Checkbox */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 4, marginBottom: 0 }}>
              <input
                type="checkbox"
                required
                checked={form.licenceConfirm}
                onChange={(e) => setForm({ ...form, licenceConfirm: e.target.checked })}
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              <label style={{ fontSize: 12, color: "#777777", fontWeight: 300 }}>
                I confirm I have a valid driving licence / IDP and am legally allowed to ride a motorbike
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: 14,
                background: "#0A0A0A",
                color: "#FFFFFF",
                border: "none",
                fontFamily: "var(--font-barlow), sans-serif",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                transition: "opacity 0.2s",
                marginTop: 16,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "0.75")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = "1")
              }
            >
              Send Inquiry via WhatsApp →
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
