"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

export default function PageHeader({
  label,
  title,
  description,
  compact = false,
}: {
  label?: string;
  title: React.ReactNode;
  description?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`container-wide pb-12 md:pb-16 ${
        compact ? "pt-24 md:pt-28" : "pt-32 md:pt-40"
      }`}
    >
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-[1.5px] bg-accent" />
          <span className="section-label mb-0">{label}</span>
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
        className="section-heading-lg max-w-4xl"
      >
        {title}
      </motion.h1>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="font-body text-lg text-text-secondary max-w-xl leading-relaxed mt-6"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
