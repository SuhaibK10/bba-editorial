"use client";

import { useWishlistStore } from "@/lib/wishlist-store";
import HeartIcon from "@/components/shared/icons/HeartIcon";

// Save/unsave toggle shown next to "Add to Quote" on product pages.
export default function WishlistButton({ slug }: { slug: string }) {
  const saved = useWishlistStore((s) => s.slugs.includes(slug));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 h-10 px-4 rounded-full border font-body text-sm font-medium
                  transition-colors duration-200
                  ${saved
                    ? "border-accent text-accent"
                    : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
                  }`}
    >
      <HeartIcon size={15} filled={saved} />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
