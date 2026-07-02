// ─────────────────────────────────────────────
//  B & B Appliances — centralized data
//  Edit product names, images, descriptions here
//  Upload new images to Cloudinary, paste URL here
// ─────────────────────────────────────────────

export type Product = {
  id: string;
  name: string;
  desc: string;
  longDesc: string;
  slug: string;
  image: string;
  video?: boolean;
  color: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: "01",
    name: "Literature Holders",
    desc: "Acrylic brochure & pamphlet dispensers for retail and banking environments.",
    longDesc:
      "Wall-mounted and counter-top acrylic dispensers that keep brochures, pamphlets and rate cards organised and visible. A staple of bank branches, hospital receptions and retail counters across India.",
    slug: "literature-holders",
    image:
      "https://res.cloudinary.com/deh394y0h/video/upload/v1779904970/literatureHolder_wm7oz7.mp4",
    video: true,
    color: "#EEF2FF",
    features: [
      "Single and multi-pocket configurations",
      "Wall-mounted or counter-top formats",
      "Crystal-clear cast acrylic construction",
      "Standard A4, A5 and DL sizes, or custom",
    ],
  },
  {
    id: "02",
    name: "Static Signages",
    desc: "Durable blow-moulded plastic signage for brand visibility at scale.",
    longDesc:
      "Blow-moulded plastic signage built to survive Indian weather — sun, dust and monsoon. Ideal for petrol pumps, dealer boards and franchise networks that need identical branding at hundreds of locations.",
    slug: "static-signages",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/v1779711816/StaticSignage_cdmsko.png",
    color: "#F0F9FF",
    features: [
      "UV-stable, weather-resistant materials",
      "Consistent colour across large production runs",
      "Indoor and outdoor variants",
      "Mounting hardware included",
    ],
  },
  {
    id: "03",
    name: "Retail POP Displays",
    desc: "Point-of-purchase systems engineered to drive impulse decisions at the shelf.",
    longDesc:
      "Point-of-purchase display systems designed around one job: converting attention into sales at the shelf. From counter units to end-caps, engineered for FMCG, cosmetics and electronics brands.",
    slug: "retail-pop-displays",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/v1779898405/POP_Displays_mccdso.png",
    color: "#ECFEFF",
    features: [
      "Counter, shelf and end-cap formats",
      "Brand-matched printing and colours",
      "Quick knock-down assembly for shipping",
      "Designed for high-footfall retail",
    ],
  },
  {
    id: "04",
    name: "Table Top Displays",
    desc: "Counter-top acrylic units engineered for maximum product visibility at POS.",
    longDesc:
      "Compact counter-top units that put your product at eye level right where the transaction happens. Widely used at pharmacy counters, telecom stores and beauty retail.",
    slug: "table-top-displays",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/c_pad,w_1200,h_800,b_white/v1779712393/Tabletopdisplays_sytjoi.png",
    color: "#F0FDF4",
    features: [
      "Compact footprint for crowded counters",
      "Tiered and single-product layouts",
      "Optional branding panels",
      "Scratch-resistant acrylic finish",
    ],
  },
  {
    id: "05",
    name: "Charging Stations",
    desc: "Display stands with integrated device charging. Serve customers while they wait.",
    longDesc:
      "Display stands with integrated multi-device charging — customers charge their phones while your brand holds their attention. Popular in telecom stores, hospitality and waiting areas.",
    slug: "mobile-charging-stations",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/v1779903523/Charging_ongamy.png",
    color: "#FFF7ED",
    features: [
      "Multi-port charging with cable management",
      "Branding panels on all visible faces",
      "Secure, tamper-resistant wiring",
      "Counter-top and floor-standing variants",
    ],
  },
  {
    id: "06",
    name: "Revolving Towers",
    desc: "Multi-tier rotating display towers that multiply shelf space without increasing footprint.",
    longDesc:
      "Motorised and manual rotating towers that multiply display area without taking more floor space. A single square foot of footprint can carry four faces of merchandising.",
    slug: "revolving-display-towers",
    image:
      "https://res.cloudinary.com/deh394y0h/video/upload/v1779904313/video_mp__wyqo1d.mp4",
    video: true,
    color: "#FDF4FF",
    features: [
      "Motorised or manual rotation",
      "Multi-tier configurations",
      "360° product visibility",
      "Silent, low-maintenance drive units",
    ],
  },
  {
    id: "07",
    name: "Floor Standing Displays",
    desc: "Full-height acrylic display units built to command attention in high-footfall spaces.",
    longDesc:
      "Full-height units built to anchor a brand zone in showrooms, malls and flagship stores. Engineered for stability and daily wear in high-footfall environments.",
    slug: "floor-standing-displays",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/v1779899150/FloorStandingDisplays_k43oyj.png",
    color: "#FFF1F2",
    features: [
      "Full-height presence, stable weighted base",
      "Modular shelving configurations",
      "Integrated header and side branding",
      "Built for daily retail wear",
    ],
  },
  {
    id: "08",
    name: "Acrylic Risers",
    desc: "Stepped acrylic platforms that elevate products for shelf presence and visibility.",
    longDesc:
      "Stepped platforms and plinths that lift products off the shelf plane and into the sightline. The simplest, most cost-effective upgrade to any product presentation.",
    slug: "acrylic-risers",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/c_fill,g_auto,w_1700,h_900/v1779899888/AcrylicRisersB_B_uicnrb.png",
    color: "#F5F3FF",
    features: [
      "Stepped, nesting and plinth formats",
      "Clear, frosted and coloured acrylic",
      "Polished edges, no visible joints",
      "Any size, made to order",
    ],
  },
  {
    id: "09",
    name: "Custom Display Cases",
    desc: "Bespoke enclosures fabricated to your exact dimensions and brand specifications.",
    longDesc:
      "Fully bespoke enclosures and cases fabricated to your drawings — or ours. Send us a sketch, a sample or a competitor's unit and we engineer, prototype and produce it.",
    slug: "custom-display-cases",
    image:
      "https://res.cloudinary.com/deh394y0h/image/upload/c_pad,w_1400,h_1000,b_white/v1779810590/CustomizeAcrylicBoxes_hv33gu.png",
    color: "#FFFBEB",
    features: [
      "Built to your exact dimensions",
      "Prototype before production",
      "Lockable and dust-proof options",
      "Low minimum order quantities",
    ],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

// Categories we manufacture but don't photograph yet —
// shown as quote-linked entries on /products.
export const moreCategories = [
  "Acrylic Lecterns & Podiums",
  "Donation & Ballot Boxes",
  "Jewellery Displays",
  "Display Pedestals",
  "Raffle Drums & Spinners",
  "Acrylic Solid Blocks",
  "Menu & Card Holders",
  "Protective Screens & Shields",
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
