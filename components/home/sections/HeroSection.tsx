"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/data/hero-slides";
import { EASE_OUT_EXPO } from "@/lib/motion";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import HeroDots from "@/components/home/sections/HeroDots";

const SLIDE_MS = 4000;

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
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - (e.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(delta) < 40) return;
    const dir = delta > 0 ? 1 : -1;
    goTo((current + dir + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[current];
  if (!slide) return null;

  return (
    <section
      id="hero-section"
      className="relative h-[95svh] md:h-[95vh] flex flex-col justify-end overflow-hidden bg-hero-bg"
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
            src={slide.mobileImage ?? slide.desktopImage}
            alt={slide.name}
            fill
            preload={current === 0}
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src={slide.desktopImage}
            alt={slide.name}
            fill
            preload={current === 0}
            sizes="100vw"
            className="hidden md:block object-cover object-center"
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
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
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
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="flex flex-wrap gap-3 justify-center mb-4 md:mb-8"
          >
            <Link href="/quote" className="btn-primary">
              Get a Quote
              <ArrowIcon size={12} />
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
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              >
                <Link
                  href={`/products/${slide.slug}`}
                  className="font-display font-bold text-sm text-white hover:text-accent transition-colors duration-200"
                >
                  {slide.name}
                </Link>
              </motion.div>
            </AnimatePresence>
            <HeroDots
              slides={heroSlides}
              current={current}
              onSelect={goTo}
              slideMs={SLIDE_MS}
              className="flex items-center justify-center gap-2"
            />
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
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          >
            <Link
              href={`/products/${slide.slug}`}
              className="font-display font-bold text-sm text-white hover:text-accent transition-colors duration-200"
            >
              {slide.name}
            </Link>
          </motion.div>
        </AnimatePresence>
        <HeroDots
          slides={heroSlides}
          current={current}
          onSelect={goTo}
          slideMs={SLIDE_MS}
        />
      </div>
    </section>
  );
}
