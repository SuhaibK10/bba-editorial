import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

type Props = { searchParams: Promise<{ orderId?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  // Logged-in users get a real summary via their own RLS-scoped read.
  // Guests have no session to scope a SELECT against, so they get the
  // generic confirmation below rather than a lookup keyed off a URL
  // param — simpler, and avoids exposing order data to anyone who
  // happens to have (or guesses) the id.
  let order: { total: number; full_name: string } | null = null;
  let itemCount = 0;

  if (orderId && supabaseConfigured()) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("orders")
        .select("total, full_name")
        .eq("id", orderId)
        .single();
      if (data) {
        order = data;
        const { count } = await supabase
          .from("order_items")
          .select("id", { count: "exact", head: true })
          .eq("order_id", orderId);
        itemCount = count ?? 0;
      }
    }
  }

  return (
    <div className="bg-background">
      <PageHeader
        compact
        title={
          <>
            Order confirmed.
            <br />
            <span className="text-accent">Thank you.</span>
          </>
        }
        description={
          order
            ? `${order.full_name}, we've received your order for ${itemCount} item${itemCount === 1 ? "" : "s"}, totalling ${formatPrice(order.total)}. A confirmation has been emailed to you.`
            : "We've received your order and emailed a confirmation. We'll be in touch with despatch details shortly."
        }
      />
      <div className="container-wide pb-20 md:pb-28">
        <Link href="/products" className="btn-primary">
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}
