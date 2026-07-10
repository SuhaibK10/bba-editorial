import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { moreCategories } from "@/data/home-content";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our full range of acrylic display solutions, including literature holders, POP displays, charging stations, revolving towers, signage and custom fabrication.",
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
        description="Every unit is fabricated at our New Delhi facility. Don't see exactly what you need? We build custom, and that's most of what we do."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={i < 3}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
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
                <ArrowIcon size={12} />
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
            <ArrowIcon size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
}
