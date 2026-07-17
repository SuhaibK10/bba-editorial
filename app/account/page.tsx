import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { createClient, supabaseConfigured } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Account",
  description: "Your B & B Appliances account.",
  alternates: { canonical: "/account" },
  robots: { index: false },
};

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

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="bg-background">
      <PageHeader
        compact
        title={
          <>
            Hello,
            <br />
            <span className="text-accent">{user.email?.split("@")[0]}.</span>
          </>
        }
        description="Quote history and reorders are on the way. For now, manage your sign-in here."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="rounded-2xl border border-border bg-white p-6 max-w-md mb-8">
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
            Signed in as
          </h2>
          <dl className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
              <dt className="font-body text-sm text-text-faint">Email</dt>
              <dd className="font-body text-sm text-text-primary text-right break-all">{user.email}</dd>
            </div>
            {memberSince && (
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
                <dt className="font-body text-sm text-text-faint">Member since</dt>
                <dd className="font-body text-sm text-text-primary text-right">{memberSince}</dd>
              </div>
            )}
          </dl>
        </div>

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
  );
}
