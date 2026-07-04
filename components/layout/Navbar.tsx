"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { site, whatsappUrl } from "@/data/site";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close the mobile menu when navigation changes the route
  // (derived state during render, per react-hooks/set-state-in-effect)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-3 md:top-4 inset-x-0 z-50 px-3 md:px-6">
        <div className="relative mx-auto max-w-5xl">
        <div
          className="flex items-center justify-between
                     h-14 rounded-full pl-3 pr-2 md:pl-5 md:pr-2
                     border backdrop-blur-md bg-[#0F3634]/95 border-white/10 shadow-card"
        >

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="B & B Appliances">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center
                              group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-display font-bold text-sm leading-none">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-sm tracking-tight text-white">
                  B & B Appliances
                </span>
                <span className="text-[10px] font-body tracking-wide text-white/60">
                  Since 1991
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative font-body text-sm font-medium
                    transition-colors duration-200
                    after:absolute after:bottom-[-3px] after:left-0 after:h-[1.5px]
                    after:bg-[#5FBDBB] after:transition-all after:duration-300
                    ${pathname === link.href
                      ? "text-white after:w-full"
                      : "text-white/70 hover:text-white after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">

              {/* Navbar CTA: uses btn-primary, slightly smaller via style override */}
              <Link
                href="/quote"
                className="hidden md:inline-flex btn-primary"
                style={{ height: "40px", fontSize: "0.875rem", padding: "0 1.25rem", borderRadius: "9999px" }}
              >
                Get a Quote
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.25 w-10 h-10 items-center justify-center
                           rounded-full transition-colors duration-200 hover:bg-white/10"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span
                  className={`block w-5 h-[1.5px] origin-center transition-transform duration-300
                              bg-white`}
                  style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
                />
                <span
                  className={`block w-5 h-[1.5px] origin-center transition-all duration-200
                              bg-white`}
                  style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "translateX(-8px)" : "none" }}
                />
                <span
                  className={`block w-5 h-[1.5px] origin-center transition-transform duration-300
                              bg-white`}
                  style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
                />
              </button>
            </div>

        </div>

        {/* Scroll progress: thin track attached to the pill's bottom edge */}
        <div className="absolute left-6 right-6 md:left-8 md:right-8 top-full h-0.5 rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full origin-left bg-[#E3B15C]"
            style={{ scaleX }}
          />
        </div>

        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20"
          >
            <nav className="flex-1 flex flex-col justify-start pt-8 px-8 gap-1">
              {[{ label: "Home", href: "/" }, ...navLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 border-b border-border"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="font-display font-bold text-3xl text-text-primary
                                     hover:text-accent transition-colors duration-200">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-8 pb-20 flex flex-col gap-3"
            >
              <Link
                href="/quote"
                onClick={() => setMenuOpen(false)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}