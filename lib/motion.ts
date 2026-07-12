// Shared Framer Motion constants. Import from here — never redefine inline.
// EASE_OUT_EXPO mirrors --ease-out-expo in app/globals.css; keep both in sync
// if this curve ever changes.

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// Drag-release spring shared by the homepage's draggable carousels
// (best-sellers product carousel, testimonials carousel).
export const CAROUSEL_SPRING = {
  type: "spring",
  stiffness: 110,
  damping: 22,
  mass: 1.9,
} as const;

// Standard scroll-trigger config for whileInView fade-ins across sections.
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
