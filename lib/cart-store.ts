"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  productSlug?: string;
  name: string;
  quantity: string;
  note?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: { productSlug?: string; name: string }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: string) => void;
  updateNote: (key: string, note: string) => void;
  clearCart: () => void;
  isInCart: (productSlug: string) => boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: ({ productSlug, name }) =>
        set((state) => {
          if (productSlug && state.items.some((i) => i.productSlug === productSlug)) {
            return state;
          }
          const key = productSlug ?? `custom-${Date.now()}`;
          return {
            items: [...state.items, { key, productSlug, name, quantity: "" }],
          };
        }),

      isInCart: (productSlug) =>
        get().items.some((i) => i.productSlug === productSlug),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),

      updateNote: (key, note) =>
        set((state) => ({
          items: state.items.map((i) => (i.key === key ? { ...i, note } : i)),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "bba-quote-cart" }
  )
);
