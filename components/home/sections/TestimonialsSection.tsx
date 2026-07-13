"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO, CAROUSEL_SPRING, VIEWPORT_ONCE } from "@/lib/motion";
import { testimonials } from "@/data/testimonials";

const MAX_CARD_WIDTH = 380;
const GAP = 16;
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
                className="bg-white rounded-2xl border-[1.5px] border-text-primary p-8 flex flex-col justify-between gap-8 shrink-0"
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
                    {t.role}, {t.company} · {t.location}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>
      </div>

      <div className="container-wide mt-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          {testimonials.map((t, i) => (
            <button
              key={t.quote}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === current}
              className={`h-1.5 rounded-full transition-all duration-300
                          ${i === current ? "w-6 bg-accent" : "w-1.5 bg-border-strong hover:bg-text-faint"}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 font-body text-sm text-text-faint tabular-nums">
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
