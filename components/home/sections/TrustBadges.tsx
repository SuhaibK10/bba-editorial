"use client";

import { motion } from "framer-motion";
import { Truck, Factory, Clock, Wrench } from "lucide-react";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { trustBadges } from "@/data/testimonials";
import CheckIcon from "@/components/shared/icons/CheckIcon";

// Per-badge icons, keyed by the badge title in data/testimonials.ts.
// Falls back to the generic check if a new badge is added without one.
const badgeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Pan-India Delivery": Truck,
  "Factory-Direct Pricing": Factory,
  "24-Hour Quotes": Clock,
  "In-House Fabrication": Wrench,
};

export default function TrustBadges() {
  return (
    <section className="border-y border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((badge, i) => {
            const Icon = badgeIcons[badge.title] ?? CheckIcon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT_EXPO }}
                className="py-8 px-2 lg:px-6 lg:border-l lg:first:border-l-0 border-border"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Icon size={19} className="text-accent shrink-0" />
                  <h3 className="font-display font-bold text-base text-text-primary">
                    {badge.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed pl-7.25">
                  {badge.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
