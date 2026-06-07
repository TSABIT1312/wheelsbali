"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const WA_NUMBER = "6281387070350";
const WA_URL = `https://wa.me/${WA_NUMBER}`;

const navLinks = [
  { label: "Fleet", href: "#fleet" },
  { label: "Pricing", href: "#pricing" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.97)",
        borderBottom: scrolled ? "1px solid #E0E0E0" : "1px solid transparent",
        padding: "0 6vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
        transition: "border-color 0.2s",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: "#0A0A0A",
        }}
      >
        <Image
          src="/logo-wheelbali.png"
          alt="Wheels Bali"
          width={140}
          height={48}
          style={{ objectFit: "contain" }}
          priority
        />
      </Link>

      {/* Desktop Nav */}
      <ul
        className="hidden md:flex"
        style={{ gap: 32, listStyle: "none", alignItems: "center" }}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#777777",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#0A0A0A")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#777777")
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* WhatsApp CTA */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-block"
        style={{
          background: "#0A0A0A",
          color: "#FFFFFF",
          padding: "10px 22px",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "opacity 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
      >
        WhatsApp Us
      </a>

      {/* Hamburger */}
      <button
        className="flex md:hidden"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          flexDirection: "column",
          gap: 0,
        }}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: "#0A0A0A",
              margin: "5px 0",
              transition: "transform 0.2s, opacity 0.2s",
              transform:
                menuOpen
                  ? i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "scaleX(0)"
                  : "none",
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "#FFFFFF",
            borderBottom: "1px solid #E0E0E0",
            padding: "24px 6vw 32px",
            zIndex: 99,
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 0 }}>
            {navLinks.map((link) => (
              <li key={link.href} style={{ borderBottom: "1px solid #E0E0E0" }}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "16px 0",
                    fontSize: 14,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#0A0A0A",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              marginTop: 24,
              background: "#0A0A0A",
              color: "#FFFFFF",
              padding: "14px",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}
