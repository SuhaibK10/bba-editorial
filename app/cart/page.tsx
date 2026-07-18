import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import CartView from "@/components/cart/CartView";
import CommerceCartSection from "@/components/checkout/CommerceCartSection";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review what's in your cart, check out directly, or send a custom list through for a quote — we respond within 24 hours.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="bg-background">
      <PageHeader
        label="Your cart"
        centered
        title={
          <>
            Buy it now,
            <br />
            <span className="text-accent">or ask us first.</span>
          </>
        }
        description="Priced items check out directly below. Anything custom — size, colour, branding, bulk — goes in as a quote instead, and we respond within 24 hours."
      />
      <div className="container-wide -mt-4 md:-mt-8 pb-20 md:pb-28">
        <CommerceCartSection />
        <CartView />
      </div>
    </div>
  );
}
