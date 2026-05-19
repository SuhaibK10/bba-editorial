"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync with Lenis scroll position
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Drive Lenis through GSAP's ticker so scrub animations stay frame-perfect
    
    const rafCallback = (time: number) => lenis.raf(time*2000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}