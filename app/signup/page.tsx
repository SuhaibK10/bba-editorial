import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import GoogleButton from "@/components/auth/GoogleButton";
import { signup } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your B & B Appliances account.",
  alternates: { canonical: "/signup" },
  robots: { index: false },
};

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-3 font-body text-sm text-text-primary " +
  "placeholder:text-text-faint focus:border-accent focus:outline-none transition-colors duration-200";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function SignupPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="bg-background">
      <PageHeader
        compact
        centered
        title={
          <>
            Start ordering
            <br />
            <span className="text-accent">the easy way.</span>
          </>
        }
        description="One account for quotes, order history and faster reorders across every branch you run."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="max-w-md mx-auto mb-6">
          <GoogleButton />
        </div>
        <form action={signup} className="flex flex-col gap-5 max-w-md mx-auto">
          {error && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="signup-email" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              placeholder="At least 8 characters"
              className={inputClass}
            />
          </div>

          <button type="submit" className="btn-primary self-start">
            Create Account
          </button>

          <p className="font-body text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:text-accent-hover font-medium transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
