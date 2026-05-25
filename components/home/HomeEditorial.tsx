"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";


const products = [
  { id: "01", name: "Literature Holders", desc: "Acrylic brochure & pamphlet dispensers for retail and banking environments.", slug: "literature-holders", image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779649957/LiteratureHolder_fpbz6y.png", color: "#EEF2FF" },
  { id: "02", name: "Static Signages", desc: "Durable blow-moulded plastic signage for brand visibility at scale.", slug: "static-signages", image: "https://images.unsplash.com/photo-1636314326111-b7fa652a3abf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", color: "#F0F9FF" },
  { id: "03", name: "Table Top Displays", desc: "Counter-top acrylic units engineered for maximum product visibility at POS.", slug: "table-top-displays", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80", color: "#F0FDF4" },
  { id: "04", name: "Charging Stations", desc: "Display stands with integrated device charging. Serve customers while they wait.", slug: "mobile-charging-stations", image: "https://res.cloudinary.com/deh394y0h/image/upload/f_auto,q_auto,c_pad,b_rgb:f5eff7,w_1400,h_700/v1779206075/ChatGPT_Image_May_19_2026_at_09_44_41_PM_xjre4k.png", color: "#FFF7ED" },
  { id: "05", name: "Revolving Towers", desc: "Multi-tier rotating display towers that multiply shelf space without footprint.", slug: "revolving-display-towers", image: "https://res.cloudinary.com/deh394y0h/image/upload/v1779208714/Revolving_Tower_t7mknk.png", color: "#FDF4FF" },
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

const CARD_WIDTH = 340;
const GAP = 20;
const STEP = CARD_WIDTH + GAP;

function CardCarousel() {
  const [current, setCurrent] = useState(0);
  const isDragging = useRef(false);

  const goTo = (index: number) => {
    setCurrent(Math.max(0, Math.min(products.length - 1, index)));
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold || info.velocity.x < -300) {
      goTo(current + 1);
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      goTo(current - 1);
    }
    // small delay so click doesn't fire after drag
    setTimeout(() => { isDragging.current = false; }, 50);
  };

  return (
    <section className="border-t border-[#E0E0E0] py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="container-wide mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest mb-4">What we make</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#1A1A1A] leading-tight">
              Multiple product<br /><span className="text-[#0057FF]">categories.</span><br />Endless applications.
            </motion.h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-body text-[#6E6E73] leading-relaxed max-w-xs text-sm">
              From a single brochure holder to a full motorised signage network, we manufacture it all.
            </p>
            <div className="flex items-center gap-5">
              <button onClick={() => goTo(current - 1)} disabled={current === 0}
                className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center
                           text-[#6E6E73] hover:border-[#AEAEB2] hover:text-[#1A1A1A] hover:bg-[#F9F9FB]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button onClick={() => goTo(current + 1)} disabled={current === products.length - 1}
                className="w-10 h-10 rounded-full border border-[#E0E0E0] flex items-center justify-center
                           text-[#6E6E73] hover:border-[#AEAEB2] hover:text-[#1A1A1A] hover:bg-[#F9F9FB]
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
             <Link
  href="/products"
  className="group inline-flex items-center gap-1.5
             font-body text-sm font-medium text-[#0057FF]
             hover:text-accent
             transition-colors duration-200"
>
  View all

  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="group-hover:translate-x-0.5 transition-transform duration-200"
  >
    <path
      d="M2.5 6h7M6.5 3l3 3-3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <motion.div
          className="flex"
          style={{ gap: GAP, width: products.length * STEP }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={handleDragEnd}
          animate={{ x: window.innerWidth / 2 - CARD_WIDTH / 2 - current * STEP}}animate={{ x: typeof window !== 'undefined' ? window.innerWidth / 2 - CARD_WIDTH / 2 - current * STEP : 0 }}
          transition={{type: "spring",
          stiffness: 110,
          damping: 22,
          mass: 1.9
          }}
        >
          {products.map((product, i) => {
            const isActive = i === current;
            return (
              <motion.div
                key={product.id}
                animate={{ scale: isActive ? 1 : 0.91, opacity: isActive ? 1 : 0.55 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] flex-shrink-0"
                style={{ width: CARD_WIDTH, background: product.color }}
                onClick={() => { if (!isDragging.current) goTo(i); }}
              >
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ height: 300 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.99) saturate(1.02)", pointerEvents: "none" }}
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-5 font-display font-bold text-3xl text-white/90 drop-shadow-sm">
                    {product.id}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={e => { if (isDragging.current) e.preventDefault(); }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90
                               backdrop-blur-sm flex items-center justify-center
                               hover:bg-[#0057FF] transition-colors duration-200 shadow-sm">
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Text area */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-[#1A1A1A] mb-1.5">{product.name}</h3>
                  <p className="font-body text-sm text-[#6E6E73] leading-relaxed line-clamp-2">{product.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Progress dots + counter */}
      <div className="container-wide mt-8 flex items-center gap-2">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-2 bg-[#0057FF]"
                : "w-2 h-2 bg-[#E0E0E0] hover:bg-[#AEAEB2]"
            }`}
          />
        ))}
        <span className="ml-auto font-body text-xs text-[#AEAEB2] tabular-nums">
          {current + 1} / {products.length}
        </span>
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

        <div className="container-wide flex flex-col gap-8">
          <div className="max-w-4xl">
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
               <br />
  <br />
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-5 flex-wrap mb-6">
              <Link href="/quote"
                className="group inline-flex items-center gap-2
                           h-10 px-12 rounded-full
                           bg-[#3B82F6] text-white font-body font-semibold text-[15px] tracking-[-0.01em]
                           border-2 border-amber-30
                           shadow-[0_1px_2px_rgba(0,0,0,0.06),0_3px_12px_rgba(0,87,255,0.20)]
                           hover:bg-accent-hover hover:-translate-y-px
                           hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,87,255,0.28)]
                           active:scale-[0.97] active:translate-y-0
                           transition-all duration-200">
                Get a Quote 
                
              </Link>
              <Link href="/products"
                className="group inline-flex items-center gap-2
                           h-12 px-3
                           font-body font-medium text-[15px] text-text-secondary
                           hover:text-text-primary
                           transition-colors duration-200">
                Browse products
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-2 mt-10">
            <div className="w-5 h-8 rounded-full border border-[#E0E0E0] flex items-start justify-center pt-1.5">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1.5 rounded-full bg-[#AEAEB2]" />
            </div>
            <span className="font-body text-xs text-[#AEAEB2]">Scroll to explore</span>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-[#E0E0E0] py-16 bg-surface">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => <StatItem key={stat.label} {...stat} index={i} />)}
          </div>
        </div>
      </section>
      <br/><br/>

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-4xl">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest mb-6">Who we are</motion.p>

            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[clamp(1.75rem,4vw,3.5rem)] text-[#1A1A1A] leading-tight">
              B & B has been the{" "}
              <span className="italic text-[#6E6E73]">manufacturing backbone</span>
              {" "}of India's most recognised brand displays.<br /> <br/>
  
            </motion.h2>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 pt-10 border-t border-[#E0E0E0] grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="font-body text-[#6E6E73] leading-relaxed">
                From Airtel retail stores to pharmacy counters, from bank branches to FMCG shelves.
              </p>
              <p className="font-body text-[#6E6E73] leading-relaxed">
                We specialise in acrylic fabrication and blow-moulded plastic displays, manufactured with precision at our GT Karnal Road Facility <br/><br/>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal carousel */}
      <CardCarousel />

      {/* Industries */}
      <section className="py-24 md:py-32 border-t border-[#E0E0E0] ">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                className="font-body text-xs text-[#AEAEB2] uppercase tracking-widest mb-3">Where we work</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
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
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}>
                <Link href="/industries" className="industry-pill">{ind}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <br/>

      {/* How it works */}
      <section className="py-24 md:py-32 bg-[#1A1A1A]">
        <div className="container-wide">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
            className="font-body text-xs text-white/40 uppercase tracking-widest mb-4">The process</motion.p><br/>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
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
                viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                          items-start md:items-center justify-between gap-10 bg-surface">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(1.75rem,3.5vw,3rem)] text-[#1A1A1A] mb-4">
                <br/> Ready to build something<br /><span className="text-[#0057FF]">remarkable?</span>
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-body text-[#6E6E73] max-w-md leading-relaxed">
                Tell us what you need. We'll quote you within 24 hours. No minimum order for first-time clients.
              </motion.p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto md:min-w-[200px]">
              <Link href="/quote"
                className="group inline-flex items-center justify-center gap-2
                           h-12 px-7 rounded-full w-full
                           bg-[#3B82F6] text-white font-body font-semibold text-[15px] tracking-[-0.01em]
                           shadow-[0_1px_2px_rgba(0,0,0,0.06),0_3px_12px_rgba(0,87,255,0.20) border-2 border-amber-300]
                           hover:bg-accent-hover hover:-translate-y-px
                           hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,87,255,0.28)]
                           active:scale-[0.97] active:translate-y-0
                           transition-all duration-200">
                Request a Quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5
                           h-12 px-7 rounded-full w-full
                           bg-white text-[#1A1A1A] font-body font-medium text-[15px]
                          border-2 border-amber-30 hover:border-[#8E8E93] hover:bg-[#FAFAFA]
                           active:scale-[0.97]
                           transition-all duration-200">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366">
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