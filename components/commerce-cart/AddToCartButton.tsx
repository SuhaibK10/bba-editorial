"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCommerceCartStore } from "@/lib/commerce-cart-store";
import { formatPrice } from "@/lib/pricing";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";

export default function AddToCartButton({
  slug,
  price,
  outOfStock = false,
}: {
  slug: string;
  price: number;
  outOfStock?: boolean;
}) {
  const items = useCommerceCartStore((s) => s.items);
  const addItem = useCommerceCartStore((s) => s.addItem);
  const alreadyInCart = useCommerceCartStore((s) => s.isInCart(slug));
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleClick = () => {
    addItem(slug);
    setJustAdded(true);
  };

  if (outOfStock) {
    return (
      <button type="button" disabled className="btn-primary opacity-40 cursor-not-allowed">
        Out of Stock
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <button type="button" onClick={handleClick} className="btn-primary">
        {justAdded ? (
          <>
            Added
            <CheckIcon size={14} />
          </>
        ) : (
          `Add to Cart · ${formatPrice(price)}`
        )}
      </button>

      {(alreadyInCart || items.length > 0) && (
        <Link href="/cart" className="btn-text group">
          View cart ({items.length})
          <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      )}
    </div>
  );
}
