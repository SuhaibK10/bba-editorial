import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import TrustBar from "@/components/home/sections/TrustBar";
import ProcessSection from "@/components/home/sections/ProcessSection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "B & B Appliances has manufactured acrylic and blow-moulded display solutions from GT Karnal Road, New Delhi since 1991. 500+ brands, 13+ industries, 35 years.",
  alternates: { canonical: "/about" },
};

const milestones = [
  {
    year: "1991",
    title: "Founded in New Delhi",
    desc: "B & B Appliances opens its fabrication facility on GT Karnal Road, focused on acrylic displays for local retail.",
  },
  {
    year: "2000s",
    title: "National distribution",
    desc: "Telecom and banking rollouts take our displays into branches and stores across India: hundreds of identical units, delivered on schedule.",
  },
  {
    year: "2010s",
    title: "Blow-moulded signage",
    desc: "We add blow-moulding capability, expanding into weather-proof outdoor signage for petroleum and franchise networks.",
  },
  {
    year: "Today",
    title: "500+ brands and counting",
    desc: "Nine product categories, thirteen industries, and a custom-fabrication practice that turns sketches into production runs.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <PageHeader
        label={`Est. ${site.foundingYear} · ${site.address.city}`}
        title={
          <>
            Thirty-five years of
            <br />
            <span className="text-accent">making things well.</span>
          </>
        }
        description="We are a manufacturer, not a middleman. Every display we sell is fabricated at our own facility, by people who have been doing this for decades."
      />

      <TrustBar />

      {/* Story */}
      <section className="section-pad section-pad-md">
        <div className="container-wide">
          <div className="max-w-4xl">
            <p className="section-label">Our story</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <p className="font-body text-text-secondary leading-relaxed">
                B & B Appliances started in 1991 with a simple observation: Indian retail
                was growing fast, and nobody was building the display infrastructure it
                needed, well, locally, and at scale. We set up a fabrication facility on
                GT Karnal Road and started making acrylic literature holders for banks.
              </p>
              <p className="font-body text-text-secondary leading-relaxed">
                Three decades later the product range covers nine categories and the
                client list runs from telecom giants to neighbourhood pharmacies. What
                hasn&apos;t changed: everything is still manufactured in-house, and every
                order still gets quoted within 24 hours.
              </p>
            </div>

            {/* Milestones */}
            <div className="flex flex-col">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[8rem_1fr] gap-4 border-t border-border py-8"
                >
                  <div className="font-display font-bold text-accent text-lg">{m.year}</div>
                  <div>
                    <h2 className="font-display font-bold text-lg text-text-primary mb-2">
                      {m.title}
                    </h2>
                    <p className="font-body text-sm text-text-secondary leading-relaxed max-w-xl">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* CTA */}
      <section className="section-pad section-pad-lg">
        <div className="container-wide">
          <h2 className="section-heading-md mb-6">
            Work with a <span className="text-accent">manufacturer.</span>
          </h2>
          <Link href="/quote" className="btn-primary">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
