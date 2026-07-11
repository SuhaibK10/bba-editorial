import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import QuoteForm from "@/components/quote/QuoteForm";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell us what you need (product, quantity, specs) and get a manufacturing quote from B & B Appliances within 24 hours.",
  alternates: { canonical: "/quote" },
};

type Props = {
  searchParams: Promise<{ product?: string }>;
};

export default async function QuotePage({ searchParams }: Props) {
  const { product } = await searchParams;

  return (
    <div className="bg-background">
      <PageHeader
        label="Request a quote"
        title={
          <>
            Quoted within
            <br />
            <span className="text-accent">24 hours.</span>
          </>
        }
        description="Fill in what you know, and we'll ask the right questions about the rest. Every quote comes directly from our production team."
      />

      <div className="container-wide pb-20 md:pb-28">
        <QuoteForm initialProduct={product} />

        {/* FAQ */}
        <div className="mt-24 max-w-3xl">
          <p className="section-label">Before you ask</p>
          <h2 className="section-heading-md mb-10">
            Frequently asked <span className="text-accent">questions.</span>
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-t border-border">
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none font-display font-bold text-text-primary [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg
                    width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"
                    className="shrink-0 text-text-faint transition-transform duration-200 group-open:rotate-45"
                  >
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="font-body text-text-secondary leading-relaxed pb-6 max-w-xl">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
