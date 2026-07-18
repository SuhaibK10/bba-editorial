import Image from "next/image";
import { clients, stats, type Client } from "@/data/home-content";
import StatItem from "@/components/home/sections/StatItem";

// Height per tier, plus a width cap on "sm": that tier holds the very wide
// wordmarks (Armani ~9:1, Assa Abloy ~7:1, Lava, Oppo, Vivo, SBI, Tim
// Hortons) whose height-only sizing let them stretch 130–290px and dominate
// the strip. object-contain keeps the aspect ratio inside the capped box.
const logoSizeClasses: Record<NonNullable<Client["logoSize"]>, string> = {
  "2xl": "h-20 md:h-24",
  xl: "h-16 md:h-20",
  lg: "h-14 md:h-16",
  base: "h-10 md:h-12",
  md: "h-8 md:h-9 max-w-36 md:max-w-44",
  sm: "h-6 md:h-7 max-w-28 md:max-w-32",
  xs: "h-5 md:h-6 max-w-24 md:max-w-28",
  "2xs": "h-4 md:h-5 max-w-20 md:max-w-24",
};

// Client marquee + stats. Pure CSS animation (see .marquee in globals.css),
// so this stays a server component (StatItem is its own client boundary).
// The list is duplicated for the seamless loop; the second copy is
// aria-hidden. Logos render in full brand color. The stats row sits right
// below the logos on purpose: the scale claim ("500+ brands") and the
// recognizable names backing it up reinforce each other side by side.
export default function ClientsSection() {
  return (
    <section className="section-pad-sm">
      <p className="section-label text-center mb-8">Clients we build for</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              aria-hidden={i >= clients.length}
              className="flex items-center mr-16 md:mr-24"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={i >= clients.length ? "" : client.name}
                  width={96}
                  height={55}
                  unoptimized
                  className={`w-auto object-contain ${logoSizeClasses[client.logoSize ?? "base"]}`}
                />
              ) : (
                <span className="font-display font-medium text-2xl md:text-3xl text-text-faint whitespace-nowrap">
                  {client.name}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="container-wide mt-12 md:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
