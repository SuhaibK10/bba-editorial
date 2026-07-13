import Image from "next/image";
import { clients, stats } from "@/data/home-content";
import StatItem from "@/components/home/sections/StatItem";

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
                  className={
                    client.logoSize === "2xl"
                      ? "h-20 md:h-24 w-auto"
                      : client.logoSize === "xl"
                      ? "h-16 md:h-20 w-auto"
                      : client.logoSize === "lg"
                      ? "h-14 md:h-16 w-auto"
                      : "h-10 md:h-12 w-auto"
                  }
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
