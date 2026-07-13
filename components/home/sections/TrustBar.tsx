"use client";

import { stats } from "@/data/home-content";
import StatItem from "@/components/home/sections/StatItem";

export default function TrustBar() {
  return (
    <section className="trustbar border-y border-border py-16 bg-surface">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
