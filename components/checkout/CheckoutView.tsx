"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCommerceCartStore } from "@/lib/commerce-cart-store";
import { createClient } from "@/lib/supabase/client";
import { getCatalogItem } from "@/data/catalog";
import { formatPrice } from "@/lib/pricing";
import { site } from "@/data/site";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-text-primary " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors duration-200";

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
const ACCENT_HEX = "#1D5C3F";

type FormFields = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  email: string; // only required/shown for guests
};

const EMPTY_FORM: FormFields = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  email: "",
};

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load the payment gateway."));
    document.body.appendChild(script);
  });
}

export default function CheckoutView() {
  const router = useRouter();
  const items = useCommerceCartStore((s) => s.items);
  const clearCart = useCommerceCartStore((s) => s.clearCart);

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [userEmail, setUserEmail] = useState<string | null | undefined>(undefined); // undefined = still checking
  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });
  }, []);

  const resolved = useMemo(
    () =>
      items
        .map((line) => {
          const item = getCatalogItem(line.slug);
          return item ? { line, item } : null;
        })
        .filter((r): r is NonNullable<typeof r> => r !== null),
    [items]
  );

  const subtotal = resolved.reduce((sum, { line, item }) => sum + item.price * line.quantity, 0);
  const isGuest = userEmail === null;

  const set = (field: keyof FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName || !form.phone || !form.addressLine1 || !form.city || !form.state || !form.pincode) {
      setError("Please fill in every required field.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Pincode must be 6 digits.");
      return;
    }
    if (isGuest && !form.email) {
      setError("Email is required so we can send your order confirmation.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: resolved.map(({ line }) => ({ slug: line.slug, quantity: line.quantity })),
          shipping: {
            fullName: form.fullName,
            phone: form.phone,
            addressLine1: form.addressLine1,
            addressLine2: form.addressLine2 || undefined,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          },
          ...(isGuest ? { guestContact: { email: form.email, phone: form.phone } } : {}),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const { orderId, razorpayOrderId, amount, currency } = data;

      await loadRazorpayScript();

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: site.name,
        description: `Order #${(orderId as string).slice(0, 8)}`,
        order_id: razorpayOrderId,
        prefill: {
          name: form.fullName,
          email: userEmail ?? form.email,
          contact: form.phone,
        },
        theme: { color: ACCENT_HEX },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              setError(verifyData.error ?? "Payment verification failed. Please contact support.");
              setSubmitting(false);
              return;
            }
            clearCart();
            router.push(`/checkout/success?orderId=${orderId}`);
          } catch {
            setError("Payment succeeded but confirmation failed. Please contact support.");
            setSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });

      razorpay.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-16 gap-4">
        <p className="font-body text-text-secondary max-w-sm">
          Your cart is empty. Add something first.
        </p>
        <Link href="/products" className="btn-primary mt-2">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-10 items-start">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 max-w-xl">
        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
            {error}
          </p>
        )}

        {isGuest && (
          <div>
            <label htmlFor="checkout-email" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>
            <input
              id="checkout-email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="checkout-name" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Full name
            </label>
            <input
              id="checkout-name"
              type="text"
              value={form.fullName}
              onChange={set("fullName")}
              placeholder="Your name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="checkout-phone" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Phone
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="+91 98765 43210"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="checkout-address1" className="block font-body text-sm font-medium text-text-primary mb-1.5">
            Address
          </label>
          <input
            id="checkout-address1"
            type="text"
            value={form.addressLine1}
            onChange={set("addressLine1")}
            placeholder="Flat, building, street"
            className={`${inputClass} mb-3`}
          />
          <input
            type="text"
            value={form.addressLine2}
            onChange={set("addressLine2")}
            placeholder="Landmark, area (optional)"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="checkout-city" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              City
            </label>
            <input id="checkout-city" type="text" value={form.city} onChange={set("city")} className={inputClass} />
          </div>
          <div>
            <label htmlFor="checkout-state" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              State
            </label>
            <input id="checkout-state" type="text" value={form.state} onChange={set("state")} className={inputClass} />
          </div>
          <div>
            <label htmlFor="checkout-pincode" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Pincode
            </label>
            <input
              id="checkout-pincode"
              type="text"
              inputMode="numeric"
              value={form.pincode}
              onChange={set("pincode")}
              className={inputClass}
            />
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary self-start disabled:opacity-60">
          {submitting ? "Processing…" : `Pay ${formatPrice(subtotal)}`}
        </button>
      </form>

      <aside className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
        <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
          Order Summary
        </h2>
        <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-border">
          {resolved.map(({ line, item }) => (
            <div key={item.slug} className="flex items-baseline justify-between gap-3">
              <span className="font-body text-sm text-text-secondary truncate">
                {item.name} <span className="text-text-faint">× {line.quantity}</span>
              </span>
              <span className="font-body text-sm text-text-primary tabular-nums shrink-0">
                {formatPrice(item.price * line.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-body text-sm text-text-secondary">Total</span>
          <span className="font-display font-bold text-2xl text-text-primary tabular-nums">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="font-body text-xs text-text-faint mt-2">
          Free shipping · inclusive of all taxes
        </p>
      </aside>
    </div>
  );
}
