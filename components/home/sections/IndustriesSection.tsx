"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { industryList } from "@/data/industries";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

export default function IndustriesSection() {
  return (
    <section className="section-pad section-pad-top-tight">
      <div className="container-wide">

        {/* Heading */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            className="section-label"
          >
            Where we work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
            className="section-heading-md"
          >
            Multiple
            <span className="text-accent"> Industries.</span> <br/>
            One
              <span className="text-accent"> Manufacturer.</span><br />
          </motion.h2>
        </div>

        {/* Pills with icons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {industryList.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Link
                href="/industries"
                className="industry-pill flex items-center gap-2"
              >
                {ind.icon}
                {ind.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Link below pills */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
        >
          <Link href="/industries" className="btn-text group">
            View all industries
            <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
