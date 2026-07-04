"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";

export default function AddToQuoteButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const alreadyInCart = items.some((i) => i.productSlug === slug);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleClick = () => {
    addItem({ productSlug: slug, name });
    setJustAdded(true);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={alreadyInCart}
        className="btn-primary disabled:opacity-60"
      >
        {justAdded || alreadyInCart ? (
          <>
            Added
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        ) : (
          "Add to Quote"
        )}
      </button>

      {items.length > 0 && (
        <Link href="/quote" className="btn-text group">
          Review quote list ({items.length})
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"
            className="group-hover:translate-x-1 transition-transform duration-200">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      )}
    </div>
  );
}
