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

export type ProcessStep = { step: string; title: string; desc: string };

export const processSteps: ProcessStep[] = [
  { step: "01", title: "Browse", desc: "Explore our product categories and find what fits your need." },
  { step: "02", title: "Quote", desc: "Submit a quote request with your specs, quantity, and timeline." },
  { step: "03", title: "Manufacture", desc: "We fabricate at our facility with 35 years of precision." },
  { step: "04", title: "Deliver", desc: "Pan-India delivery. Your displays, on time, every time." },
];
