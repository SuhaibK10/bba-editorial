import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import DesktopGate from "@/components/layout/DesktopGate";
import { site } from "@/data/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "India's trusted manufacturer of acrylic display solutions. Literature holders, POP displays, charging stations, blow-moulded signages and more. Serving 13+ industries for 35 years.",
  keywords: [
    "acrylic display manufacturer India",
    "POP displays",
    "literature holders",
    "blow moulded signage",
    "B2B display solutions",
    "Delhi manufacturer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} · Acrylic Display Manufacturers`,
    description:
      "35 years of display excellence. Trusted by 500+ brands across India.",
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1B6B6B",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  foundingDate: String(site.foundingYear),
  telephone: `+${site.phone}`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  description:
    "Manufacturer of acrylic display solutions including literature holders, POP displays, charging stations and blow-moulded signage. Serving 13+ industries since 1991.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          <DesktopGate>
            <SmoothScrollProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <MobileNav />
              <div className="mobile-nav-spacer md:hidden" aria-hidden="true" />
            </SmoothScrollProvider>
          </DesktopGate>
        </MotionConfig>
      </body>
    </html>
  );
}
