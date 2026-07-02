import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import { site, whatsappUrl, phoneHref, emailHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach B & B Appliances — WhatsApp, phone or email. Manufacturing facility on GT Karnal Road, New Delhi. Quotes within 24 hours.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    label: "WhatsApp",
    value: "Fastest response — usually within the hour",
    href: whatsappUrl("Hi, I'd like to talk about a display requirement."),
    external: true,
  },
  {
    label: "Phone",
    value: `+${site.phone}`,
    href: phoneHref,
    external: false,
  },
  {
    label: "Email",
    value: site.email,
    href: emailHref,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHeader
        label="Contact"
        title={
          <>
            Talk to the people
            <br />
            <span className="text-accent">who build it.</span>
          </>
        }
        description="No call centres, no account managers. You'll speak directly with the team that quotes, engineers and manufactures your order."
      />

      <div className="container-wide pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="card p-7 border border-border group"
              style={{ boxShadow: "none" }}
            >
              <div className="flex items-center gap-3 mb-3">
                {channel.label === "WhatsApp" && <WhatsAppIcon size={20} />}
                <h2 className="font-display font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-200">
                  {channel.label}
                </h2>
              </div>
              <p className="font-body text-sm text-text-secondary leading-relaxed break-words">
                {channel.value}
              </p>
            </a>
          ))}
        </div>

        {/* Address + hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mb-16">
          <div>
            <p className="section-label">Facility</p>
            <p className="font-body text-text-secondary leading-relaxed">
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.city}, India
            </p>
          </div>
          <div>
            <p className="section-label">Hours</p>
            <p className="font-body text-text-secondary leading-relaxed">
              Monday – Saturday
              <br />
              10:00 AM – 7:00 PM IST
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link href="/quote" className="btn-primary">
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
