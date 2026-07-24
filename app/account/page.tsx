import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Package } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import CartIcon from "@/components/shared/icons/CartIcon";
import HeartIcon from "@/components/shared/icons/HeartIcon";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/pricing";
import { signOut } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Account",
  description: "Your B & B Appliances account.",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

type OrderItemRow = { product_name: string; quantity: number };
type OrderRow = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: OrderItemRow[];
};

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s === "paid") return "text-accent bg-accent/10";
  if (s === "failed") return "text-red-600 bg-red-50";
  return "text-amber-600 bg-amber-50"; // pending
}

export default async function AccountPage() {
  // Graceful pre-setup state: the navbar links here even before the
  // Supabase project keys exist, so don't crash — explain instead.
  if (!supabaseConfigured()) {
    return (
      <div className="bg-background">
        <PageHeader
          compact
          title={
            <>
              Almost
              <br />
              <span className="text-accent">wired up.</span>
            </>
          }
          description="Accounts are built and waiting on Supabase credentials. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local (see .env.local.example) and restart the dev server."
        />
        <div className="container-wide pb-20 md:pb-28">
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const metaName = (user.user_metadata?.full_name ?? user.user_metadata?.name) as
    | string
    | undefined;
  const displayName = metaName?.trim() || user.email?.split("@")[0] || "there";
  const initials =
    displayName
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?";

  const provider = user.app_metadata?.provider as string | undefined;
  const signInMethod = provider ? provider.charAt(0).toUpperCase() + provider.slice(1) : "Email";

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // RLS ("owners read own orders") already scopes this to the signed-in
  // user — no need to filter by user_id again client-side.
  const { data: ordersData } = await supabase
    .from("orders")
    .select("id, created_at, status, total, order_items(product_name, quantity)")
    .order("created_at", { ascending: false });
  const orders = (ordersData ?? []) as unknown as OrderRow[];

  return (
    <div className="bg-background">
      <div className="container-wide pt-24 md:pt-28 pb-20 md:pb-28">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">

          {/* Profile */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-text-primary text-white flex items-center justify-center font-display font-bold text-lg shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-xl text-text-primary truncate">
                {displayName}
              </h1>
              <p className="font-body text-sm text-text-faint truncate">{user.email}</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/products/all"
              className="rounded-2xl border border-border bg-white p-5 flex items-center gap-3
                         hover:border-accent transition-colors duration-200"
            >
              <span className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-text-primary shrink-0">
                <CartIcon size={16} />
              </span>
              <span>
                <span className="block font-display font-bold text-sm text-text-primary">Shop</span>
                <span className="block font-body text-xs text-text-faint">Browse collection</span>
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="rounded-2xl border border-border bg-white p-5 flex items-center gap-3
                         hover:border-accent transition-colors duration-200"
            >
              <span className="w-9 h-9 rounded-full bg-surface flex items-center justify-center text-text-primary shrink-0">
                <HeartIcon size={16} />
              </span>
              <span>
                <span className="block font-display font-bold text-sm text-text-primary">Wishlist</span>
                <span className="block font-body text-xs text-text-faint">Saved items</span>
              </span>
            </Link>
          </div>

          {/* Account details */}
          <div className="rounded-2xl border border-border bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <User size={14} className="text-text-faint" />
              <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-text-faint">
                Account details
              </h2>
            </div>
            <dl>
              <div className="flex items-baseline justify-between gap-4 px-5 py-3.5 border-b border-border">
                <dt className="font-body text-sm text-text-faint">Name</dt>
                <dd className="font-body text-sm text-text-primary text-right">{displayName}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-5 py-3.5 border-b border-border">
                <dt className="font-body text-sm text-text-faint">Email</dt>
                <dd className="font-body text-sm text-text-primary text-right break-all">{user.email}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-5 py-3.5 border-b border-border">
                <dt className="font-body text-sm text-text-faint">Sign-in method</dt>
                <dd className="font-body text-sm text-text-primary text-right">{signInMethod}</dd>
              </div>
              {memberSince && (
                <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                  <dt className="font-body text-sm text-text-faint">Member since</dt>
                  <dd className="font-body text-sm text-text-primary text-right">{memberSince}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Orders */}
          <div className="rounded-2xl border border-border bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <Package size={14} className="text-text-faint" />
              <h2 className="font-body text-xs font-semibold uppercase tracking-wider text-text-faint">
                Orders
              </h2>
            </div>
            {orders.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="font-body text-sm text-text-secondary mb-4">
                  No orders yet. When you check out, they&apos;ll show up here.
                </p>
                <Link href="/products/all" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div>
                {orders.map((order) => {
                  const date = new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <div key={order.id} className="px-5 py-4 border-b border-border last:border-b-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <Package size={13} className="text-text-faint shrink-0" />
                          <span className="font-body text-xs text-text-faint truncate">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <span
                            className={`font-body text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${statusStyle(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <span className="font-display font-bold text-sm text-text-primary tabular-nums shrink-0">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5 mb-1.5">
                        {order.order_items.map((item, i) => (
                          <p key={i} className="font-body text-sm text-text-primary">
                            {item.product_name} × {item.quantity}
                          </p>
                        ))}
                      </div>
                      <p className="font-body text-xs text-text-faint">{date}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sign out */}
          <div className="flex flex-wrap items-center gap-4">
            <form action={signOut}>
              <button type="submit" className="btn-primary">
                Sign Out
              </button>
            </form>
            <Link href="/cart" className="btn-text">
              View cart
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
