"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { stats } from "@/data/home-content";

function StatItem({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !countRef.current) return;
    const el = countRef.current;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * value).toString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = value.toString();
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT_EXPO }}
      className="flex flex-col items-center text-center gap-2"
    >
      <div className="font-display font-bold text-5xl md:text-6xl text-text-primary tracking-tight leading-none">
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </div>
      <div className="section-label" style={{ marginBottom: 0 }}>{label}</div>
    </motion.div>
  );
}

export default function TrustBar() {
  return (
    <section className="trustbar border-y border-border py-16 bg-surface">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}