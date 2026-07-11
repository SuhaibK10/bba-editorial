"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background min-h-screen flex items-center">
      <div className="container-wide py-32">
        <p className="section-label">Something went wrong</p>
        <h1 className="section-heading-lg mb-6">
          That wasn&apos;t supposed to <span className="text-accent">happen.</span>
        </h1>
        <p className="font-body text-lg text-text-secondary max-w-md leading-relaxed mb-10">
          An unexpected error occurred. You can try again, or head back to the
          homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <button onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-ghost"
            style={{ height: "40px", fontSize: "0.875rem", padding: "0 1.25rem" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
