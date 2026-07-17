import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review the products you'd like quoted. Adjust quantities, add notes, and send the list — we respond within 24 hours.",
  alternates: { canonical: "/cart" },
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="bg-background">
      <PageHeader
        label="Your cart"
        title={
          <>
            Everything here,
            <br />
            <span className="text-accent">quoted in 24 hours.</span>
          </>
        }
        description="Set approximate quantities and any specifics — size, colour, branding — then send the list across. No payment, no commitment: just a fast, real price."
      />
      <div className="container-wide pb-20 md:pb-28">
        <CartView />
      </div>
    </div>
  );
}
