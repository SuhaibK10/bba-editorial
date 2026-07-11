import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import WishlistGrid from "@/components/wishlist/WishlistGrid";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Products you've saved for later.",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <div className="bg-background">
      <PageHeader
        label="Saved for later"
        title={
          <>
            Your <span className="text-accent">wishlist.</span>
          </>
        }
        description="Products you've hearted while browsing. They stay on this device until you remove them."
      />
      <div className="container-wide pb-20 md:pb-28">
        <WishlistGrid />
      </div>
    </div>
  );
}
