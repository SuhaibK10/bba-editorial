import Link from "next/link";
import { site, whatsappUrl, phoneHref, emailHref } from "@/data/site";

const links = [
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Get a Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container-wide" style={{ paddingTop: '2rem', paddingBottom: '0.1rem' }}>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">

          {/* Brand */}
          <div className="max-w-xs">
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
            <p className="text-white/40 font-body text-sm leading-relaxed ">
              India&apos;s trusted acrylic manufacturer.<br/>Serving 13+ industries for over 35+ years.<br/> {site.address.street}, {site.address.city}.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-3" aria-label="Footer">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
              className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 w-fit">
              WhatsApp
            </a>
            <a href={phoneHref}
              className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 w-fit">
              +{site.phone}
            </a>
            <a href={emailHref}
              className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200 w-fit">
              {site.email}
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/25 font-body text-xs">
            © {new Date().getFullYear()} B & B Appliances. All rights reserved.
          </p>
          
        </div>

      </div>
    </footer>
  );
}