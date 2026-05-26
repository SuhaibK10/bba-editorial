"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute top-1/4 right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #0057FF 0%, transparent 65%)" }}
        />
      </div>

      <div className="container-wide flex flex-col gap-8">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1.5px] bg-[#1b6b6b]" />
            <span className="section-label" style={{ marginBottom: 0 }}>
              Est. 1991 · New Delhi, India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-[clamp(2.75rem,8.5vw,8rem)]
                       text-[#1A1A1A] leading-[1.0] tracking-tight mb-8"
          >
            India&apos;s most trusted<br />
            <span className="text-accent">acrylic manufacturer.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg text-[#6E6E73] max-w-xl leading-relaxed mb-10"
          >
            Acrylic fabrication and blow-moulded displays for every industry.
            Built to last, designed to perform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-5 flex-wrap mb-6"
          >
            <Link href="/quote" className="btn-primary ">
              Get a Quote
            </Link>
            <Link href="/products" className="btn-text group">
              Browse products
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
              >
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-2 mt-10"
        >
          <div className="w-5 h-8 rounded-full border border-[#E0E0E0] flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-[#AEAEB2]"
            />
          </div>
          <span className="font-body text-xs text-[#AEAEB2]">Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
}