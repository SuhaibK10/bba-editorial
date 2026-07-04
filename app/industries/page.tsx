import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { industryList } from "@/components/shared/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "13+ industries trust B & B Appliances for display manufacturing, including telecom, banking, pharma, FMCG, cosmetics, hospitality, automobile and more.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Industries we serve"
        title={
          <>
            One manufacturer.
            <br />
            <span className="text-accent">Thirteen industries.</span>
          </>
        }
        description="35 years of manufacturing means we've already solved the display problems of your industry, probably several times over."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryList.map((industry) => (
            <div
              key={industry.label}
              className="card p-7 border border-border"
              style={{ boxShadow: "none" }}
            >
              <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-accent mb-5">
                {industry.icon}
              </div>
              <h2 className="font-display font-bold text-lg text-text-primary mb-2">
                {industry.label}
              </h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {industry.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="font-body text-text-secondary">
            Your industry not listed? We almost certainly still build for it.
          </p>
          <Link href="/quote" className="btn-text group">
            Talk to us
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
