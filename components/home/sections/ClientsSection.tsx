import Image from "next/image";
import { clients } from "@/data/home-content";

// Client marquee. Pure CSS animation (see .marquee in globals.css), so this
// stays a server component. The list is duplicated for the seamless loop;
// the second copy is aria-hidden. Logos render in full brand color.
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
                    client.logoSize === "lg"
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
    </section>
  );
}
