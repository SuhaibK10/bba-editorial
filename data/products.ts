// ─────────────────────────────────────────────
//  B & B Appliances — centralized data
//  Edit product names, images, descriptions here
//  Upload new images to Cloudinary, paste URL here
// ─────────────────────────────────────────────

export const products = [
  {
  id: "01",
  name: "Literature Holders",
  desc: "Acrylic brochure & pamphlet dispensers for retail and banking environments.",
  slug: "literature-holders",
  image: "https://res.cloudinary.com/deh394y0h/video/upload/v1779904970/literatureHolder_wm7oz7.mp4",
  video: true,
  color: "#EEF2FF",
},
  {
    id: "02",
    name: "Static Signages",
    desc: "Durable blow-moulded plastic signage for brand visibility at scale.",
    slug: "static-signages",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779711816/StaticSignage_cdmsko.png",
    color: "#F0F9FF",
  },
  {
    id: "03",
    name: "Retail POP Displays",
    desc: "Point-of-purchase systems engineered to drive impulse decisions at the shelf.",
    slug: "retail-pop-displays",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779898405/POP_Displays_mccdso.png",
    color: "#ECFEFF",
  },
  {
    id: "04",
    name: "Table Top Displays",
    desc: "Counter-top acrylic units engineered for maximum product visibility at POS.",
    slug: "table-top-displays",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/c_pad,w_1200,h_800,b_white/v1779712393/Tabletopdisplays_sytjoi.png",
    color: "#F0FDF4",
  },
  {
    id: "05",
    name: "Charging Stations",
    desc: "Display stands with integrated device charging. Serve customers while they wait.",
    slug: "mobile-charging-stations",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779903523/Charging_ongamy.png",
    color: "#FFF7ED",
  },
  {
  id: "06",
  name: "Revolving Towers",
  desc: "Multi-tier rotating display towers that multiply shelf space without increasing footprint.",
  slug: "revolving-display-towers",
  image: "https://res.cloudinary.com/deh394y0h/video/upload/v1779904313/video_mp__wyqo1d.mp4",
  video: true,  // ← flag it
  color: "#FDF4FF",
},
  {
    id: "07",
    name: "Floor Standing Displays",
    desc: "Full-height acrylic display units built to command attention in high-footfall spaces.",
    slug: "floor-standing-displays",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779899150/FloorStandingDisplays_k43oyj.png",
    color: "#FFF1F2",
  },
  {
    id: "08",
    name: "Acrylic Risers",
    desc: "Stepped acrylic platforms that elevate products for shelf presence and visibility.",
    slug: "acrylic-risers",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/c_fill,g_auto,w_1700,h_900/v1779899888/AcrylicRisersB_B_uicnrb.png",
    color: "#F5F3FF",
  },
  {
    id: "09",
    name: "Custom Display Cases",
    desc: "Bespoke enclosures fabricated to your exact dimensions and brand specifications.",
    slug: "custom-display-cases",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/c_pad,w_1400,h_1000,b_white/v1779810590/CustomizeAcrylicBoxes_hv33gu.png",
    color: "#FFFBEB",
  },
];

export const industries = [
  "Telecom",
  "Banking & Insurance",
  "Pharma & Healthcare",
  "FMCG",
  "Cosmetics & Beauty",
  "Hospitality",
  "Automobile",
  "Electronics",
  "Retail",
  "Education",
  "Real Estate",
  "Government",
  "Petroleum",

];
//Trustbar ka hai
export const stats = [
  { value: 35, suffix: "+", label: "Years of Manufacturing" },
  { value: 500, suffix: "+", label: "Brands Served" },
  { value: 13, suffix: "+", label: "Industries" },
  { value: 8, suffix: "+", label: "Categories" },
];

export const processSteps = [
  { step: "01", title: "Browse", desc: "Explore our product categories and find what fits your need." },
  { step: "02", title: "Quote", desc: "Submit a quote request with your specs, quantity, and timeline." },
  { step: "03", title: "Manufacture", desc: "We fabricate at our facility with 35 years of precision." },
  { step: "04", title: "Deliver", desc: "Pan-India delivery. Your displays, on time, every time." },
];