// ─────────────────────────────────────────────
//  B & B Appliances: individual catalog items
//  Each item belongs to a category in products.ts
//  (categorySlug ↔ products.slug). Copy sourced from
//  the master product sheet; images pending photography.
// ─────────────────────────────────────────────

import type { ProductMedia } from "@/data/products";

export type CatalogItem = {
  sku: string;
  name: string;
  slug: string;
  categorySlug: string;
  desc: string;
  longDesc: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  leadTime?: string; // overrides DEFAULT_LEAD_TIME on the item page
  // Controlled-vocabulary facets for the /products/all filter sidebar.
  // Kept separate from `specs` (free-form, for the item page's prose table)
  // so filtering never breaks on a mismatched label string.
  type: string;
  color: string;
  placement: string;
  // ── Checkout ──────────────────────────────────
  // price: INR, tax-inclusive, whole rupees. PLACEHOLDER values below —
  // confirm real pricing with the workshop before taking real payments.
  price: number;
  // No numeric stock count: these are made-to-order fabrications, not
  // warehouse-picked units. "out-of-stock" is the only state that blocks
  // checkout; the rest are informational (shown as the lead-time line).
  stock: "in-stock" | "made-to-order" | "out-of-stock";
} & ProductMedia;

// Shown as the "Lead time" spec on every item page unless the item
// carries its own. Confirm the number with the workshop before launch.
export const DEFAULT_LEAD_TIME = "Made to order · despatched in 5–7 business days";

