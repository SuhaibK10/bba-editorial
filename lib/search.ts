import { products } from "@/data/products";
import { industryList } from "@/data/industries";

export type SearchResult = {
  type: "product" | "industry";
  label: string;
  desc: string;
  href: string;
  color: string;
};

const index: SearchResult[] = [
  ...products.map((p) => ({
    type: "product" as const,
    label: p.name,
    desc: p.desc,
    href: `/products/${p.slug}`,
    color: p.color,
  })),
  ...industryList.map((ind) => ({
    type: "industry" as const,
    label: ind.label,
    desc: ind.desc,
    href: "/industries",
    color: ind.color,
  })),
];

// Simple case-insensitive substring match over label + description,
// label matches ranked above description-only matches. Good enough for
// a ~30-item catalog; swap for fuzzy search if the catalog grows a lot.
export function search(query: string, limit = 6): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const labelMatches: SearchResult[] = [];
  const descMatches: SearchResult[] = [];

  for (const item of index) {
    if (item.label.toLowerCase().includes(q)) {
      labelMatches.push(item);
    } else if (item.desc.toLowerCase().includes(q)) {
      descMatches.push(item);
    }
  }

  return [...labelMatches, ...descMatches].slice(0, limit);
}
