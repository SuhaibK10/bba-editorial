"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { site, whatsappUrl, emailHref } from "@/data/site";
import { products } from "@/data/products";

type FormState = {
  name: string;
  company: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
};

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-text-primary " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors duration-200";

export default function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    phone: "",
    product: products.some((p) => p.slug === initialProduct) ? initialProduct! : "",
    quantity: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!form.product) next.product = "Please choose a product category.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const composeMessage = () => {
    const productName =
      products.find((p) => p.slug === form.product)?.name ?? form.product;
    return [
      `Hi ${site.name}, I'd like a quote.`,
      ``,
      `Name: ${form.name.trim()}`,
      form.company.trim() && `Company: ${form.company.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Product: ${productName}`,
      form.quantity.trim() && `Quantity: ${form.quantity.trim()}`,
      form.message.trim() && `Details: ${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    window.open(whatsappUrl(composeMessage()), "_blank", "noopener,noreferrer");
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

        <div>
          <label htmlFor="quote-quantity" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Approx. quantity
          </label>
          <input
            id="quote-quantity"
            type="text"
            inputMode="numeric"
            value={form.quantity}
            onChange={set("quantity")}
            className={inputClass}
            placeholder="e.g. 250 units"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-product" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Product category *
        </label>
        <select
          id="quote-product"
          value={form.product}
          onChange={set("product")}
          className={inputClass}
          aria-invalid={!!errors.product}
        >
          <option value="">Select a category…</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
          <option value="custom-requirement">Something else / custom</option>
        </select>
        {errors.product && (
          <p role="alert" className="mt-1.5 font-body text-xs text-red-600">{errors.product}</p>
        )}
      </div>

      <div>
        <label htmlFor="quote-message" className="block font-body text-sm font-medium text-text-primary mb-1.5">
          Requirement details
        </label>
        <textarea
          id="quote-message"
          rows={4}
          value={form.message}
          onChange={set("message")}
          className={inputClass}
          placeholder="Dimensions, branding, delivery location, timeline — anything that helps us quote accurately."
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
