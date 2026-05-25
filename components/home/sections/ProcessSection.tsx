"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/products";

export default function ProcessSection() {
  return (
    <section className="section-pad bg-[#1A1A1A]">
      <div className="container-wide">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="section-label"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          The process
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-heading-md mb-16"
          style={{ color: "white" }}
        >
          Simple. Fast. Reliable.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {processSteps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/10 pt-8 pb-8 md:pr-8"
            >
              <div className="process-step-number">{item.step}</div>
              <h3 className="process-step-title">{item.title}</h3>
              <p className="process-step-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}