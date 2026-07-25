import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import CommerceCartSection from "@/components/checkout/CommerceCartSection";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review what's in your cart and check out directly. For anything custom, fill out a quote request or message us on WhatsApp.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="bg-background">
      <PageHeader
        compact
        centered
        title={
          <>
            Buy it now,
            <br />
            <span className="text-accent">or ask us first.</span>
          </>
        }
        description="Priced items check out directly below. Anything custom (size, colour, branding, bulk)? Fill out a quote request or message us directly — we respond within 24 hours."
      />
      <div className="container-wide -mt-4 md:-mt-8 pb-20 md:pb-28">
        <CommerceCartSection />
      </div>
    </div>
  );
}
