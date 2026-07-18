"use client";

import { useMemo, useState } from "react";
import { products, getProduct } from "@/data/products";
import { catalog, type CatalogItem } from "@/data/catalog";
import CatalogItemCard from "@/components/products/CatalogItemCard";

const selectClass =
  "font-body text-xs uppercase tracking-wider bg-transparent border border-border rounded-lg " +
  "text-text-secondary px-3 py-2 outline-none cursor-pointer " +
  "hover:border-text-primary hover:text-text-primary focus:border-accent transition-colors duration-200";

type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A–Z", value: "name-asc" },
];

function sortItems(items: CatalogItem[], sort: SortKey) {
  if (sort === "featured") return items;
  return [...items].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
}

export default function CatalogFilterGrid() {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const categoriesWithItems = useMemo(
    () => products.filter((p) => catalog.some((i) => i.categorySlug === p.slug)),
    []
  );

  const filtered = useMemo(() => {
    if (category === "all") return catalog;
    return catalog.filter((item) => item.categorySlug === category);
  }, [category]);

  const sorted = sortItems(filtered, sort);

  return (
    <div>
      {/* Category pills */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`font-body text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-colors duration-200 ${
            category === "all"
              ? "bg-accent text-white border-accent"
              : "bg-transparent text-text-secondary border-border hover:border-text-primary hover:text-text-primary"
          }`}
        >
          All
        </button>
        {categoriesWithItems.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setCategory(p.slug)}
            className={`font-body text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-colors duration-200 ${
              category === p.slug
                ? "bg-accent text-white border-accent"
                : "bg-transparent text-text-secondary border-border hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Sort + count */}
      <div className="flex flex-wrap items-center justify-end gap-4 mb-8 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-body text-xs uppercase tracking-wider text-text-faint">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={selectClass}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <span className="font-body text-xs text-text-faint whitespace-nowrap">
            {sorted.length} product{sorted.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center text-center py-16 gap-4 border border-border rounded-2xl">
          <p className="font-body text-text-secondary max-w-sm">
            No products match that category yet — the full catalogue is still being imported.
          </p>
          <button type="button" onClick={() => setCategory("all")} className="btn-primary">
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
          {sorted.map((item) => (
            <CatalogItemCard
              key={item.sku}
              item={item}
              color={getProduct(item.categorySlug)?.color ?? "var(--color-surface-2)"}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              showDescription={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
