import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wheelsbali.com";
const SITE_DESCRIPTION =
  "Bali's trusted motorbike rental. Scooters and adventure bikes delivered to your door. Daily, weekly, and monthly rental — clean bikes, fair prices, no stress.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wheels Bali — Motorbike & Scooter Rental | Daily, Weekly, Monthly",
    template: "%s | Wheels Bali",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Bali motorbike rental",
    "Bali scooter rental",
    "motorbike delivery Bali",
    "Canggu scooter hire",
    "Ubud motorbike",
    "Wheels Bali",
  ],
  openGraph: {
    title: "Wheels Bali — Motorbike & Scooter Rental",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: "Wheels Bali",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wheels Bali — Motorbike & Scooter Rental",
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
