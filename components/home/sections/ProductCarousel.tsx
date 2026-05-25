"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";

// ─── Carousel sizing ───────────────────────────────────────
// Change these to resize cards
const CARD_WIDTH = 340;  // card width in px
const GAP = 20;          // gap between cards in px
const STEP = CARD_WIDTH + GAP;
const IMAGE_HEIGHT = 300; // product image height in px

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(products.length - 1, index)));
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    if (info.offset.x < -50 || info.velocity.x < -300) goTo(current + 1);
    else if (info.offset.x > 50 || info.velocity.x > 300) goTo(current - 1);
    setTimeout(() => { isDragging.current = false; }, 50);
  };

  return (
    <section className="border-t border-[#E0E0E0] section-pad overflow-hidden">

      {/* Header */}
      <div className="container-wide mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="section-label"
            >
              What we make
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="section-heading-lg"
            >
              Multiple product<br />
              <span className="text-[#0057FF]">categories.</span><br />
              Endless applications.
            </motion.h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-body text-[#6E6E73] leading-relaxed max-w-xs text-sm">
              From a single brochure holder to a full motorised signage network,
              we manufacture it all.
            </p>
            <div className="flex items-center gap-5">

              {/* Prev */}
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center
                           text-[#6E6E73] hover:border-[#AEAEB2] hover:text-[#1A1A1A] hover:bg-[#F9F9FB]
                           disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={() => goTo(current + 1)}
                disabled={current === products.length - 1}
                className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center
                           text-[#6E6E73] hover:border-[#AEAEB2] hover:text-[#1A1A1A] hover:bg-[#F9F9FB]
                           disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <Link href="/products" className="btn-text group">
                View all
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                >
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Track */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex"
          style={{ gap: GAP, width: products.length * STEP }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
          animate={{
            x: typeof window !== "undefined"
              ? window.innerWidth / 2 - CARD_WIDTH / 2 - current * STEP
              : 0,
          }}
          transition={{ type: "spring", stiffness: 110, damping: 22, mass: 1.9 }}
        >
          {products.map((product, i) => {
            const isActive = i === current;
            return (
              <motion.div
                key={product.id}
                animate={{ scale: isActive ? 1 : 0.91, opacity: isActive ? 1 : 0.55 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] flex-shrink-0"
                style={{ width: CARD_WIDTH, background: product.color }}
                onClick={() => { if (!isDragging.current) goTo(i); }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: IMAGE_HEIGHT }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.99) saturate(1.02)", pointerEvents: "none" }}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-5 font-display font-bold text-3xl text-white/90 drop-shadow-sm">
                    {product.id}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={e => { if (isDragging.current) e.preventDefault(); }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90
                               backdrop-blur-sm flex items-center justify-center
                               hover:bg-[#0057FF] hover:text-white
                               transition-colors duration-200 shadow-sm"
                  >
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Text */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-[#1A1A1A] mb-1.5">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-[#6E6E73] leading-relaxed line-clamp-2">
                    {product.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dots + counter */}
      <div className="container-wide mt-8 flex items-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-[#0057FF]"
                : "w-2 h-2 bg-[#E0E0E0] hover:bg-[#AEAEB2]"
            }`}
          />
        ))}
        <span className="ml-auto font-body text-xs text-[#AEAEB2] tabular-nums">
          {current + 1} / {products.length}
        </span>
      </div>

    </section>
  );
}