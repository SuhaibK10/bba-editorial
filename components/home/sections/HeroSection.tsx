"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/products";

const SLIDE_MS = 5000;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(
      () => setActive((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section
      id="hero-section"
      className="relative min-h-svh flex items-end overflow-hidden bg-[#101314] pb-12 md:pb-16"
    >
      {/* Rotating category imagery — crossfade + slow Ken Burns zoom */}
      {heroSlides.map((slide, i) => (
        <motion.div
          key={slide.slug}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === active ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ zIndex: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: i === active ? 1.08 : 1 }}
            transition={
              i === active
                ? { duration: SLIDE_MS / 1000 + 1.5, ease: "linear" }
                : { duration: 0 }
            }
          >
            <Image
              src={slide.image}
              alt={slide.name}
              fill
              preload={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Legibility gradients — bottom-heavy for the text, light top for the navbar */}
      <div className="absolute inset-0 z-2 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-40 z-2 bg-linear-to-b from-black/50 to-transparent" />

      {/* Bottom-left text overlay */}
      <div className="container-wide relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[1.5px] bg-[#5FBDBB]" />
            <span className="font-body text-xs text-white/60 uppercase tracking-widest">
              Est. 1991 · New Delhi, India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
            className="font-display font-bold text-[clamp(1.75rem,7vw,4.5rem)]
                       text-white leading-[1.05] tracking-tight mb-6"
          >
            India&apos;s most trusted
            <br />
            acrylic manufacturer.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: easeOutExpo }}
            className="font-body text-base md:text-lg text-white/70 max-w-xl leading-relaxed mb-8"
          >
            Acrylic fabrication and blow-moulded displays for every industry.
            Built to last, designed to perform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: easeOutExpo }}
            className="flex flex-wrap gap-3"
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
        </div>

        {/* Slide label + progress indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 md:mt-12 flex items-center justify-between gap-6 flex-wrap"
        >
          <Link
            href={`/products/${heroSlides[active].slug}`}
            className="group flex items-baseline gap-3"
          >
            <span className="font-display text-xs text-white/40 tabular-nums">
              0{active + 1} / 0{heroSlides.length}
            </span>
            <span
              className="font-body text-sm text-white/80 group-hover:text-white
                         transition-colors duration-200"
            >
              {heroSlides[active].name}
              <span className="inline-block ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.slug}
                onClick={() => setActive(i)}
                aria-label={`Show ${slide.name}`}
                className="h-6 w-8 md:w-10 flex items-center"
              >
                <span className="block w-full h-0.5 rounded-full bg-white/25 overflow-hidden">
                  {i === active && (
                    <motion.span
                      className="block h-full bg-white"
                      style={{ transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
