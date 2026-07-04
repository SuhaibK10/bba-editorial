"use client";

import { motion } from "framer-motion";

// Desktop (md+) sees a coming-soon gate; mobile (<md) sees the real site.
// Both subtrees render on the server. The split is pure CSS (`hidden`/`md:hidden`)
// so there is no hydration mismatch and no flash of the wrong version.
export default function DesktopGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden md:flex min-h-svh flex-col items-center justify-center bg-[#0F3634] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-md"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#E3B15C] flex items-center justify-center mb-8">
            <span className="text-[#0F3634] font-display font-bold text-2xl leading-none">B</span>
          </div>

          <span className="font-body text-xs text-white/50 uppercase tracking-widest mb-4">
            B &amp; B Appliances · Since 1991
          </span>

          <p className="font-display font-bold text-xl md:text-2xl text-white leading-tight tracking-tight mb-6">
            India&apos;s most trusted acrylic manufacturer.
          </p>

          <h1 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4">
            Our desktop experience
            <br />
            is coming soon.
          </h1>

          <p className="font-body text-white/60 leading-relaxed mb-8">
            We&apos;ve built this site mobile-first. For the full experience today,
            please open this page on your phone.
          </p>

          <div className="flex items-center gap-2 text-white/40 font-body text-xs uppercase tracking-widest">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Best viewed on mobile
          </div>
        </motion.div>
      </div>

      <div className="md:hidden">{children}</div>
    </>
  );
}
