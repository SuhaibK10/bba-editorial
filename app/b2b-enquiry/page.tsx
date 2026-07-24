import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import B2BEnquiryForm from "@/components/b2b/B2BEnquiryForm";

export const metadata: Metadata = {
  title: "B2B Enquiry",
  description:
    "Sourcing displays for multiple outlets or an ongoing supply need? Tell us about your business and we'll get back within 24 hours.",
  alternates: { canonical: "/b2b-enquiry" },
};

export default function B2BEnquiryPage() {
  return (
    <div className="bg-background">
      <PageHeader
        label="B2B enquiry"
        title={
          <>
            Sourcing for your
            <br />
            <span className="text-accent">business, at scale.</span>
          </>
        }
        description="Multiple outlets, recurring orders, or a custom supply arrangement. Tell us about your business and our team will reach out within 24 hours."
      />

      <div className="container-wide pb-20 md:pb-28">
        <B2BEnquiryForm />
      </div>
    </div>
  );
}
