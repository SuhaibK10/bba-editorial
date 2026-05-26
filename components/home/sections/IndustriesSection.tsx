"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { industries } from "@/data/products";

const VISIBLE = 6;

export default function IndustriesSection() {
  return (
    <section className="section-pad">
      <div className="container-wide">

        {/* Heading */}
        <div className="mb-12">
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

        {/* Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {industries.slice(0, VISIBLE).map((ind, i) => (
            <motion.div
              key={ind}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link href="/industries" className="industry-pill">{ind}</Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: VISIBLE * 0.04 }}
          >
            <Link
              href="/industries"
              className="industry-pill text-[#AEAEB2] border-dashed"
            >
              +{industries.length - VISIBLE} more
            </Link>
          </motion.div>
        </div>

        {/* Link below pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link href="/industries" className="btn-text group">
            View all industries
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}