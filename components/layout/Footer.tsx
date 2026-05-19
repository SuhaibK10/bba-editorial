import Link from "next/link";

const productLinks = [
  { label: "Literature Holders", href: "/products/literature-holders" },
  { label: "Table Top Displays", href: "/products/table-top-displays" },
  { label: "Charging Stations", href: "/products/mobile-charging-stations" },
  { label: "Revolving Towers", href: "/products/revolving-display-towers" },
  { label: "POP Displays", href: "/products/retail-pop-displays" },
  { label: "Blow Moulded Signages", href: "/products/blow-moulded-signages" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

const industryLinks = [
  "Telecom", "Banking & Insurance", "Pharma",
  "FMCG", "Cosmetics", "Hospitality",
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">

      {/* ── Main footer ───────────────────────────── */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#0057FF] flex items-center justify-center
                              group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-display font-bold text-sm">B</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-sm text-white">B & B Appliances</span>
                <span className="text-white/40 text-[10px] font-body tracking-wide">Since 1991</span>
              </div>
            </Link>
            <p className="text-white/50 font-body text-sm leading-relaxed mb-6">
              India's trusted manufacturer of acrylic display solutions.
              Serving 13+ industries for over 35 years.
            </p>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20
                         text-white font-body text-sm font-medium
                         px-4 py-2.5 rounded-full
                         transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white/60 uppercase tracking-widest mb-5">
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white
                               transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white/60 uppercase tracking-widest mb-5">
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/70 hover:text-white
                               transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm text-white/60 uppercase tracking-widest mb-5">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-white/40 font-body text-xs mb-1">ADDRESS</p>
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  GT Karnal Road Industrial Area<br />New Delhi, India
                </p>
              </div>
              <div>
                <p className="text-white/40 font-body text-xs mb-1">INDUSTRIES</p>
                <div className="flex flex-wrap gap-1.5">
                  {industryLinks.map((ind) => (
                    <span
                      key={ind}
                      className="text-white/50 font-body text-xs
                                 bg-white/5 border border-white/10
                                 px-2 py-0.5 rounded-full"
                    >
                      {ind}
                    </span>
                  ))}
                  <span className="text-white/30 font-body text-xs px-2 py-0.5">+7 more</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-white/30 font-body text-xs">
            © {new Date().getFullYear()} B & B Appliances. All rights reserved.
          </p>
          <p className="text-white/20 font-body text-xs">
            Designed & built by{" "}
            <span className="text-[#0057FF]/70">Weblicate</span>
          </p>
        </div>
      </div>

    </footer>
  );
}