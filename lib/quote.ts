import type { CartItem } from "@/lib/cart-store";
import { site } from "@/data/site";

export type QuoteFormFields = {
  name: string;
  company: string;
  phone: string;
  message: string;
};

export type QuoteFormErrors = Partial<QuoteFormFields> & { items?: string };

export function validateQuoteForm(
  form: QuoteFormFields,
  items: CartItem[]
): QuoteFormErrors {
  const errors: QuoteFormErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!/^[+\d][\d\s-]{7,15}$/.test(form.phone.trim()))
    errors.phone = "Please enter a valid phone number.";
  if (items.length === 0) errors.items = "Please add at least one product below.";
  return errors;
}

export function composeWhatsAppMessage(
  form: QuoteFormFields,
  items: CartItem[]
): string {
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
}
