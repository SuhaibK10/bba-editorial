"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// The real purchase cart — distinct from lib/cart-store.ts (the RFQ
// quote-list, free-text quantities, no price concept). Deliberately
// minimal: no cached name/price here, always resolved live via
// getCatalogItem(slug) at render/checkout time, so a price edit in
// data/catalog.ts is reflected everywhere instantly.
export type CommerceCartItem = {
  slug: string;
  quantity: number;
};

type CommerceCartState = {
  items: CommerceCartItem[];
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (slug: string) => boolean;
};

export const useCommerceCartStore = create<CommerceCartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (slug, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...state.items, { slug, quantity }] };
        }),

      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),

      updateQuantity: (slug, quantity) => {
        if (quantity < 1) {
          get().removeItem(slug);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (slug) => get().items.some((i) => i.slug === slug),
    }),
    { name: "bba-checkout-cart" }
  )
);
