# B & B Appliances

Marketing and product-catalog site for B & B Appliances, an acrylic display
manufacturer. Next.js App Router site with no backend and no checkout —
visitors build a quote list and submit it via a pre-filled WhatsApp message
(or email).

## Stack

- **Next.js 16** (App Router, Turbopack) + React + TypeScript (strict)
- **Tailwind CSS v4**, configured via the `@theme` block in `app/globals.css`
  (no `tailwind.config.js` — colors, easing curves, shadows are CSS custom
  properties)
- **Zustand** (`lib/cart-store.ts`) for the quote cart, persisted to
  `localStorage`
- **Framer Motion** for scroll-triggered and interactive animation
- Images/video served from **Cloudinary**

## Getting started

```bash
npm run dev        # start the dev server (Turbopack) on :3000
npm run build       # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit, no output on success
```

## Project structure

```
app/                   Routes (App Router). Pages are server components;
                        interactivity is pushed down into client components.
components/
  home/sections/       One component per homepage section
  layout/               Navbar, Footer, MobileNav (bottom tab bar),
                        MobileMenuOverlay (full-screen hamburger menu)
  products/             ProductCard, ProductMedia (image/video/placeholder)
  quote/                QuoteForm, AddToQuoteButton, cart UI
  shared/                Cross-page components, including shared icons/
data/                   Typed, hand-authored content — the site's content
                        source of truth. No CMS.
  products.ts           Product catalog + `getProduct()`
  hero-slides.ts        Homepage hero slider content
  home-content.ts       Homepage-only content (stats, process steps, etc.)
  industries.tsx        Industry list (icons + copy)
  site.ts                Brand/contact info, WhatsApp/email link builders
  testimonials.ts        Testimonials + trust badges
  faqs.ts                 FAQ content
lib/
  cart-store.ts          Zustand quote-cart store
  quote.ts                Pure functions: form validation, WhatsApp message
                        composition (used by QuoteForm, easy to unit test)
  motion.ts                Shared Framer Motion constants — easing curves,
                        spring configs, viewport triggers. Import from here,
                        don't redefine inline.
  media.ts, theme.ts     Cloudinary/video helpers, theme constants
```

## Editing content

Everything a non-engineer would want to change — products, hero slides,
testimonials, contact info — lives in `data/`, typed against the exported
interfaces in each file. There's no CMS; editing a `data/*.ts` file and
redeploying is the workflow.

## Known placeholders

`data/site.ts` (phone/email/domain) and `data/testimonials.ts` (client
quotes) contain placeholder values marked with `TODO` comments. Replace
these with real values before launch.
