// Homepage-only content: the "more categories" quote-linked list, the
// stats strip, and the process steps. Not product/site config — lives
// separately from data/products.ts and data/site.ts on purpose.

// Categories we manufacture but don't list as full products yet,
// shown as quote-linked entries on /products.
export const moreCategories: string[] = [
  "Menu & Card Holders",
  "Protective Screens & Shields",
  "Acrylic Trays",
  "Sign & Poster Frames",
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 35, suffix: "+", label: "Years of Manufacturing" },
  { value: 500, suffix: "+", label: "Brands Served" },
  { value: 13, suffix: "+", label: "Industries" },
  { value: 15, suffix: "+", label: "Categories" },
];

// Client brands shown in the marquee strip. Entries with a `logo` render
// the image (drop SVG/PNG files in public/logos/); the rest render as
// styled text wordmarks until their logo file is supplied. `logoSize`
// bumps the render height for logo files with a lot of built-in padding
// around the mark (e.g. Airtel), so every wordmark reads as the same
// visual weight in the strip despite differing source-file crops.
export type Client = { name: string; logo?: string; logoSize?: "sm" | "base" | "lg" | "xl" | "2xl" };

// "sm" exists for very wide, short wordmarks (Armani ~9:1, Assa Abloy
// ~7:1) — at the base height they'd stretch 300px+ and dominate the strip.
export const clients: Client[] = [
  { name: "Airtel", logo: "/logos/airtel.png", logoSize: "2xl" },
  { name: "Aircel", logo: "/logos/aircel.png", logoSize: "lg" },
  { name: "Idea", logo: "/logos/idea.png", logoSize: "2xl" },
  { name: "Subway", logo: "/logos/subway.png", logoSize: "xl" },
  { name: "Fossil", logo: "/logos/fossil.svg" },
  { name: "Michael Kors", logo: "/logos/michael-kors.webp", logoSize: "lg" },
  { name: "Oppo", logo: "/logos/oppo.png", logoSize: "sm" },
  { name: "Vivo", logo: "/logos/vivo.png", logoSize: "sm" },
  { name: "Lava", logo: "/logos/lava.png", logoSize: "sm" },
  { name: "SBI", logo: "/logos/sbi.png", logoSize: "sm" },
  { name: "Uniqlo", logo: "/logos/uniqlo.png" },
  { name: "Tim Hortons", logo: "/logos/tim-hortons.png", logoSize: "sm" },
  { name: "Giorgio Armani", logo: "/logos/armani.png", logoSize: "sm" },
  { name: "Assa Abloy", logo: "/logos/assa-abloy.png", logoSize: "sm" },
  { name: "Shri Mata Vaishno Devi Shrine Board", logo: "/logos/smvdsb.png" },
  { name: "Ambrane" },
  { name: "100 Pipers" },
  { name: "Blenders Pride" },
];

export type ProcessStep = { step: string; title: string; desc: string };

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Browse", desc: "Explore our product categories and find what fits your need." },
  { step: "02", title: "Quote", desc: "Submit a quote request with your specs, quantity, and timeline." },
  { step: "03", title: "Manufacture", desc: "We fabricate at our facility with 35 years of precision." },
  { step: "04", title: "Deliver", desc: "Pan-India delivery. Your displays, on time, every time." },
];
