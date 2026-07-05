"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/data/products";

const SLIDE_MS = 4000;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchStartX = useRef(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(next, SLIDE_MS);
    return () => clearInterval(id);
  }, [playing, next]);

  const goTo = (i: number) => {
    setCurrent(i);
    setPlaying(false);
    setTimeout(() => setPlaying(true), SLIDE_MS);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) < 40) return;
    const dir = delta > 0 ? 1 : -1;
    goTo((current + dir + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      id="hero-section"
      className="relative h-[90svh] md:h-[70vh] flex flex-col justify-end overflow-hidden bg-[#101314]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides: crossfade + slow scale settle */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[current].image}
            alt={heroSlides[current].name}
            fill
            preload={current === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Legibility gradients */}
      <div className="absolute inset-0 z-1 bg-linear-to-t from-black/85 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-40 z-1 bg-linear-to-b from-black/50 to-transparent" />

      {/* Bottom-centred text */}
      <div className="container-wide relative z-10 pb-8 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="font-display font-bold text-[clamp(1.75rem,5vw,3.75rem)] md:text-[clamp(2rem,5.5vw,4.25rem)]
                       text-white leading-[1.08] tracking-tight mb-5 md:mb-8"
          >
            India&apos;s most trusted
            <br />
            acrylic manufacturer.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link href="/quote" className="btn-primary">
              Get a Quote
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6h7M6.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 h-10 min-w-40
                         px-5 rounded-full border border-white/40 text-white text-sm
                         font-body font-medium backdrop-blur-sm whitespace-nowrap
                         hover:border-white hover:bg-white/10 transition-colors duration-200"
            >
              Browse Products
            </Link>
          </motion.div>

          {/* Mobile category name + indicators: centred below CTAs */}
          <div className="flex md:hidden flex-col items-center gap-3 mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
              >
                <Link
                  href={`/products/${heroSlides[current].slug}`}
                  className="font-display font-bold text-sm text-white hover:text-[#E3B15C] transition-colors duration-200"
                >
                  {heroSlides[current].name}
                </Link>
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-2">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.slug}
                  onClick={() => goTo(i)}
                  aria-label={`Show ${slide.name}`}
                  className="relative h-0.75 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: i === current ? "2rem" : "0.75rem" }}
                >
                  <span className="absolute inset-0 bg-white/25" />
                  {i === current && (
                    <motion.span
                      key={`fill-mobile-${current}`}
                      className="absolute inset-0 bg-[#E3B15C] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop category name + indicators: bottom-right corner */}
      <div className="hidden md:flex absolute bottom-8 right-8 z-10 items-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <Link
              href={`/products/${heroSlides[current].slug}`}
              className="font-display font-bold text-sm text-white hover:text-[#E3B15C] transition-colors duration-200"
            >
              {heroSlides[current].name}
            </Link>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.slug}
              onClick={() => goTo(i)}
              aria-label={`Show ${slide.name}`}
              className="relative h-0.75 rounded-full overflow-hidden transition-all duration-300"
              style={{ width: i === current ? "2rem" : "0.75rem" }}
            >
              <span className="absolute inset-0 bg-white/25" />
              {i === current && (
                <motion.span
                  key={`fill-desktop-${current}`}
                  className="absolute inset-0 bg-[#E3B15C] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
