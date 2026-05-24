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
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center
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
          
        </div>
      </div>

    </footer>
  );
}