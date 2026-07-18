"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductMedia from "@/components/products/ProductMedia";
import DiagonalArrowIcon from "@/components/shared/icons/DiagonalArrowIcon";
import CheckIcon from "@/components/shared/icons/CheckIcon";
import WishlistHeartButton from "@/components/wishlist/WishlistHeartButton";
import { useCommerceCartStore } from "@/lib/commerce-cart-store";
import { formatPrice } from "@/lib/pricing";
import type { CatalogItem } from "@/data/catalog";

// Item-level tile used on the shop grid, category pages, item detail
// "More from this range" strips, and the wishlist. Buyable directly from
// here — price + Add to Cart — not just a link through to the PDP.
export default function CatalogItemCard({
  item,
  color,
  sizes,
  showDescription = true,
}: {
  item: CatalogItem;
  color: string;
  sizes: string;
  showDescription?: boolean;
}) {
  const href = `/products/${item.categorySlug}/${item.slug}`;
  const outOfStock = item.stock === "out-of-stock";

  const addToCart = useCommerceCartStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addToCart(item.slug, qty);
    setJustAdded(true);
  };

  const decreaseQty = (e: React.MouseEvent) => {
    e.preventDefault();
    setQty((q) => Math.max(1, q - 1));
  };

  const increaseQty = (e: React.MouseEvent) => {
    e.preventDefault();
    setQty((q) => q + 1);
  };

  return (
    <div className="group relative flex flex-col">
      <WishlistHeartButton
        slug={item.slug}
        name={item.name}
        size={15}
        className="absolute top-1.5 right-1.5 z-20 w-8 h-8 text-accent hover:text-accent-hover"
      />

      <Link
        href={href}
        className="relative block overflow-hidden rounded-xl aspect-3/4 mb-3 border border-border"
        style={{ background: color }}
      >
        <ProductMedia
          product={item}
          sizes={sizes}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        {outOfStock && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-white/90 px-2.5 py-1 font-body text-[10px] uppercase tracking-wider text-text-secondary">
            Out of Stock
          </span>
        )}

        {/* Quick-view overlay, slides up on hover */}
        <div
          className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0
                     transition-transform duration-300 bg-accent/90 backdrop-blur-sm py-2.5
                     flex items-center justify-center gap-2"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.12em] text-white">
            View Product
          </span>
          <DiagonalArrowIcon size={11} className="text-white" />
        </div>
      </Link>

      <p className="font-body text-[11px] uppercase tracking-[0.12em] text-text-faint mb-1">
        {item.sku}
      </p>
      <Link href={href}>
        <h3 className="font-display font-bold text-base text-text-primary hover:text-accent transition-colors duration-200">
          {item.name}
        </h3>
      </Link>
      {showDescription && (
        <p className="font-body text-sm text-text-secondary leading-relaxed mt-1 mb-2">
          {item.desc}
        </p>
      )}

      <div className="mt-auto pt-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display font-bold text-sm text-text-primary tabular-nums">
            {formatPrice(item.price)}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={decreaseQty}
              disabled={outOfStock}
              aria-label={`Decrease quantity of ${item.name}`}
              className="w-6 h-6 rounded-md border border-border flex items-center justify-center
                         text-text-secondary hover:border-text-primary hover:text-text-primary
                         disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
            >
              −
            </button>
            <span className="w-4 text-center font-body text-xs text-text-primary tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={increaseQty}
              disabled={outOfStock}
              aria-label={`Increase quantity of ${item.name}`}
              className="w-6 h-6 rounded-md border border-border flex items-center justify-center
                         text-text-secondary hover:border-text-primary hover:text-text-primary
                         disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="inline-flex items-center justify-center gap-1.5 h-8 px-3.5 rounded-full bg-accent text-white
                     font-body text-xs font-semibold whitespace-nowrap w-full
                     hover:bg-accent-hover transition-colors duration-200
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent"
        >
          {justAdded ? (
            <>
              Added
              <CheckIcon size={12} />
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
