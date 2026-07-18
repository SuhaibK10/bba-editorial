"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

export default function AboutSection() {
  return (
    <section className="section-pad section-pad-tight">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            className="section-label text-center"
          >
            Who we are
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE_OUT_EXPO }}
            className="font-display font-medium text-2xl md:text-3xl text-accent mb-10 text-center"
          >
            India&apos;s most trusted acrylic manufacturer.
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
            className="section-heading-md"
            style={{ marginBottom: '2.5rem' }}
          >
            B & B has been the{" "}
            <span className="text-accent">manufacturing backbone</span>
            {" "}of India.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <p className="font-body text-text-secondary leading-relaxed">
              From Airtel retail stores to pharmacy counters, from bank branches to FMCG shelves.
            </p>
            <p className="font-body text-text-secondary leading-relaxed">
              We specialise in acrylic fabrication and blow-moulded plastic displays,
              manufactured with 35 years of precision at our GT Karnal Road facility.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}