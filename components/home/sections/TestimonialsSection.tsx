"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="section-pad section-pad-md bg-surface">
      <div className="container-wide">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="section-label"
        >
          What clients say
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="section-heading-md mb-12"
        >
          Trusted by the people <br />
          <span className="text-accent">who buy in bulk.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.quote}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT_EXPO }}
              className="bg-white rounded-2xl p-8 flex flex-col justify-between gap-8"
            >
              <blockquote className="font-body text-text-primary leading-relaxed">
                <span className="block font-display font-bold text-4xl text-accent leading-none mb-4" aria-hidden="true">
                  &ldquo;
                </span>
                {t.quote}
              </blockquote>
              <figcaption>
                <div className="font-display font-bold text-sm text-text-primary">
                  {t.name}
                </div>
                <div className="font-body text-xs text-text-faint mt-1">
                  {t.company} · {t.location}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

      </div>
    </section>
  );
}
