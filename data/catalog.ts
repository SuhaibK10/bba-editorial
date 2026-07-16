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
} & ProductMedia;

export const catalog: CatalogItem[] = [
  // ── Acrylic Lecterns & Podiums ──────────────
  {
    sku: "CALT001",
    name: "Classic Acrylic Lectern",
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
  },
  {
    sku: "CALT001ACS",
    name: "Acrylic Lectern, Silver Chrome Column",
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
  },
  {
    sku: "CALT0012ACB",
    name: "Acrylic Lectern, Black Chrome Column",
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
  },

  // ── Donation & Ballot Boxes ─────────────────
  {
    sku: "CADB001",
    name: "Lockable Donation Box with A6 Header",
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
  },
  {
    sku: "CADB002",
    name: "Tinted Donation Box with A6 Header",
    slug: "tinted-donation-box-a6-header",
    categorySlug: "donation-ballot-boxes",
    desc: "Dark tinted acrylic collection box that conceals contents while showing fill level.",
    longDesc:
      "The tinted twin of our clear donation box. Dark acrylic obscures what's inside — useful for ballots, feedback and confidential suggestions — while still letting staff judge when it needs emptying. An A6 landscape header advertises the cause, an 80mm slot accepts contributions, and the built-in lock keeps contents secure between collections.",
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
  },

  // ── Raffle Drums & Spinners ─────────────────
  {
    sku: "CARD001",
    name: '13.5" Raffle Spinner with Custom Print',
    slug: "raffle-spinner-13-custom-print",
    categorySlug: "raffle-drums-spinners",
    desc: "Octagonal clear drum with two full-colour printed panels and a locking access door.",
    longDesc:
      "A counter-top raffle drum built for promotions that need to draw a crowd. The octagonal barrel in 5mm clear acrylic spins a full 360° to mix entries, while two 104 × 304mm digitally printed panels put your branding on the drum itself. A 150 × 4mm slot accepts entry forms and envelopes, and a lockable door spanning two faces makes drawing winners and emptying the drum effortless.",
    highlights: [
      "Two 104 × 304mm full-colour printed panels",
      "5mm clear acrylic, 355 × 302mm barrel",
      "360° rotation with built-in carry handles",
      "Lockable two-face access door",
    ],
    specs: [
      { label: "Finish", value: "Clear, custom print" },
      { label: "Placement", value: "Counter top" },
      { label: "Barrel", value: "355 × 302mm" },
      { label: "Security", value: "Built-in lock" },
    ],
  },
  {
    sku: "CARD002",
    name: '12" Raffle Spinner',
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
  },

  // ── Literature Holders ──────────────────────
  {
    sku: "CABH001",
    name: "Single-Tier A4 Brochure Holder",
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
  },
  {
    sku: "CABH002",
    name: "Nine-Pocket A4 Brochure Rack",
    slug: "nine-pocket-a4-brochure-rack",
    categorySlug: "literature-holders",
    desc: "Floor-standing rack with nine A4 pockets for lobbies, showrooms and exhibition stands.",
    longDesc:
      "When one pocket isn't enough. This floor-standing rack presents nine A4 titles at once, keeping catalogues, rate cards and brochures organised and face-out in high-traffic spaces. A self-standing footprint means no wall required — position it beside reception, at the entrance or on the exhibition floor.",
    highlights: [
      "Nine A4 pockets, face-out presentation",
      "Free-standing, no wall fixing needed",
      "Suits lobbies, showrooms and events",
      "Clear acrylic keeps covers fully visible",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Floor standing" },
      { label: "Media size", value: "A4" },
      { label: "Capacity", value: "9 pockets" },
    ],
  },

  // ── Acrylic Risers ──────────────────────────
  {
    sku: "CARS001",
    name: "Seven-Piece Clear Riser Set",
    slug: "seven-piece-clear-riser-set",
    categorySlug: "acrylic-risers",
    desc: "Seven nesting U-shaped risers that build instant height into any counter display.",
    longDesc:
      "Seven graduated risers in 3mm clear acrylic with polished edges — the fastest way to give a flat counter display depth and hierarchy. The nesting design stores in the space of the largest piece, and the risers stack safely to build taller arrangements. Use two, use all seven, reconfigure for every campaign.",
    highlights: [
      "Seven graduated, nesting sizes",
      "3mm clear acrylic, polished edges",
      "Stackable for taller configurations",
      "Stores flat inside the largest piece",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Counter top" },
      { label: "Pieces", value: "7" },
      { label: "Shape", value: "U-shaped, nesting" },
    ],
  },
  {
    sku: "CARS002",
    name: "Five-Piece Black Riser Set",
    slug: "five-piece-black-riser-set",
    categorySlug: "acrylic-risers",
    desc: "Five graduated black risers that add drama and depth to jewellery and cosmetic displays.",
    longDesc:
      "Five graduated U-shaped risers in black acrylic, stepping up smoothly so every product on the counter gets its own level. The dark finish makes metallics, glass and jewel tones pop — a favourite of jewellery counters, perfumeries and collectible displays. A protective film ships on every surface; peel it off and the gloss is flawless.",
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
  },

  // ── Display Pedestals ───────────────────────
  {
    sku: "CADP001",
    name: "Silver Mirrored Pedestal",
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
  },
  {
    sku: "CADP002",
    name: "Gold Mirrored Pedestal",
    slug: "gold-mirrored-pedestal",
    categorySlug: "display-pedestals",
    desc: "Richly hued gold mirror pedestal for launches and displays that need warmth and glamour.",
    longDesc:
      "The same five-sided mirrored construction in a rich gold finish. Gold mirror flatters jewellery, fragrance, festive and luxury merchandise, adding warmth that silver can't. Reflective faces catch and multiply ambient light, making the pedestal a statement piece even before the product goes on top.",
    highlights: [
      "Mirrored acrylic, gold finish",
      "Five-sided construction, open bottom",
      "Load-tested for heavy merchandise",
      "Multiple footprints made to order",
    ],
    specs: [
      { label: "Finish", value: "Gold mirror" },
      { label: "Placement", value: "Floor standing" },
      { label: "Construction", value: "5-sided, open bottom" },
      { label: "Sizes", value: "Multiple, made to order" },
    ],
  },

  // ── Table Top Displays ──────────────────────
  {
    sku: "CATT001",
    name: 'Slant-Back Sign Holder, 4" × 6"',
    slug: "slant-back-sign-holder-4x6",
    categorySlug: "table-top-displays",
    desc: "The everyday counter sign holder: angled for reading, side-loading in seconds.",
    longDesc:
      "The simplest piece of point-of-sale kit there is, done properly. The slant-back angle presents a 4 × 6 inch card at a natural reading angle on counters and tabletops, and the side-insert design swaps messages in seconds. Order in quantity for menus, price cards, table numbers and compliance notices across every counter you run.",
    highlights: [
      "Holds 4 × 6 inch cards in portrait",
      "Slant-back angle for easy reading",
      "Side insert — swap messages in seconds",
      "Economical in case-pack quantities",
    ],
    specs: [
      { label: "Finish", value: "Clear" },
      { label: "Placement", value: "Counter top" },
      { label: "Media size", value: '4" × 6", portrait' },
      { label: "Loading", value: "Side insert" },
    ],
  },
];

export const getCatalogItem = (slug: string) =>
  catalog.find((item) => item.slug === slug);

export const getItemsByCategory = (categorySlug: string) =>
  catalog.filter((item) => item.categorySlug === categorySlug);
