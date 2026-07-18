import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="bg-background">
      <PageHeader compact title="Checkout" />
      <div className="container-wide pb-20 md:pb-28">
        <CheckoutView />
      </div>
    </div>
  );
}
