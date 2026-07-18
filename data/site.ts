// ─────────────────────────────────────────────
//  B & B Appliances: site-wide config
//  ⚠️ TODO before launch: replace the placeholder
//  phone/WhatsApp number, email and domain below.
//  Every page reads from this file. Edit once here.
// ─────────────────────────────────────────────

export const site = {
  name: "B & B Appliances",
  tagline: "Acrylic Display Manufacturers Since 1991",
  foundingYear: 1991,

  // TODO: replace with the real production domain
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bbappliances.in",

  // TODO: replace with the real number (country code + number, digits only)
  phone: "919999999999",
  // TODO: replace with the real email
  email: "sales@bbappliances.in",
  // TODO: replace with the real orders inbox. Internal notification
  // recipient for every paid checkout order (see app/api/checkout/verify).
  ordersEmail: "orders@bbappliances.in",

  address: {
    street: "GT Karnal Road",
    city: "New Delhi",
    region: "Delhi",
    country: "IN",
  },
} as const;

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${site.phone}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const phoneHref = `tel:+${site.phone}`;
export const emailHref = `mailto:${site.email}`;
