"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { useWishlistStore } from "@/lib/wishlist-store";
import HeartIcon from "@/components/shared/icons/HeartIcon";
import MenuOverlay from "@/components/layout/MenuOverlay";
import SearchBar from "@/components/layout/SearchBar";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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

            {/* Hamburger: opens the full-screen menu on every viewport */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.25 w-10 h-10 items-center justify-center
                         rounded-full transition-colors duration-200 hover:bg-surface"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-[1.5px] origin-center transition-transform duration-300
                            bg-text-primary`}
                style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
              />
              <span
                className={`block w-5 h-[1.5px] origin-center transition-all duration-200
                            bg-text-primary`}
                style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "translateX(-8px)" : "none" }}
              />
              <span
                className={`block w-5 h-[1.5px] origin-center transition-transform duration-300
                            bg-text-primary`}
                style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
              />
            </button>

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

            {/* Right: search + wishlist */}
            <div className="flex items-center gap-1">

              <SearchBar />

              <Link
                href="/wishlist"
                aria-label={wishlistCount > 0 ? `Wishlist, ${wishlistCount} items` : "Wishlist"}
                className="relative w-9 h-9 flex items-center justify-center rounded-full
                           text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                <HeartIcon size={17} />
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