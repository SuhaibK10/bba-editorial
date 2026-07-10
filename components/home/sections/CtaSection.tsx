"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappUrl } from "@/data/site";

export default function CtaSection() {
  return (
    <section className="section-pad section-pad-sm">
      <div className="container-wide">
        <div className="max-w-2xl">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="section-heading-lg mb-6"
          >
            Ready to build something{" "}
            <span className="text-accent">remarkable?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-text-secondary text-lg leading-relaxed mb-10"
          >
            Tell us what you need. We&apos;ll quote you within 24 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start gap-3"
          >
            <Link href="/quote" className="btn-primary">
              Request a Quote
              
            </Link>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
                style={{ height: '40px', fontSize: '0.875rem', padding: '0 1.25rem', borderRadius: '9999px' }}
            >
              <WhatsAppIcon size={15} />
              WhatsApp Us
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}