"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO, CAROUSEL_SPRING, VIEWPORT_ONCE } from "@/lib/motion";
import { products, type Product } from "@/data/products";
import ProductMedia from "@/components/products/ProductMedia";
import DiagonalArrowIcon from "@/components/shared/icons/DiagonalArrowIcon";

// The home carousel only shows categories with photography;
// the full catalog (including made-to-order ones) lives at /products.
const carouselProducts = products.filter(
  (p): p is Product & { image: string } => Boolean(p.image)
);

const CARD_WIDTH = 340;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;
const IMAGE_HEIGHT = 300;

function getTargetX(index: number) {
  if (typeof window === "undefined") return 0;
  const maxWidth = 88 * 16;
  const sidePadding = window.innerWidth >= 1280 ? 64 : window.innerWidth >= 768 ? 40 : 24;
  const containerLeft = Math.max(0, (window.innerWidth - maxWidth) / 2) + sidePadding;
  const centeredX = window.innerWidth / 2 - CARD_WIDTH / 2 - index * STEP;
  return Math.min(centeredX, containerLeft);
}

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      animate(x, getTargetX(current), CAROUSEL_SPRING);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [current, x]);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(carouselProducts.length - 1, index)));
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

    const clamped = Math.max(0, Math.min(carouselProducts.length - 1, next));

    animate(x, getTargetX(clamped), CAROUSEL_SPRING);

    setCurrent(clamped);
    setTimeout(() => { isDragging.current = false; }, 50);
  };

  return (
    <section className="section-pad section-pad-top-tight section-pad-bottom-tight overflow-hidden">

      <div className="container-wide mb-16 md:mb-20">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Heading */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              className="section-label"
            >
              Best sellers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
              className="section-heading-lg text-center"
            >
              Just Buy <span className="text-accent">Once,</span><br />
              <span className="whitespace-nowrap">
                You Will Keep <span className="text-accent">Repeating.</span>
              </span>
            </motion.h2>
          </div>

          {/* Description + nav */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-body text-text-secondary leading-relaxed max-w-xs text-sm text-center">
              The categories our clients order most, and reorder
              most often.
            </p>
          </div>

        </div>
      </div>

      {/* Track */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex"
          style={{ gap: GAP, width: carouselProducts.length * STEP, x }}
          drag="x"
          dragElastic={0.1}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
        >
          {carouselProducts.map((product, i) => {
            const isActive = i === current;
            return (
              <motion.div
                key={product.id}
                animate={{ scale: isActive ? 1 : 0.99, opacity: isActive ? 1 : 0.99 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                className="rounded-2xl overflow-hidden shrink-0"
                style={{ width: CARD_WIDTH, background: product.color }}
                onClick={() => { if (!isDragging.current) goTo(i); }}
              >
                {/* Image */}
                <div className="p-4 pb-0">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={e => { if (isDragging.current) e.preventDefault(); }}
                    aria-label={`View ${product.name}`}
                    className="group/img relative block overflow-hidden rounded-xl"
                    style={{ height: IMAGE_HEIGHT }}
                  >
                    <ProductMedia
                      product={product}
                      sizes={`${CARD_WIDTH}px`}
                      className="pointer-events-none group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/1 to-transparent" />
                    <span
                      aria-hidden="true"
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90
                                 backdrop-blur-sm flex items-center justify-center
                                 group-hover/img:bg-accent group-hover/img:text-white
                                 transition-all duration-200 shadow-sm"
                    >
                      <DiagonalArrowIcon size={12} />
                    </span>
                  </Link>
                </div>

                {/* Text panel */}
                <div className="p-5 text-center">
                  <h3 className="font-display font-bold text-lg text-text-primary mb-1.5">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {product.desc}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll to explore: touch devices (phones + tablets), just below the category images */}
      <div className="container-wide mt-5 flex xl:hidden justify-center items-center gap-2">
        <div className="w-8 h-5 rounded-full border border-border flex items-center justify-start pl-1.5">
          <motion.div
            animate={{ x: [0, 18, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1 rounded-full bg-text-faint"
          />
        </div>
        <span className="font-body text-xs text-text-secondary">Scroll to explore</span>
      </div>

      {/* Arrow nav: centred below the carousel, desktop only (touch devices swipe) */}
      <div className="container-wide mt-5 hidden xl:flex justify-center items-center gap-4">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Previous product"
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
          disabled={current === carouselProducts.length - 1}
          aria-label="Next product"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                     text-text-secondary hover:border-text-primary hover:text-text-primary
                     disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Animated Counter */}
      <div className="container-wide mt-4 flex justify-center">
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
          <span>{String(carouselProducts.length).padStart(2, "0")}</span>
        </div>
      </div>

    </section>
  );
}