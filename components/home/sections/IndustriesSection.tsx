"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { industries } from "@/data/products";

export default function IndustriesSection() {
  return (
    <section className="section-pad border-t border-[#E0E0E0]">
      <div className="container-wide">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="section-label"
            >
              Where we work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="section-heading-md"
            >
              Multiple industries.<br />One manufacturer.
            </motion.h2>
          </div>

          <Link href="/industries" className="btn-text group">
            View all industries
            <svg
              width="14" height="14" viewBox="0 0 12 12" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap gap-3">
          {industries.map((ind, i) => (
            <motion.div
              key={ind}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/industries" className="industry-pill">{ind}</Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}