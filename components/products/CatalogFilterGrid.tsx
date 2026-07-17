"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { catalog } from "@/data/catalog";
import { getProduct } from "@/data/products";
import CatalogItemCard from "@/components/products/CatalogItemCard";

const selectClass =
  "w-full rounded-lg border border-border bg-white px-3.5 py-2.5 font-body text-sm " +
  "text-text-primary outline-none focus:border-accent transition-colors duration-200";

// Distinct values, in first-seen order, for a dropdown facet.
function distinct(values: string[]) {
  return Array.from(new Set(values));
}

export default function CatalogFilterGrid() {
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [type, setType] = useState("All");
  const [color, setColor] = useState("All");
  const [placement, setPlacement] = useState("All");

  const types = useMemo(() => distinct(catalog.map((i) => i.type)).sort(), []);
  const colors = useMemo(() => distinct(catalog.map((i) => i.color)).sort(), []);
  const placements = useMemo(() => distinct(catalog.map((i) => i.placement)).sort(), []);

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      if (categories.size > 0 && !categories.has(item.categorySlug)) return false;
      if (type !== "All" && item.type !== type) return false;
      if (color !== "All" && item.color !== color) return false;
      if (placement !== "All" && item.placement !== placement) return false;
      return true;
    });
  }, [categories, type, color, placement]);

  const toggleCategory = (slug: string) => {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const clearFilters = () => {
    setCategories(new Set());
    setType("All");
    setColor("All");
    setPlacement("All");
  };

  const hasActiveFilters =
    categories.size > 0 || type !== "All" || color !== "All" || placement !== "All";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-10 items-start">

      {/* Sidebar */}
      <aside className="flex flex-col gap-8">
        <div>
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
            Filter by Product Category
          </h2>
          <div className="flex flex-col gap-2.5">
            {products.map((p) => (
              <label
                key={p.slug}
                className="flex items-center gap-2.5 font-body text-sm text-text-secondary
                           hover:text-text-primary transition-colors duration-150 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={categories.has(p.slug)}
                  onChange={() => toggleCategory(p.slug)}
                  className="w-4 h-4 rounded border-border accent-accent shrink-0"
                />
                {p.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-3">
            Type
          </h2>
          <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
            <option value="All">All</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-3">
            Color
          </h2>
          <select value={color} onChange={(e) => setColor(e.target.value)} className={selectClass}>
            <option value="All">All</option>
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-3">
            Placement
          </h2>
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
            className={selectClass}
          >
            <option value="All">All</option>
            {placements.map((pl) => (
              <option key={pl} value={pl}>{pl}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-body text-sm text-accent hover:text-accent-hover font-medium
                       transition-colors duration-200 text-left"
          >
            Clear all filters
          </button>
        )}
      </aside>

      {/* Grid */}
      <div>
        <p className="font-body text-sm text-text-faint mb-6">
          {filtered.length} product{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16 gap-4 border border-border rounded-2xl">
            <p className="font-body text-text-secondary max-w-sm">
              No products match those filters yet — the full catalogue is still being imported.
            </p>
            <button type="button" onClick={clearFilters} className="btn-primary">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <CatalogItemCard
                key={item.sku}
                item={item}
                color={getProduct(item.categorySlug)?.color ?? "var(--color-surface-2)"}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
