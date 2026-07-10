"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { trustBadges } from "@/data/testimonials";
import CheckIcon from "@/components/shared/icons/CheckIcon";

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
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT_EXPO }}
              className="py-8 px-2 lg:px-6 lg:border-l lg:first:border-l-0 border-border"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <CheckIcon size={14} className="text-accent shrink-0" />
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
