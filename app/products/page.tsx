import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import ProductMedia from "@/components/products/ProductMedia";
import { products, moreCategories } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our full range of acrylic display solutions — literature holders, POP displays, charging stations, revolving towers, signage and custom fabrication.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Our products"
        title={
          <>
            Fifteen categories.
            <br />
            <span className="text-accent">Endless applications.</span>
          </>
        }
        description="Every unit is fabricated at our New Delhi facility. Don't see exactly what you need? We build custom — that's most of what we do."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="card group"
              style={{ background: product.color }}
            >
              <div className="relative overflow-hidden h-64">
                <ProductMedia
                  product={product}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6 bg-white/60">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display font-bold text-lg text-text-primary">
                    {product.name}
                  </h2>
                  <span
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0
                               text-text-secondary group-hover:bg-accent group-hover:text-white
                               transition-colors duration-200 shadow-sm"
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {product.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Extended range */}
        <div className="mt-20">
          <p className="section-label">Also in our range</p>
          <h2 className="section-heading-md mb-8">
            If it&apos;s acrylic, <span className="text-accent">we make it.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {moreCategories.map((category) => (
              <Link
                key={category}
                href={`/quote?product=custom-requirement`}
                className="industry-pill flex items-center gap-2"
              >
                {category}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="font-body text-text-secondary">
            Need something that isn&apos;t listed here?
          </p>
          <Link href="/quote" className="btn-text group">
            Request a custom fabrication
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
