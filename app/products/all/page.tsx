import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import CatalogFilterGrid from "@/components/products/CatalogFilterGrid";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse every acrylic display product by category, type, colour and placement. Filter to find exactly what you need, then request a quote.",
  alternates: { canonical: "/products/all" },
};

export default function AllProductsPage() {
  return (
    <div className="bg-background">
      <PageHeader
        compact
        centered
        title={
          <>
            Our Product
            
            <span className="text-accent"> Range</span>
          </>
        }
        description=""
      />
      <div className="container-wide pb-20 md:pb-28 -mt-4 md:-mt-6">
        <CatalogFilterGrid />
      </div>
    </div>
  );
}
