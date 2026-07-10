"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";

export default function AddToQuoteButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
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
            <CheckIcon size={14} />
          </>
        ) : (
          "Add to Quote"
        )}
      </button>

      {items.length > 0 && (
        <Link href="/quote" className="btn-text group">
          Review quote list ({items.length})
          <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      )}
    </div>
  );
}
