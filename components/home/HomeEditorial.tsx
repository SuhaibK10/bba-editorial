"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const products = [
  { id: "01", name: "Literature Holders", desc: "Acrylic brochure & pamphlet dispensers for retail and banking environments.", slug: "literature-holders", image: "https://images.unsplash.com/photo-1738857734516-8bcf91a320d9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", color: "#EEF2FF" },
  { id: "02", name: "Static Signages", desc: "Durable blow-moulded plastic signage for brand visibility at scale.", slug: "static-signages", image: "https://images.unsplash.com/photo-1636314326111-b7fa652a3abf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", color: "#F0F9FF" },
  { id: "03", name: "Table Top Displays", desc: "Counter-top acrylic units engineered for maximum product visibility at POS.", slug: "table-top-displays", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80", color: "#F0FDF4" },
  { id: "04", name: "Charging Stations", desc: "Display stands with integrated device charging. Serve customers while they wait.", slug: "mobile-charging-stations", image: "", color: "#FFF7ED" },
  { id: "05", name: "Revolving Towers", desc: "Multi-tier rotating display towers that multiply shelf space without footprint.", slug: "revolving-display-towers", image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779206075/ChatGPT_Image_May_19_2026_at_09_23_05_PM_hgerxe.png", color: "#FDF4FF" },
  { id: "06", name: "Retail POP Displays", desc: "Point-of-purchase systems engineered to drive impulse decisions at the shelf.", slug: "retail-pop-displays", image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&q=80", color: "#ECFEFF" },
  { id: "07", name: "Customised Displays", desc: "Bespoke acrylic fabrication built precisely to your brand specifications.", slug: "customised-displays", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80", color: "#FFF1F2" },
  
  { id: "08", name: "Motorised Signages", desc: "Rotating animated signage that commands attention in high-traffic locations.", slug: "motorised-signages", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", color: "#FAFAF9" },
];

const industries = ["Telecom", "Banking & Insurance", "Pharma & Healthcare", "FMCG", "Cosmetics & Beauty", "Hospitality", "Automobile", "Electronics", "Retail", "Education", "Real Estate", "Government", "Petroleum"];
const stats = [
  { value: 35, suffix: "+", label: "Years in Business" },
  { value: 500, suffix: "+", label: "Brands Served" },
  { value: 13, suffix: "", label: "Industries" },
  { value: 8, suffix: "", label: "Product Families" },
];

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !countRef.current) return;
    const el = countRef.current;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * value).toString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = value.toString();
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center gap-2">
      <div className="font-display font-bold text-5xl md:text-6xl text-[#1A1A1A] tracking-tight leading-none">
        <span ref={countRef}>0</span><span>{suffix}</span>
      </div>
      <div className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scope the selector to this container so it never leaks to other instances
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card", containerRef.current!);
      if (cards.length === 0) return;

      cards.forEach((card, i) => { if (i > 0) gsap.set(card, { yPercent: 100 }); });

      cards.forEach((card, i) => {
        if (i === 0) return;
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `${((i - 1) / (cards.length - 1)) * 80}% top`,
          end: `${(i / (cards.length - 1)) * 80}% top`,
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(card, { yPercent: 100 - self.progress * 100 });
            gsap.set(cards[i - 1], { scale: 1 - self.progress * 0.04, transformOrigin: "center bottom" });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative border-t border-[#E0E0E0]"
      style={{ minHeight: `${products.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-center max-w-[1400px] mx-auto">
            <div>
              <p className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest mb-4">What we make</p>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#1A1A1A] leading-tight mb-6">
                Multiple product<br /><span className="text-[#0057FF]">categories.</span><br />Endless applications.
              </h2>
              <p className="font-body text-[#6E6E73] leading-relaxed max-w-sm mb-8 text-base">
                From a single brochure holder to a full motorised signage network, we manufacture it all.
              </p>
              <Link href="/products"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-[#0057FF]
                           border border-[#0057FF]/30 rounded-full px-7 py-2.5
                           hover:bg-[#0057FF] hover:text-white hover:border-[#0057FF] transition-all duration-300">
                View all products
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="relative h-[550px]">
              {products.map((product, i) => (
                <div key={product.id} className="stack-card absolute inset-0 rounded-3xl overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.08)]"
                  style={{ zIndex: i + 1 }}>
                  <div className="w-full h-full flex flex-col" style={{ background: product.color }}>
                    <div className="relative overflow-hidden" style={{ height: "420px" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name}
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.9) saturate(0.85)" }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      <span className="absolute top-5 left-5 font-display font-bold text-4xl text-white/90 drop-shadow-sm">
                        {product.id}
                      </span>
                      <Link href={`/products/${product.slug}`}
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90
                                   backdrop-blur-sm flex items-center justify-center
                                   hover:bg-[#0057FF] transition-colors duration-200 shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                          <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                    <div className="p-6 flex-shrink-0">
                      <h3 className="font-display font-bold text-xl text-[#1A1A1A] mb-2.5">{product.name}</h3>
                      <p className="font-body text-sm text-[#6E6E73] leading-relaxed line-clamp-2">{product.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeEditorial() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white">

      {/* Hero */}
      <section id="hero-section" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        <div ref={bgRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="absolute top-1/4 right-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #0057FF 0%, transparent 65%)" }} />
        </div>

        <div className="flex flex-col gap-10">
          <div className="max-w-7xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[1.5px] bg-[#0057FF]" />
              <span className="font-body text-xs text-[#6E6E73] uppercase tracking-widest">Est. 1991 · New Delhi, India</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(2.75rem,8.5vw,8rem)] text-[#1A1A1A] leading-[1.0] tracking-tight mb-8">
              India's most trusted<br />
              <span className="text-[#0057FF]">acrylic manufacturer.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-lg text-[#6E6E73] max-w-xl leading-relaxed mb-10">
              Acrylic fabrication and blow-moulded displays for every industry.
              Built to last, designed to perform.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 flex-wra mb-6">
             <Link href="/quote"
  className="bg-[#4f86f4ef] text-white font-body font-medium text-base px-10 py-4 rounded-full
             ring-2 ring-[#1A1A1A]
             hover:bg-[#0047DD] shadow-[0_8px_32px_rgba(0,87,255,0.28)]
             hover:shadow-[0_12px_40px_rgba(0,87,255,0.36)] transition-all duration-300 active:scale-95">
  Get a Quote
</Link>
              <Link href="/products" className="font-body font-medium text-sm text-[#1A1A1A] flex items-center gap-2 group px-2">
                Browse products
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-2 mt-20">
            <div className="w-5 h-8 rounded-full border border-[#E0E0E0] flex items-start justify-center pt-1.5">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full bg-[#AEAEB2]" />
            </div>
            <span className="font-body text-xs text-[#AEAEB2]">Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-[#E0E0E0] py-16 bg-[#F5F5F7]">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => <StatItem key={stat.label} {...stat} index={i} />)}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest mb-6">Who we are</motion.p>

            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] text-[#1A1A1A] leading-tight">
              For over three decades, B & B Manufacturer has been the{" "}
              <span className="italic font-light text-[#6E6E73]">manufacturing backbone</span>
              {" "}behind India's most recognised brand displays.
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 pt-10 border-t border-[#E0E0E0] grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="font-body text-[#6E6E73] leading-relaxed">
                From Airtel retail stores to pharmacy counters, from bank branches to FMCG shelves — if you've walked into a branded space in India, you've likely seen our work.
              </p>
              <p className="font-body text-[#6E6E73] leading-relaxed">
                We specialise in acrylic fabrication and blow-moulded plastic displays, manufactured with precision at our GT Karnal Road facility in New Delhi.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Card stack */}
      <CardStack />

      {/* Industries */}
      <section className="py-24 md:py-32 border-t border-[#E0E0E0] ">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest mb-3">Where we work</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(1.75rem,3.5vw,3rem)] text-[#1A1A1A]">
                Multiple industries.<br />One manufacturer.
              </motion.h2>
            </div>
            <Link href="/industries" className="font-body text-sm text-[#0057FF] flex items-center gap-2 group">
              View all industries
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {industries.map((ind, i) => (
              <motion.div key={ind} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}>
                <Link href="/industries" className="industry-pill">{ind}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 bg-[#1A1A1A]">
        <div className="container-wide">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-body text-xs text-white/40 uppercase tracking-widest mb-4">The process</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-[clamp(1.75rem,3.5vw,3rem)] text-white mb-16">
            Simple. Fast. Reliable.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { step: "01", title: "Browse", desc: "Explore our product categories and find what fits your need." },
              { step: "02", title: "Quote", desc: "Submit a quote request with your specs, quantity, and timeline." },
              { step: "03", title: "Manufacture", desc: "We fabricate at our facility with 35 years of precision." },
              { step: "04", title: "Deliver", desc: "Pan-India delivery. Your displays, on time, every time." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-t border-white/10 pt-8 pb-8 md:pr-8">
                <div className="process-step-number">{item.step}</div>
                <h3 className="process-step-title">{item.title}</h3>
                <p className="process-step-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="border border-[#E0E0E0] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row
                          items-start md:items-center justify-between gap-10 bg-[#F5F5F7]">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(1.75rem,3.5vw,3rem)] text-[#1A1A1A] mb-4">
                Ready to build something<br /><span className="text-[#0057FF]">remarkable?</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[#6E6E73] max-w-md leading-relaxed">
                Tell us what you need. We'll quote you within 24 hours. No minimum order for first-time clients.
              </motion.p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/quote"
                className="bg-[#6e99f0] text-white font-body font-medium px-8 py-4 rounded-full
                           text-center hover:bg-[#0047DD] shadow-[0_8px_32px_rgba(0,87,255,0.24)]
                           transition-all duration-300 active:scale-95">
                Request a Quote
              </Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                className="bg-white text-[#1A1A1A] font-body font-medium px-8 py-4 rounded-full
                           text-center border border-[#E0E0E0] hover:border-[#6E6E73]
                           transition-all duration-300 flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}