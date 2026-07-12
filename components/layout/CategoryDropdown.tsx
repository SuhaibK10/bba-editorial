"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

// Desktop-only "Categories" trigger next to the hamburger; opens a
// two-column panel of every product category. Mobile gets the same list
// inside the hamburger overlay (see MenuOverlay) instead.
export default function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden xl:block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center h-9 px-3 rounded-full font-body text-sm font-medium
                   text-text-primary hover:text-accent transition-colors duration-200 whitespace-nowrap"
      >
        Categories
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+0.9rem)] left-0 w-[560px] rounded-2xl border border-border
                     bg-background shadow-card-hover p-3 z-50"
        >
          <div className="grid grid-cols-2">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg font-body text-sm text-text-secondary
                           hover:text-text-primary hover:bg-surface transition-colors duration-150"
              >
                {p.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-border mt-3 pt-3 px-4 pb-1">
            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="group inline-flex items-center gap-2 font-body text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
            >
              View all products
              <ArrowIcon size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
