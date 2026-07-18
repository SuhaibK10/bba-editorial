"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/lib/wishlist-store";
import HeartIcon from "@/components/shared/icons/HeartIcon";

const WISHLIST_RED = "#DC2626";

// Icon-only heart toggle shared by the shop grid card and the wishlist
// page's category-tile overlay. Turns solid red and fires a brief
// expanding-ring burst the moment an item is saved (not on unsave) —
// same "like" micro-interaction convention as Twitter/Instagram.
export default function WishlistHeartButton({
  slug,
  name,
  size = 15,
  className = "",
}: {
  slug: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const wished = useWishlistStore((s) => s.slugs.includes(slug));
  const toggle = useWishlistStore((s) => s.toggle);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(() => setBurst(false), 650);
    return () => clearTimeout(t);
  }, [burst]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const adding = !wished;
    toggle(slug);
    if (adding) setBurst(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={wished ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      aria-pressed={wished}
      className={`flex items-center justify-center transition-transform duration-150 active:scale-90 ${className}`}
    >
      <span className="relative block" style={{ color: wished ? WISHLIST_RED : undefined }}>
        <HeartIcon size={size} filled={wished} />
        {burst && (
          <motion.span
            className="absolute inset-0 -m-1.5 rounded-full pointer-events-none"
            style={{ border: `1.5px solid ${WISHLIST_RED}` }}
            initial={{ scale: 0.5, opacity: 0.9 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </span>
    </button>
  );
}
