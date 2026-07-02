import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center">
      <div className="container-wide py-32">
        <p className="section-label">404</p>
        <h1 className="section-heading-lg mb-6">
          This page doesn&apos;t <span className="text-accent">exist.</span>
        </h1>
        <p className="font-body text-lg text-text-secondary max-w-md leading-relaxed mb-10">
          The page you&apos;re looking for may have moved. Our products, however,
          are exactly where you left them.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/products" className="btn-text group" style={{ height: "40px" }}>
            Browse products
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              className="group-hover:translate-x-1 transition-transform duration-200">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
