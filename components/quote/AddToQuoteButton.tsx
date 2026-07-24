"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";

export default function AddToQuoteButton({
  slug,
  name,
  variant = "primary",
}: {
  slug: string;
  name: string;
  // "secondary" for item pages that already have a real Add to Cart CTA —
  // Add to Quote is still available there, just not the loudest button.
  variant?: "primary" | "secondary";
}) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const alreadyInCart = useCartStore((s) => s.isInCart(slug));
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleClick = () => {
    addItem({ productSlug: slug, name });
    setJustAdded(true);
  };

  // Matches .btn-primary's exact box (h-10, rounded-full, same text size)
  // so it sits flush next to a real Add to Cart button on the same line,
  // instead of .btn-ghost's taller/wider default footprint.
  const secondaryClass =
    "inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full border border-border " +
    "bg-white text-text-primary text-sm font-semibold whitespace-nowrap " +
    "hover:border-text-primary transition-colors duration-200";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        disabled={alreadyInCart}
        className={`${variant === "secondary" ? secondaryClass : "btn-primary"} disabled:opacity-60`}
      >
        {justAdded || alreadyInCart ? (
          <>
            Added
            <CheckIcon size={14} />
          </>
        ) : (
          "Add to Quote"
        )}
      </button>

      {items.length > 0 && (
        <Link href="/cart" className="btn-text group">
          View cart ({items.length})
          <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      )}
    </div>
  );
}
