"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO, CAROUSEL_SPRING, VIEWPORT_ONCE } from "@/lib/motion";
import { testimonials } from "@/data/testimonials";

const MAX_CARD_WIDTH = 380;
const GAP = 24;
// How much of the next card peeks in at the right edge — a visible hint
// that the strip is swipeable. Matters most on mobile, where a fixed
// MAX_CARD_WIDTH card would otherwise fill (or overflow) the viewport
// with no neighbor in sight.
const PEEK = 56;

function getSidePadding() {
  if (typeof window === "undefined") return 24;
  return window.innerWidth >= 1280 ? 64 : window.innerWidth >= 768 ? 40 : 24;
}

function getCardWidth() {
  if (typeof window === "undefined") return MAX_CARD_WIDTH;
  const available = window.innerWidth - getSidePadding() - PEEK;
  return Math.min(MAX_CARD_WIDTH, Math.max(240, available));
}

function getTargetX(index: number, cardWidth: number) {
  if (typeof window === "undefined") return 0;
  const maxWidth = 88 * 16;
  const sidePadding = getSidePadding();
  const containerLeft = Math.max(0, (window.innerWidth - maxWidth) / 2) + sidePadding;
  const step = cardWidth + GAP;
  const centeredX = window.innerWidth / 2 - cardWidth / 2 - index * step;
  return Math.min(centeredX, containerLeft);
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(MAX_CARD_WIDTH);
  const isDragging = useRef(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const w = getCardWidth();
      setCardWidth(w);
      animate(x, getTargetX(current, w), CAROUSEL_SPRING);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [current, x]);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(testimonials.length - 1, index)));
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const next =
      info.offset.x < -50 || info.velocity.x < -300
        ? current + 1
        : info.offset.x > 50 || info.velocity.x > 300
        ? current - 1
        : current;

    const clamped = Math.max(0, Math.min(testimonials.length - 1, next));

    animate(x, getTargetX(clamped, cardWidth), CAROUSEL_SPRING);

    setCurrent(clamped);
    setTimeout(() => { isDragging.current = false; }, 50);
  };

  return (
    <section className="section-pad section-pad-md bg-surface overflow-hidden">
      <div className="container-wide mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              className="section-label"
            >
              What clients say
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="section-heading-md"
            >
              Trusted by the people <br />
              <span className="text-accent">who buy in bulk.</span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                         text-text-secondary hover:border-text-primary hover:text-text-primary
                         disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M7.5 2l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={current === testimonials.length - 1}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                         text-text-secondary hover:border-text-primary hover:text-text-primary
                         disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex"
          style={{ gap: GAP, width: testimonials.length * (cardWidth + GAP), x }}
          drag="x"
          dragElastic={0.1}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((t, i) => {
            const isActive = i === current;
            return (
              <motion.figure
                key={t.quote}
                animate={{ scale: isActive ? 1 : 0.97, opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="bg-white rounded-2xl border border-border-strong p-8 flex flex-col justify-between gap-8 shrink-0"
                style={{ width: cardWidth }}
                onClick={() => { if (!isDragging.current) goTo(i); }}
              >
                <blockquote className="font-body text-text-primary leading-relaxed">
                  <span className="block font-display font-bold text-4xl text-accent leading-none mb-4" aria-hidden="true">
                    &ldquo;
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption>
                  <div className="font-display font-bold text-sm text-text-primary">
                    {t.name}
                  </div>
                  <div className="font-body text-xs text-text-faint mt-1">
                    {t.company} · {t.location}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      <div className="container-wide mt-8">
        <div className="flex items-center gap-1.5 font-body text-sm text-text-faint tabular-nums">
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            >
              {String(current + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span>/</span>
          <span>{String(testimonials.length).padStart(2, "0")}</span>
        </div>
      </div>

    </section>
  );
}
