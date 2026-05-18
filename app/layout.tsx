import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { MotionConfig } from "framer-motion";

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
  title: "B & B Appliances — Acrylic Display Manufacturers Since 1991",
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
  openGraph: {
    title: "B & B Appliances — Acrylic Display Manufacturers",
    description: "35 years of display excellence. Trusted by 500+ brands across India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}