"use client";

import { useEffect, useState } from "react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { site, whatsappUrl, emailHref } from "@/data/site";
import { products, getProduct } from "@/data/products";
import { useCartStore } from "@/lib/cart-store";

type FormState = {
  name: string;
  company: string;
  phone: string;
  message: string;
};

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

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [pendingProduct, setPendingProduct] = useState("");
  const [errors, setErrors] = useState<Partial<FormState> & { items?: string }>({});

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

  const set = (field: keyof FormState) =>
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

  const validate = () => {
    const next: Partial<FormState> & { items?: string } = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (items.length === 0) next.items = "Please add at least one product below.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const composeMessage = () => {
    const itemLines = items.map((item, i) => {
      const parts = [`${i + 1}. ${item.name}`];
      if (item.quantity.trim()) parts.push(`Qty: ${item.quantity.trim()}`);
      if (item.note?.trim()) parts.push(`Note: ${item.note.trim()}`);
      return parts.join(", ");
    });

    const lines: (string | null)[] = [
      `Hi ${site.name}, I'd like a quote.`,
      "",
      `Name: ${form.name.trim()}`,
      form.company.trim() ? `Company: ${form.company.trim()}` : null,
      `Phone: ${form.phone.trim()}`,
      "",
      "Products:",
      ...itemLines,
      form.message.trim() ? "" : null,
      form.message.trim() ? `Details: ${form.message.trim()}` : null,
    ];

    return lines.filter((line): line is string => line !== null).join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappUrl(composeMessage()), "_blank", "noopener,noreferrer");
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
                .filter((p) => !items.some((i) => i.productSlug === p.slug))
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
