"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Saved-for-later product slugs, persisted to localStorage.
// Deliberately separate from the quote cart (lib/cart-store.ts):
// the wishlist is browsing memory, the cart is purchase intent.
type WishlistState = {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      slugs: [],

      toggle: (slug) =>
        set((state) => ({
          slugs: state.slugs.includes(slug)
            ? state.slugs.filter((s) => s !== slug)
            : [...state.slugs, slug],
        })),

      has: (slug) => get().slugs.includes(slug),
    }),
    { name: "bba-wishlist" }
  )
);
