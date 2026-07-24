"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCartStore } from "@/lib/cart-store";
import { getProduct } from "@/data/products";
import { getCatalogItem } from "@/data/catalog";
import CartIcon from "@/components/shared/icons/CartIcon";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-body text-sm " +
  "text-text-primary placeholder:text-text-faint outline-none " +
  "focus:border-accent transition-colors duration-200";

// A cart row's slug is either a category (products.ts), a catalog item
// (catalog.ts), or a custom requirement with no slug at all.
function resolveEntry(productSlug?: string) {
  if (!productSlug) return { href: undefined, color: undefined, kicker: "Custom requirement" };
  const category = getProduct(productSlug);
  if (category) {
    return { href: `/products/${category.slug}`, color: category.color, kicker: "Category" };
  }
  const item = getCatalogItem(productSlug);
  if (item) {
    return {
      href: `/products/${item.categorySlug}/${item.slug}`,
      color: getProduct(item.categorySlug)?.color,
      kicker: item.sku,
    };
  }
  return { href: undefined, color: undefined, kicker: undefined };
}

export default function CartView() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const updateNote = useCartStore((s) => s.updateNote);
  const clearCart = useCartStore((s) => s.clearCart);

  // The persisted store only has real data on the client; render nothing on
  // the server pass so the empty state can't flash for users with saved items.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div>
        <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-6">
          Your Quote List
        </h2>
        <div className="flex flex-col items-center text-center py-16 gap-4">
          <CartIcon size={40} className="text-text-faint" />
          <p className="font-body text-text-secondary max-w-sm">
            Your quote list is empty. Add products you&apos;d like us to quote and they&apos;ll
            collect here.
          </p>
          <Link href="/products" className="btn-primary mt-2">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-6">
        Your Quote List
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-10 items-start">

      {/* Item rows */}
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const entry = resolveEntry(item.productSlug);
          return (
            <div key={item.key} className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className="w-10 h-10 rounded-xl shrink-0"
                    style={{ background: entry.color ?? "var(--color-surface-2)" }}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    {entry.kicker && (
                      <p className="font-body text-[11px] uppercase tracking-[0.12em] text-text-faint">
                        {entry.kicker}
                      </p>
                    )}
                    {entry.href ? (
                      <Link
                        href={entry.href}
                        className="font-display font-bold text-base text-text-primary
                                   hover:text-accent transition-colors duration-200 truncate block"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p className="font-display font-bold text-base text-text-primary truncate">
                        {item.name}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.key)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-text-faint
                             hover:bg-surface hover:text-text-primary transition-colors duration-200"
                >
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.key, e.target.value)}
                  className={inputClass}
                  placeholder="Approx. quantity"
                  aria-label={`Quantity for ${item.name}`}
                />
                <input
                  type="text"
                  value={item.note ?? ""}
                  onChange={(e) => updateNote(item.key, e.target.value)}
                  className={inputClass}
                  placeholder="Size, colour, branding…"
                  aria-label={`Notes for ${item.name}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <aside className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
          Summary
        </h2>
        <div className="flex items-baseline justify-between border-b border-border pb-4 mb-4">
          <span className="font-body text-sm text-text-secondary">Products</span>
          <span className="font-display font-bold text-2xl text-text-primary tabular-nums">
            {items.length}
          </span>
        </div>
        <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
          No prices here on purpose: every order is custom. Send us this list
          and we&apos;ll quote it within 24 hours.
        </p>
        <Link href="/quote" className="btn-primary w-full justify-center mb-3">
          Get a Quote
          <ArrowIcon size={14} />
        </Link>
        <div className="flex items-center justify-between">
          <Link href="/products" className="btn-text group text-sm">
            Keep browsing
            <ArrowIcon size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="font-body text-sm text-text-faint hover:text-text-primary transition-colors duration-200"
          >
            Clear cart
          </button>
        </div>
      </aside>
      </div>
    </div>
  );
}
