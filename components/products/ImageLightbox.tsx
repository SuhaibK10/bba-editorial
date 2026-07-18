"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductMedia from "@/components/products/ProductMedia";
import type { ProductMedia as ProductMediaFields } from "@/data/products";

// Wraps the PDP media block: click the photo to open it full-size in an
// overlay. Only real static images are openable — video and the
// "Made to order" placeholder have nothing to zoom into.
export default function ImageLightbox({
  product,
  sizes,
}: {
  product: { name: string } & ProductMediaFields;
  sizes: string;
}) {
  const [open, setOpen] = useState(false);
  const canOpen = Boolean(product.image) && !product.video;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => canOpen && setOpen(true)}
        aria-label={canOpen ? `View full image of ${product.name}` : product.name}
        aria-hidden={!canOpen}
        tabIndex={canOpen ? 0 : -1}
        className={`group relative block w-full h-full ${canOpen ? "cursor-zoom-in" : "cursor-default"}`}
      >
        <ProductMedia product={product} sizes={sizes} priority />
        {canOpen && (
          <span
            className="absolute inset-0 flex items-center justify-center bg-black/0
                       group-hover:bg-black/20 transition-colors duration-200"
          >
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         rounded-full bg-white/90 backdrop-blur-sm px-4 py-2
                         font-body text-xs uppercase tracking-wider text-text-primary"
            >
              Click to enlarge
            </span>
          </span>
        )}
      </button>

      {open && canOpen && product.image && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name}, full image`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full
                       bg-white/10 hover:bg-white/20 flex items-center justify-center text-white
                       transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div
            className="relative w-full h-full max-w-4xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
              draggable={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
