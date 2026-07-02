"use client";

import { motion } from "framer-motion";
import { trustBadges } from "@/data/testimonials";

export default function TrustBadges() {
  return (
    <section className="border-y border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 px-2 lg:px-6 lg:border-l lg:first:border-l-0 border-border"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-accent shrink-0">
                  <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="font-display font-bold text-sm text-text-primary">
                  {badge.title}
                </h3>
              </div>
              <p className="font-body text-xs text-text-secondary leading-relaxed pl-[22px]">
                {badge.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
