"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappUrl } from "@/data/site";

// Fades in once the visitor scrolls past the hero (via IntersectionObserver
// on #hero-section) — appears immediately on pages with no hero. Hidden on
// /quote, which already has its own prominent WhatsApp submit button, and
// hidden behind the mobile menu via the `whatsapp-fixed` + `body.menu-open`
// CSS rule (see globals.css) rather than z-index.
export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const isHidden = pathname?.startsWith("/quote");

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) {
      // No hero on this page — defer to a microtask so this isn't a
      // synchronous setState call within the effect body (react-hooks/set-state-in-effect).
      queueMicrotask(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setVisible(!entry.isIntersecting || entry.intersectionRatio <= 0.2);
      },
      { threshold: 0.2 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  if (isHidden) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="whatsapp-btn"
          href={whatsappUrl("Hi, I'd like to talk about a display requirement.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="whatsapp-fixed fixed bottom-24 xl:bottom-6 right-4 xl:right-6 z-40 w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center"
          style={{ boxShadow: "0 0 0 2px var(--color-text-primary), 0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }}
        >
          <WhatsAppIcon size={28} color="white" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
