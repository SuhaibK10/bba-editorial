import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import GoogleButton from "@/components/auth/GoogleButton";
import { login } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your B & B Appliances account.",
  alternates: { canonical: "/login" },
  robots: { index: false },
};

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-text-primary " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors duration-200";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { error, message } = await searchParams;

  return (
    <div className="bg-background">
      <PageHeader
        compact
        centered
        title={
          <>
            Welcome Back
            
            
          </>
        }
        description="Sign in to track your quotes and reorder past displays faster."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="max-w-md mx-auto mb-6">
          <GoogleButton />
        </div>
        <form action={login} className="flex flex-col gap-5 max-w-md mx-auto">
          {error && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="rounded-lg border border-border bg-surface px-4 py-3 font-body text-sm text-text-secondary">
              {message}
            </p>
          )}

          <div>
            <label htmlFor="login-email" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button type="submit" className="btn-primary self-start">
            Sign In
          </button>

          <p className="font-body text-sm text-text-secondary">
            New to B &amp; B Appliances?{" "}
            <Link href="/signup" className="text-accent hover:text-accent-hover font-medium transition-colors duration-200">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
