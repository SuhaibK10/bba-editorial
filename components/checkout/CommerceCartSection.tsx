"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCommerceCartStore } from "@/lib/commerce-cart-store";
import { getCatalogItem } from "@/data/catalog";
import Image from "next/image";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/pricing";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

// The real, priced cart — rendered above the RFQ quote-list section on
// /cart. Renders nothing when empty, so the page gracefully falls back
// to just the quote list if that's all the visitor has.
export default function CommerceCartSection() {
  const items = useCommerceCartStore((s) => s.items);
  const removeItem = useCommerceCartStore((s) => s.removeItem);
  const updateQuantity = useCommerceCartStore((s) => s.updateQuantity);

  // Avoid an empty-state flash
  // before the persisted store has hydrated on the client.
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!hydrated || items.length === 0) return null;

  const resolved = items
    .map((line) => {
      const item = getCatalogItem(line.slug);
      return item ? { line, item } : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const subtotal = resolved.reduce((sum, { line, item }) => sum + item.price * line.quantity, 0);

  return (
    <div className="mb-16">
      <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-6">
        Your Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-10 items-start">
        <div className="flex flex-col gap-4">
          {resolved.map(({ line, item }) => {
            const color = getProduct(item.categorySlug)?.color ?? "var(--color-surface-2)";
            return (
              <div key={item.slug} className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="relative w-10 h-10 rounded-xl shrink-0 overflow-hidden"
                      style={{ background: color }}
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-[11px] uppercase tracking-[0.12em] text-text-faint">
                        {item.sku}
                      </p>
                      <Link
                        href={`/products/${item.categorySlug}/${item.slug}`}
                        className="font-display font-bold text-base text-text-primary
                                   hover:text-accent transition-colors duration-200 truncate block"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-text-faint
                               hover:bg-surface hover:text-text-primary transition-colors duration-200"
                  >
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, line.quantity - 1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
                                 text-text-secondary hover:border-text-primary hover:text-text-primary
                                 transition-colors duration-200"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-body text-sm text-text-primary tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.slug, line.quantity + 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center
                                 text-text-secondary hover:border-text-primary hover:text-text-primary
                                 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-display font-bold text-sm text-text-primary tabular-nums">
                    {formatPrice(item.price * line.quantity)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
          <h3 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
            Order Summary
          </h3>
          <div className="flex items-baseline justify-between border-b border-border pb-4 mb-4">
            <span className="font-body text-sm text-text-secondary">Subtotal</span>
            <span className="font-display font-bold text-2xl text-text-primary tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
            Free shipping. Prices are inclusive of all taxes.
          </p>
          <Link href="/checkout" className="btn-primary w-full justify-center">
            Proceed to Checkout
            <ArrowIcon size={14} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
