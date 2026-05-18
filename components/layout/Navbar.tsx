"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const topBarRef = useRef<HTMLSpanElement>(null);
  const midBarRef = useRef<HTMLSpanElement>(null);
  const botBarRef = useRef<HTMLSpanElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // GSAP hamburger animation
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(topBarRef.current, { rotate: 45, y: 7, duration: 0.3, ease: "power2.inOut" }, 0)
      .to(midBarRef.current, { opacity: 0, x: -10, duration: 0.2, ease: "power2.inOut" }, 0)
      .to(botBarRef.current, { rotate: -45, y: -7, duration: 0.3, ease: "power2.inOut" }, 0);

    if (menuOpen) tl.play();
    else tl.reverse();
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar ─────────────────────────────── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-400 ease-smooth
          ${scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-md shadow-nav"
            : "bg-transparent"
          }
        `}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="B & B Appliances Home"
            >
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center
                              group-hover:scale-105 transition-transform duration-250">
                <span className="text-white font-display font-bold text-sm leading-none">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-display font-bold text-sm tracking-tight
                  ${scrolled || menuOpen ? "text-text-primary" : "text-text-primary"}`}>
                  B & B Appliances
                </span>
                <span className="text-text-faint text-[10px] font-body tracking-wide">
                  Since 1991
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative font-body text-sm font-medium
                    transition-colors duration-250
                    after:absolute after:bottom-[-3px] after:left-0 after:h-[1.5px]
                    after:bg-accent after:transition-all after:duration-300 after:ease-out-expo
                    ${pathname === link.href
                      ? "text-accent after:w-full"
                      : "text-text-secondary hover:text-text-primary after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/quote"
                className="
                  hidden md:inline-flex items-center gap-2
                  bg-accent text-white font-body font-medium text-sm
                  px-5 py-2.5 rounded-full
                  hover:bg-accent-hover hover:shadow-accent
                  transition-all duration-250 ease-smooth
                  active:scale-95
                "
              >
                Get a Quote
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-[5px] w-10 h-10 items-center justify-center
                           rounded-lg hover:bg-surface transition-colors duration-200"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span ref={topBarRef} className="block w-5 h-[1.5px] bg-text-primary origin-center" />
                <span ref={midBarRef} className="block w-5 h-[1.5px] bg-text-primary origin-center" />
                <span ref={botBarRef} className="block w-5 h-[1.5px] bg-text-primary origin-center" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Full-screen overlay menu ────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            {/* Top spacer for navbar */}
            <div className="h-16" />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
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
                    <span className="font-display font-bold text-4xl text-text-primary
                                     hover:text-accent transition-colors duration-200">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-8 pb-12 flex flex-col gap-4"
            >
              <Link
                href="/quote"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2
                           bg-accent text-white font-body font-medium text-base
                           py-4 rounded-2xl hover:bg-accent-hover
                           transition-colors duration-250 active:scale-95"
              >
                Get a Quote
              </Link>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2
                           bg-surface text-text-primary font-body font-medium text-base
                           py-4 rounded-2xl hover:bg-surface-2
                           transition-colors duration-250"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <p className="text-center text-text-faint text-xs font-body">
                B & B Appliances · GT Karnal Road, New Delhi
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}