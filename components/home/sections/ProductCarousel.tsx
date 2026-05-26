"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import { products } from "@/data/products";

const CARD_WIDTH = 340;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;
const IMAGE_HEIGHT = 300;

function getTargetX(index: number) {
  if (typeof window === "undefined") return 0;
  return window.innerWidth / 2 - CARD_WIDTH / 2 - index * STEP;
}

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      animate(x, getTargetX(current), {
        type: "spring",
        stiffness: 110,
        damping: 22,
        mass: 1.9,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [current, x]);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(products.length - 1, index)));
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

    const clamped = Math.max(0, Math.min(products.length - 1, next));

    animate(x, getTargetX(clamped), {
      type: "spring",
      stiffness: 110,
      damping: 22,
      mass: 1.9,
    });

    setCurrent(clamped);
    setTimeout(() => { isDragging.current = false; }, 50);
  };

  return (
    <section className="section-pad overflow-hidden">

      <div className="container-wide mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">

          {/* Left — heading */}
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
              Multiple<br />
              <span className="text-accent">Categories.</span><br />
              Endless <span className="text-accent">Applications.</span>
            </motion.h2>
          </div>

          {/* Right — description + nav */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-body text-[#6E6E73] leading-relaxed max-w-xs text-sm">
              From a single brochure holder to a full motorised signage network,
              we manufacture it all.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center
                           text-[#6E6E73] hover:border-[#1A1A1A] hover:text-[#1A1A1A]
                           disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => goTo(current + 1)}
                disabled={current === products.length - 1}
                className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center
                           text-[#6E6E73] hover:border-[#1A1A1A] hover:text-[#1A1A1A]
                           disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              

              <div className="flex items-center gap-2">
                <div className="w-8 h-5 rounded-full border border-[#E0E0E0] flex items-center justify-start pl-1.5">
                    <motion.div
                    animate={{ x: [0, 18, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1 rounded-full bg-[#AEAEB2]"
                    />
                </div>
                <span className="font-body text-xs text-[#AEAEB2]">Scroll to explore</span>
                </div>


            </div>
          </div>

        </div>
      </div>

      {/* Track */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex"
          style={{ gap: GAP, width: products.length * STEP, x }}
          drag="x"
          dragElastic={0.1}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
        >
          {products.map((product, i) => {
            const isActive = i === current;
            return (
              <motion.div
                key={product.id}
                animate={{ scale: isActive ? 1 : 0.93, opacity: isActive ? 1 : 0.45 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden flex-shrink-0"
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
                    style={{ pointerEvents: "none" }}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={e => { if (isDragging.current) e.preventDefault(); }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90
                               backdrop-blur-sm flex items-center justify-center
                               hover:bg-accent hover:text-white
                               transition-all duration-200 shadow-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Text panel */}
                <div className="p-5 text-center">
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

      {/* Counter */}
      <div className="container-wide mt-8">
        <span className="font-body text-sm text-[#AEAEB2] tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
        </span>
      </div>
      {/* CTAs */}
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
  className="flex items-center justify-center gap-5 flex-wrap mb-6"
>
  <Link href="/quote" className="btn-primary ">
    Get a Quote
  </Link>
  </motion.div>

    </section>
  );
}