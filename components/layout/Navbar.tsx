"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import HeartIcon from "@/components/shared/icons/HeartIcon";
import MenuOverlay from "@/components/layout/MenuOverlay";
import SearchBar from "@/components/layout/SearchBar";
import CategoryDropdown from "@/components/layout/CategoryDropdown";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "B2B Enquiry", href: "/b2b-enquiry" },
];

// Products is covered by the Categories dropdown on desktop. Links are
// split across both sides of the centered logo — About/Contact/B2B Enquiry
// sit on the right (near search/wishlist) rather than piling every plain
// link on the left.
const leftNavLinks = navLinks.filter((l) => l.label === "Industries");
const rightNavLinks = navLinks.filter(
  (l) => l.label === "About" || l.label === "Contact" || l.label === "B2B Enquiry"
);
// Reveal at xl (1280px), not md — below that, Home + Categories + the plain
// links + the B2B CTA don't fit the pill (capped at max-w-5xl) without
// colliding with the centered logo. The hamburger covers everything below xl.
const linkClass =
  "hidden xl:flex items-center h-9 px-3 rounded-full font-body text-sm font-medium " +
  "text-text-primary hover:text-accent transition-colors duration-200";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);
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
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-3 md:top-4 inset-x-0 z-50 px-3 md:px-6">
        <div className="relative mx-auto max-w-5xl">
        <div
          className="relative flex items-center justify-between
                     h-14 rounded-full px-2 md:px-3
                     border backdrop-blur-md bg-surface/95 border-border shadow-card"
        >

            {/* Left: hamburger (mobile only) + categories dropdown & inline links (desktop) */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative flex xl:hidden w-10 h-10 items-center justify-center
                           rounded-full transition-colors duration-200 hover:bg-surface text-text-primary"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <Link href="/" className={linkClass}>
                Home
              </Link>

              <CategoryDropdown />

              {leftNavLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo: absolutely centered so left/right group widths don't shift it */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5 group"
              aria-label="B & B Appliances"
            >
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center
                              group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-display font-bold text-sm leading-none">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-sm tracking-tight text-text-primary whitespace-nowrap">
                  B & B Appliances
                </span>
                <span className="text-[10px] font-body tracking-wide text-text-faint">
                  Since 1991
                </span>
              </div>
            </Link>

            {/* Right: About/Contact/B2B Enquiry (desktop) + search + wishlist */}
            <div className="flex items-center gap-1">

              {rightNavLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-0.5">
                <SearchBar />

                <Link
                  href="/wishlist"
                  aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount} items` : "Wishlist"}
                  className="relative w-9 h-9 flex items-center justify-center rounded-full
                             text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <HeartIcon size={19} />
                  {wishlistCount > 0 && (
                    <span
                      className="absolute top-0.5 right-0.5 min-w-3.75 h-3.75 px-0.75 rounded-full
                                 bg-accent text-white text-[9px] font-bold flex items-center justify-center
                                 tabular-nums"
                      aria-hidden="true"
                    >
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

        </div>

        {/* Scroll progress: thin track attached to the pill's bottom edge */}
        <div className="absolute left-6 right-6 md:left-8 md:right-8 top-full h-0.5 rounded-full bg-black/10 overflow-hidden">
          <motion.div
            className="h-full origin-left bg-accent"
            style={{ scaleX }}
          />
        </div>

        </div>
      </header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}