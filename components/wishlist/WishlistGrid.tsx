"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";
import { getCatalogItem } from "@/data/catalog";
import { useWishlistStore } from "@/lib/wishlist-store";
import ProductCard from "@/components/products/ProductCard";
import CatalogItemCard from "@/components/products/CatalogItemCard";
import WishlistHeartButton from "@/components/wishlist/WishlistHeartButton";
import HeartIcon from "@/components/shared/icons/HeartIcon";

const cardSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

export default function WishlistGrid() {
  const slugs = useWishlistStore((s) => s.slugs);

  // The persisted store only has real data on the client; render nothing on
  // the server pass so the empty state can't flash for users with saved items.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!hydrated) return null;

  // A saved slug is either a category (products.ts) or a catalog item
  // (catalog.ts); resolve against both and drop anything stale.
  const saved = slugs
    .map((slug) => {
      const category = getProduct(slug);
      if (category) return { kind: "category" as const, category };
      const item = getCatalogItem(slug);
      if (item) return { kind: "item" as const, item };
      return null;
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-16 gap-4">
        <HeartIcon size={40} className="text-text-faint" />
        <p className="font-body text-text-secondary max-w-sm">
          Nothing saved yet. Tap the heart on any product to keep it here for later.
        </p>
        <Link href="/products" className="btn-primary mt-2">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {saved.map((entry) => {
        const slug = entry.kind === "category" ? entry.category.slug : entry.item.slug;
        const name = entry.kind === "category" ? entry.category.name : entry.item.name;
        return (
          <div key={slug} className="relative">
            {entry.kind === "category" ? (
              <>
                <ProductCard product={entry.category} sizes={cardSizes} />
                {/* ProductCard has no wishlist heart of its own (category
                    tiles aren't buyable items) — this is the only toggle
                    for that case. CatalogItemCard below has its own built
                    in, so this overlay would just duplicate it there. */}
                <WishlistHeartButton
                  slug={slug}
                  name={name}
                  size={16}
                  className="absolute top-7 right-7 w-9 h-9 text-accent hover:text-accent-hover"
                />
              </>
            ) : (
              <CatalogItemCard
                item={entry.item}
                color={getProduct(entry.item.categorySlug)?.color ?? "var(--color-surface-2)"}
                sizes={cardSizes}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
