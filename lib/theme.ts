// Mirrors the palette in app/globals.css's `@theme` block.
//
// CSS custom properties aren't reachable from contexts that run outside the
// browser's CSS cascade — next/og's Satori renderer (opengraph-image.tsx)
// and the `themeColor` string in a metadata export (layout.tsx) both need
// literal hex values. This file is the single place those two read from,
// so a palette change only means updating two files instead of hunting
// through every non-CSS spot a color got typed in by hand.
//
// Keep these values in sync with app/globals.css's @theme block by hand.
export const theme = {
  background: "#FFFFFF",
  textPrimary: "#1D1D1F",
  textSecondary: "#86868B",
  accent: "#1D1D1F",
} as const;
