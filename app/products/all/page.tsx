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
        title={
          <>
            Our Product
            <br />
            <span className="text-accent">Range.</span>
          </>
        }
        description="Filter by category, type, colour or placement to find exactly what you're after. Photography is being added as products come off the workshop floor — every listing here is ready to quote today."
      />
      <div className="container-wide pb-20 md:pb-28">
        <CatalogFilterGrid />
      </div>
    </div>
  );
}
