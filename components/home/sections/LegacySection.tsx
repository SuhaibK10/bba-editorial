"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

export default function LegacySection() {
  return (
    <section className="section-pad-tight" style={{ background: "#2A2620" }}>
      <div className="container-wide text-center max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="font-body text-xs uppercase tracking-[0.12em] text-white/50 mb-4"
        >
          Since 1991
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="font-display font-bold text-4xl md:text-5xl text-white leading-tight mb-6"
        >
          Three Decades.<br />
          <span style={{ color: "#D4A574" }}>One Facility.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-white/70 leading-relaxed mb-4"
        >
          Every display we&apos;ve ever made has come out of the same GT Karnal
          Road facility we opened in 1991. No subcontracting, no
          white-labelling, just three decades of getting better at one craft.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/about" className="group inline-flex items-center gap-2 font-body font-medium text-white">
            Read our story
            <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
