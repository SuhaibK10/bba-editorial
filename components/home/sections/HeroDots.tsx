"use client";

import { motion } from "framer-motion";
import type { HeroSlide } from "@/data/hero-slides";

// Dot-track + active-fill-bar indicator, shared by HeroSection's mobile
// (stacked below the CTAs) and desktop (bottom-right corner) layouts.
// Those two call sites differ only in outer positioning, passed via className.
export default function HeroDots({
  slides,
  current,
  onSelect,
  slideMs,
  className = "flex gap-2",
}: {
  slides: HeroSlide[];
  current: number;
  onSelect: (i: number) => void;
  slideMs: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {slides.map((slide, i) => (
        <button
          key={slide.slug}
          onClick={() => onSelect(i)}
          aria-label={`Show ${slide.name}`}
          className="relative h-0.75 rounded-full overflow-hidden transition-all duration-300"
          style={{ width: i === current ? "2rem" : "0.75rem" }}
        >
          <span className="absolute inset-0 bg-white/25" />
          {i === current && (
            <motion.span
              key={`fill-${current}`}
              className="absolute inset-0 bg-accent origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: slideMs / 1000, ease: "linear" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
