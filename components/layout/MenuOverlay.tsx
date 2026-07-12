"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { products } from "@/data/products";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import ChevronIcon from "@/components/shared/icons/ChevronIcon";
import { site, whatsappUrl } from "@/data/site";

// Full-screen nav overlay, opened from the Navbar hamburger (shown below
// the xl breakpoint — the inline pill links only fit at xl and above).
// Distinct from MobileNav.tsx, the persistent mobile bottom tab bar.
export default function MenuOverlay({
  open,
  onClose,
  navLinks,
}: {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-40 bg-white flex flex-col pt-20"
        >
          <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto min-h-0 overflow-y-auto">
            <nav className="flex-1 flex flex-col justify-start pt-8 px-8 gap-1">
              {[{ label: "Home", href: "/" }, ...navLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: EASE_OUT_EXPO }}
                >
                  {link.label === "Products" ? (
                    <div className="border-b border-border">
                      <div className="flex items-center justify-between py-4">
                        <Link href={link.href} onClick={onClose}>
                          <span className="font-display font-bold text-3xl md:text-4xl text-text-primary
                                           hover:text-accent transition-colors duration-200">
                            {link.label}
                          </span>
                        </Link>
                        <button
                          onClick={() => setCategoriesOpen((v) => !v)}
                          aria-expanded={categoriesOpen}
                          aria-label={categoriesOpen ? "Hide categories" : "Show categories"}
                          className="w-10 h-10 rounded-full border border-border flex items-center justify-center
                                     text-text-secondary hover:border-text-primary hover:text-text-primary
                                     transition-colors duration-200"
                        >
                          <ChevronIcon
                            size={14}
                            className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                      {categoriesOpen && (
                        <div className="grid grid-cols-2 gap-x-6 pb-5">
                          {products.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/products/${p.slug}`}
                              onClick={onClose}
                              className="py-2 font-body text-sm text-text-secondary hover:text-accent
                                         transition-colors duration-150"
                            >
                              {p.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-4 border-b border-border"
                      onClick={onClose}
                    >
                      <span className="font-display font-bold text-3xl md:text-4xl text-text-primary
                                       hover:text-accent transition-colors duration-200">
                        {link.label}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.4, duration: 0.4, ease: EASE_OUT_EXPO }}
              className="px-8 pb-20 flex flex-col gap-3"
            >
              <Link
                href="/quote"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                Get a Quote
              </Link>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-center"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a>
              <p className="text-center text-text-faint text-xs font-body pt-1">
                {site.name} · {site.address.street}, {site.address.city}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
