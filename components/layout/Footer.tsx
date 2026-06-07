"use client";

import Link from "next/link";

const navLinks = [
  { label: "Our Fleet", href: "#fleet" },
  { label: "Pricing", href: "#pricing" },
  { label: "Delivery Areas", href: "#areas" },
  { label: "Requirements", href: "#requirements" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const contactLinks = [
  { label: "WhatsApp: +62 812-3456-7890", href: "https://wa.me/628123456789" },
  { label: "Inquiry Form", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        color: "rgba(255,255,255,0.5)",
        padding: "56px 6vw 28px",
        fontFamily: "var(--font-barlow), sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
          marginBottom: 48,
          alignItems: "flex-start",
        }}
      >
        {/* Logo & Tagline */}
        <div>
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 800,
              fontStyle: "italic",
              fontSize: 20,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              display: "block",
              marginBottom: 12,
            }}
          >
            WHEELS BALI
          </span>
          <p style={{ fontSize: 13, maxWidth: 200, lineHeight: 1.6, fontWeight: 300 }}>
            Your trusted motorbike and scooter rental in Bali. Delivering freedom, one ride at a time.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              marginBottom: 14,
              fontWeight: 500,
            }}
          >
            Navigation
          </h4>
          <ul style={{ listStyle: "none" }}>
            {navLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: 9 }}>
                <a
                  href={link.href}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.9)",
              marginBottom: 14,
              fontWeight: 500,
            }}
          >
            Contact
          </h4>
          <ul style={{ listStyle: "none" }}>
            {contactLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: 9 }}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://maps.google.com/?q=Jl.+Gunung+Lumut+No.188D,+Padangsambian+Klod,+Denpasar+Barat,+Bali+80117"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: 220,
              marginTop: 4,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")
            }
          >
            Jl. Gunung Lumut No.188D,<br />
            Padangsambian Klod,<br />
            Kec. Denpasar Bar.,<br />
            Kota Denpasar, Bali 80117
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} Wheels Bali. All rights reserved.</span>
        <span style={{ fontSize: 12 }}>Denpasar, Bali, Indonesia</span>
      </div>
    </footer>
  );
}
