"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getProduct } from "@/data/products";
import { useWishlistStore } from "@/lib/wishlist-store";
import ProductCard from "@/components/products/ProductCard";
import HeartIcon from "@/components/shared/icons/HeartIcon";

export default function WishlistGrid() {
  const slugs = useWishlistStore((s) => s.slugs);
  const toggle = useWishlistStore((s) => s.toggle);

  // The persisted store only has real data on the client; render nothing on
  // the server pass so the empty state can't flash for users with saved items.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!hydrated) return null;

  const saved = slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
      {saved.map((product) => (
        <div key={product.id} className="relative">
          <ProductCard
            product={product}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <button
            type="button"
            onClick={() => toggle(product.slug)}
            aria-label={`Remove ${product.name} from wishlist`}
            className="absolute top-7 right-7 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm
                       shadow-sm flex items-center justify-center text-accent
                       hover:bg-accent hover:text-white transition-colors duration-200"
          >
            <HeartIcon size={16} filled />
          </button>
        </div>
      ))}
    </div>
  );
}
