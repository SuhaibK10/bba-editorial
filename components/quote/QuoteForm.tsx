"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { whatsappUrl, emailHref, site } from "@/data/site";
import { products, getProduct } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";
import {
  validateQuoteForm,
  composeWhatsAppMessage,
  type QuoteFormFields,
  type QuoteFormErrors,
} from "@/lib/quote";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-text-primary " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors duration-200";

export default function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const updateNote = useCartStore((s) => s.updateNote);
  const clearCart = useCartStore((s) => s.clearCart);
  const isInCart = useCartStore((s) => s.isInCart);

  const [form, setForm] = useState<QuoteFormFields>({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [pendingProduct, setPendingProduct] = useState("");
  const [errors, setErrors] = useState<QuoteFormErrors>({});

  // Pre-fill from a deep link like /quote?product=<slug>. Runs once on mount.
  useEffect(() => {
    if (!initialProduct) return;
    const product = getProduct(initialProduct);
    if (product) {
      addItem({ productSlug: product.slug, name: product.name });
    } else if (initialProduct === "custom-requirement") {
      addItem({ name: "Custom requirement" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (field: keyof QuoteFormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const handlePickProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const product = getProduct(slug);
    if (product) {
      addItem({ productSlug: product.slug, name: product.name });
    } else if (slug === "custom-requirement") {
      addItem({ name: "Custom requirement" });
    }
    setPendingProduct("");
    setErrors((err) => ({ ...err, items: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateQuoteForm(form, items);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    window.open(whatsappUrl(composeWhatsAppMessage(form, items)), "_blank", "noopener,noreferrer");
    clearCart();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 max-w-xl">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="quote-name" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Your name *
          </label>
          <input
            id="quote-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            className={inputClass}
            placeholder="Full name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="quote-company" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Company
          </label>
          <input
            id="quote-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
            className={inputClass}
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-phone" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Phone / WhatsApp *
        </label>
        <input
          id="quote-phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={set("phone")}
          className={inputClass}
          placeholder="+91 98XXX XXXXX"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Product list: cart items, or a picker if the cart is empty */}
      <div>
        <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Products *
        </label>

        {items.length === 0 ? (
          <select
            value={pendingProduct}
            onChange={handlePickProduct}
            className={inputClass}
            aria-invalid={!!errors.items}
          >
            <option value="">Select a category…</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
            <option value="custom-requirement">Something else / custom</option>
          </select>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const product = item.productSlug ? getProduct(item.productSlug) : undefined;
              return (
                <div key={item.key} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: product?.color ?? "var(--color-surface-2)" }}
                        aria-hidden="true"
                      />
                      <span className="font-display font-bold text-sm text-text-primary">
                        {item.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-text-faint
                                 hover:bg-surface hover:text-text-primary transition-colors duration-200 shrink-0"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
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
                    />
                    <input
                      type="text"
                      value={item.note ?? ""}
                      onChange={(e) => updateNote(item.key, e.target.value)}
                      className={inputClass}
                      placeholder="Size, colour, branding…"
                    />
                  </div>
                </div>
              );
            })}

            <select
              value=""
              onChange={handlePickProduct}
              className={inputClass}
            >
              <option value="">+ Add another product…</option>
              {products
                .filter((p) => !isInCart(p.slug))
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              <option value="custom-requirement">Something else / custom</option>
            </select>
          </div>
        )}
        {errors.items && (
          <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.items}</p>
        )}
      </div>

      <div>
        <label htmlFor="quote-message" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Anything else we should know?
        </label>
        <textarea
          id="quote-message"
          rows={3}
          value={form.message}
          onChange={set("message")}
          className={inputClass}
          placeholder="Delivery location, timeline, or anything else that helps us quote accurately."
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
        <button type="submit" className="btn-primary">
          <WhatsAppIcon size={15} />
          Send via WhatsApp
        </button>
        <p className="font-body text-xs text-text-faint">
          Opens WhatsApp with your request pre-filled. Prefer email?{" "}
          <a href={emailHref} className="text-accent hover:text-accent-hover underline underline-offset-2">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  );
}