export const catalog: CatalogItem[] = [
  // ── Acrylic Lecterns & Podiums ──────────────
  {
    sku: "CALT001",
    name: "Classic Acrylic Lectern",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784402336/Generated_Image_July_19_2026_-_12_40AM_ttjs4k.jpg",
    slug: "classic-acrylic-lectern",
    categorySlug: "acrylic-lecterns-podiums",
    desc: "The all-clear classic: thick cast acrylic with an interior shelf, delivered ready to use.",
    longDesc:
      "A full-clear lectern that puts the focus on the speaker, not the furniture. Built from 12mm acrylic panels with a 15mm top and base for a sturdy, glass-like presence, it arrives fully assembled with an interior shelf for water and notes. The angled top has a raised lip that keeps papers, tablets and books exactly where the speaker left them.",
    highlights: [
      "12mm panels with 15mm top and base",
      "Interior shelf for notes and beverages",
      "Raised lip keeps materials in place",
      "Rubber feet protect floors and prevent sliding",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Floor standing" },
      { label: "Material", value: "12–15mm cast acrylic" },
      { label: "Assembly", value: "Delivered assembled" },
    ],
    type: "Full-Height Lectern",
    color: "Clear",
    placement: "Floor standing",
    price: 1299,
    stock: "made-to-order",
  },
  {
    sku: "CALT001ACS",
    name: "Acrylic Lectern, Silver Chrome Column",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784401439/Generated_Image_July_19_2026_-_12_32AM_lokvou.jpg", // paste Cloudinary URL here
    slug: "acrylic-lectern-silver-chrome",
    categorySlug: "acrylic-lecterns-podiums",
    desc: "Clear acrylic reading top on a single chromed aluminium column with a weighted base.",
    longDesc:
      "A single polished column carries a generous 600 × 400mm reading surface in 12mm clear acrylic with polished edges. The brushed silver finish sits comfortably in conference centres, hotels, universities and places of worship, and the weighted base keeps the stand planted while the speaker moves freely.",
    highlights: [
      "600 × 400mm slanted top in 12mm clear acrylic",
      "Chromed aluminium column and base",
      "Weighted base for stability during use",
      "Raised lip holds notes, tablets and books",
    ],
    specs: [
      { label: "Finish", value: "Silver chrome" },
      { label: "Placement", value: "Floor standing" },
      { label: "Reading surface", value: "600 × 400mm" },
      { label: "Material", value: "12mm acrylic, aluminium" },
    ],
    type: "Column Lectern",
    color: "Silver",
    placement: "Floor standing",
    price: 1550,
    stock: "made-to-order",
  },
  {
    sku: "CALT0012ACB",
    name: "Acrylic Lectern, Black Chrome Column",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784403460/Generated_Image_July_19_2026_-_12_59AM_r8crca.jpg", // paste Cloudinary URL here
    slug: "acrylic-lectern-black-chrome",
    categorySlug: "acrylic-lecterns-podiums",
    desc: "Sleek black acrylic reading top with a matching black chrome column and weighted base.",
    longDesc:
      "The same single-column architecture in an all-black execution: a 600 × 400mm slanted top cut from 12mm black acrylic with polished edges, carried on a black chrome aluminium column. A weighted, colour-matched base ensures stability, making it a striking anchor for stages, auditoriums and executive briefing rooms.",
    highlights: [
      "600 × 400mm top in 12mm black acrylic",
      "Black chrome column with matching base",
      "Weighted base ensures stability",
      "Polished edges with a subtle clear-through look",
    ],
    specs: [
      { label: "Finish", value: "Black chrome" },
      { label: "Placement", value: "Floor standing" },
      { label: "Reading surface", value: "600 × 400mm" },
      { label: "Material", value: "12mm acrylic, aluminium" },
    ],
    type: "Column Lectern",
    color: "Black",
    placement: "Floor standing",
    price: 1499,
    stock: "made-to-order",
  },

  // ── Donation & Ballot Boxes ─────────────────
  {
    sku: "CADB001",
    name: "Lockable Donation Box ",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784403328/Generated_Image_July_19_2026_-_1_02AM_ovo7au.jpg", // paste Cloudinary URL here
    slug: "lockable-donation-box-a6-header",
    categorySlug: "donation-ballot-boxes",
    desc: "Clear lockable collection box with an A6 signage header and a wide 85mm entry slot.",
    longDesc:
      "A clear acrylic collection box that builds trust by showing exactly where every contribution goes. The A6 (105 × 148mm) header holds a printed graphic explaining the cause, the 85mm slot accepts notes, coins and suggestion cards, and the lock ships with two keys so only staff can open it. Double-sided foam tape secures the box to counters and desks.",
    highlights: [
      "Lockable lid with two keys included",
      "A6 landscape header for a custom graphic",
      "85mm slot for cash, coupons and cards",
      "Foam tape base secures it to any counter",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Counter top" },
      { label: "Header", value: "A6, landscape" },
      { label: "Security", value: "Built-in lock, 2 keys" },
    ],
    type: "Lockable Box",
    color: "Clear",
    placement: "Counter top",
    price: 899,
    stock: "made-to-order",
  },
  {
    sku: "CADB002",
    name: "Tinted Donation Box ",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784404756/Generated_Image_July_19_2026_-_1_28AM_ay0ezm.jpg", // paste Cloudinary URL here
    slug: "tinted-donation-box-a6-header",
    categorySlug: "donation-ballot-boxes",
    desc: "Dark tinted acrylic collection box that conceals contents while showing fill level.",
    longDesc:
      "The tinted twin of our clear donation box. Dark acrylic obscures what's inside, useful for ballots, feedback and confidential suggestions, while still letting staff judge when it needs emptying. An A6 landscape header advertises the cause, an 80mm slot accepts contributions, and the built-in lock keeps contents secure between collections.",
    highlights: [
      "Tinted acrylic conceals individual contents",
      "A6 landscape header for a custom graphic",
      "80mm entry slot for notes and cards",
      "Lockable, with foam tape base included",
    ],
    specs: [
      { label: "Finish", value: "Tinted" },
      { label: "Placement", value: "Counter top" },
      { label: "Header", value: "A6, landscape" },
      { label: "Security", value: "Built-in lock, keys included" },
    ],
    type: "Lockable Box",
    color: "Tinted",
    placement: "Counter top",
    price: 949,
    stock: "made-to-order",
  },

  // ── Literature Holders ──────────────────────
  {
    sku: "CABH001",
    name: "Brochure Holder",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784407082/Generated_Image_July_19_2026_-_1_36AM_wtl54x.jpg", // paste Cloudinary URL here
    slug: "single-tier-a4-brochure-holder",
    categorySlug: "literature-holders",
    desc: "The workhorse A4 dispenser: counter-top or wall-mounted, with a deep 41mm pocket.",
    longDesc:
      "The staple of bank branches, clinics, travel desks and showrooms. This single-pocket holder presents A4 (210 × 297mm) literature in portrait, with a deep cut-out that makes taking a brochure easy and a 41mm pocket that holds a generous stack. Angled feet tilt the pocket toward the customer on a counter; two keyhole cut-outs let the same unit mount flat on a wall.",
    highlights: [
      "Fits standard A4 portrait literature",
      "41mm deep pocket holds a full stack",
      "Counter-top or wall-mounted via keyholes",
      "Polished edges for an acrylic-clear look",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Counter top / wall mount" },
      { label: "Media size", value: "A4, portrait" },
      { label: "Pocket depth", value: "41mm" },
    ],
    type: "Single Pocket",
    color: "Clear",
    placement: "Counter top / Wall mount",
    price: 599,
    stock: "made-to-order",
  },

  // ── Raffle Drums & Spinners ─────────────────
  {
    sku: "CARD002",
    name: 'Raffle Spinner',
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784407621/Generated_Image_July_19_2026_-_2_16AM_gtbmmt.jpg", // paste Cloudinary URL here
    slug: "raffle-spinner-12",
    categorySlug: "raffle-drums-spinners",
    desc: "Compact clear raffle barrel with visible contents that keep every draw provably fair.",
    longDesc:
      "A 310mm clear acrylic barrel on a matching stand, sized for counters and prize tables. Full transparency shows participants their entries are really in the mix, a side slit with a sliding bar accepts tickets without letting them escape mid-spin, and the lockable hinged door prevents tampering between draws.",
    highlights: [
      "5mm clear acrylic barrel, 310mm long",
      "360° spin randomises entries visibly",
      "Sliding bar keeps tickets in during rotation",
      "Lockable hinged door with key",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Counter top" },
      { label: "Barrel", value: "310mm" },
      { label: "Security", value: "Built-in lock" },
    ],
    type: "Standard Spinner",
    color: "Clear",
    placement: "Counter top",
    price: 999,
    stock: "made-to-order",
  },

  // ── Acrylic Risers ──────────────────────────
  {
    sku: "CARS002",
    name: "Five-Piece Black Riser Set",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784405571/Generated_Image_July_19_2026_-_1_38AM_sbhxlc.jpg", // paste Cloudinary URL here
    slug: "five-piece-black-riser-set",
    categorySlug: "acrylic-risers",
    desc: "Five graduated black risers that add drama and depth to jewellery and cosmetic displays.",
    longDesc:
      "Five graduated U-shaped risers in black acrylic, stepping up smoothly so every product on the counter gets its own level. The dark finish makes metallics, glass and jewel tones pop, a favourite of jewellery counters, perfumeries and collectible displays. A protective film ships on every surface; peel it off and the gloss is flawless.",
    highlights: [
      "Five graduated sizes for layered displays",
      "Gloss black finish flatters metallics and glass",
      "Protective film on all surfaces in transit",
      "Ideal for jewellery, fragrance and collectibles",
    ],
    specs: [
      { label: "Finish", value: "Black" },
      { label: "Placement", value: "Counter top" },
      { label: "Pieces", value: "5" },
      { label: "Shape", value: "U-shaped, graduated" },
    ],
    type: "Riser Set",
    color: "Black",
    placement: "Counter top",
    price: 699,
    stock: "made-to-order",
  },

  // ── Display Pedestals ───────────────────────
  {
    sku: "CADP001",
    name: "Silver Mirrored Pedestal",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784407081/ChatGPT_Image_Jul_19_2026_at_01_57_22_AM_dftd6a.png", // paste Cloudinary URL here
    slug: "silver-mirrored-pedestal",
    categorySlug: "display-pedestals",
    desc: "Mirror-finish acrylic pedestal that multiplies light around whatever sits on top.",
    longDesc:
      "A five-sided mirrored acrylic pedestal with an open bottom, built to give one product an unmissable stage. The mirror finish magnifies every light source around it and makes tight retail spaces read larger. Load-tested for heavy merchandise and available in a range of footprints and heights to suit windows, launches and events.",
    highlights: [
      "Mirrored acrylic, silver finish",
      "Five-sided construction, open bottom",
      "Supports heavy merchandise (up to ~90kg)",
      "Multiple footprints made to order",
    ],
    specs: [
      { label: "Finish", value: "Silver mirror" },
      { label: "Placement", value: "Floor standing" },
      { label: "Construction", value: "5-sided, open bottom" },
      { label: "Sizes", value: "Multiple, made to order" },
    ],
    type: "Mirrored Pedestal",
    color: "Silver",
    placement: "Floor standing",
    price: 1399,
    stock: "made-to-order",
  },

  // ── Floor Standing Displays ──────────────────
  {
    sku: "CAFD001",
    name: "Modular Floor Display Tower",
    image: "https://res.cloudinary.com/deh394y0h/image/upload/v1784408470/ChatGPT_Image_Jul_19_2026_at_02_22_13_AM_bys3ew.png", // paste Cloudinary URL here
    slug: "modular-floor-display-tower",
    categorySlug: "floor-standing-displays",
    desc: "Full-height acrylic tower with three branded shelves, built to anchor a brand zone.",
    longDesc:
      "A full-height acrylic display tower with three fixed shelves and a header panel sized for branding or a campaign graphic. The weighted base keeps it stable in high-footfall showrooms, malls and flagship stores, while the open, all-clear construction lets merchandise take center stage on every level. Ships flat-packed with tool-free assembly.",
    highlights: [
      "Three fixed shelves plus header branding panel",
      "Weighted base for stability in busy spaces",
      "Flat-packed, tool-free assembly",
      "Clear, glass-like acrylic construction",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Floor standing" },
      { label: "Shelves", value: "3 fixed tiers" },
      { label: "Assembly", value: "Flat-packed, tool-free" },
    ],
    type: "Display Tower",
    color: "Clear",
    placement: "Floor standing",
    price: 2499,
    stock: "made-to-order",
  },
];

export const getCatalogItem = (slug: string) =>
  catalog.find((item) => item.slug === slug);

export const getItemsByCategory = (categorySlug: string) =>
  catalog.filter((item) => item.categorySlug === categorySlug);
