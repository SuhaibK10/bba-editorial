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
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Homepage hero is a full-bleed photo — use light text while over it
  const overHero = pathname === "/" && !scrolled && !menuOpen;

  return (
    <>
      <header
      
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
            ${scrolled || menuOpen
            ? "bg-white/95 backdrop-blur-md shadow-nav border-b border-[#F0F0F0]"
            : "bg-transparent"
          }
        `}
        > 
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-accent"
          style={{ scaleX }}
            />
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="B & B Appliances">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center
                              group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-display font-bold text-sm leading-none">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-display font-bold text-sm tracking-tight transition-colors duration-300
                                  ${overHero ? "text-white" : "text-text-primary"}`}>
                  B & B Appliances
                </span>
                <span className={`text-[10px] font-body tracking-wide transition-colors duration-300
                                  ${overHero ? "text-white/60" : "text-text-faint"}`}>
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
                    after:bg-accent after:transition-all after:duration-300
                    ${pathname === link.href
                      ? overHero ? "text-white after:w-full" : "text-accent after:w-full"
                      : overHero
                        ? "text-white/75 hover:text-white after:w-0 hover:after:w-full"
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

              {/* Navbar CTA — uses btn-primary, slightly smaller via style override */}
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
                className={`md:hidden flex flex-col gap-1.25 w-10 h-10 items-center justify-center
                           rounded-lg transition-colors duration-200
                           ${overHero
                             ? "bg-black/25 backdrop-blur-sm hover:bg-black/35"
                             : "hover:bg-surface"}`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span
                  className={`block w-5 h-[1.5px] origin-center transition-transform duration-300
                              ${overHero ? "bg-white" : "bg-text-primary"}`}
                  style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
                />
                <span
                  className={`block w-5 h-[1.5px] origin-center transition-all duration-200
                              ${overHero ? "bg-white" : "bg-text-primary"}`}
                  style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "translateX(-8px)" : "none" }}
                />
                <span
                  className={`block w-5 h-[1.5px] origin-center transition-transform duration-300
                              ${overHero ? "bg-white" : "bg-text-primary"}`}
                  style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
                />
              </button>
            </div>

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
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            <div className="h-16" />
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
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
              className="px-8 pb-12 flex flex-col gap-3"
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