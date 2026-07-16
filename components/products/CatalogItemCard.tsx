import Link from "next/link";
import ProductMedia from "@/components/products/ProductMedia";
import DiagonalArrowIcon from "@/components/shared/icons/DiagonalArrowIcon";
import type { CatalogItem } from "@/data/catalog";

// Item-level tile used on category pages and item detail pages.
// Mirrors ProductCard's structure; `color` comes from the parent
// category so items visually belong to their category.
export default function CatalogItemCard({
  item,
  color,
  sizes,
  showDescription = true,
}: {
  item: CatalogItem;
  color: string;
  sizes: string;
  showDescription?: boolean;
}) {
  return (
    <Link
      href={`/products/${item.categorySlug}/${item.slug}`}
      className="card group"
      style={{ background: color }}
    >
      <div className="p-4 pb-0">
        <div className="relative overflow-hidden rounded-xl h-48">
          <ProductMedia
            product={item}
            sizes={sizes}
            className="group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
      </div>
      <div className="p-5 bg-white/60">
        <p className="font-body text-[11px] uppercase tracking-[0.12em] text-text-faint mb-1.5">
          {item.sku}
        </p>
        <div className="flex items-center justify-between gap-3 mb-1">
          <h3 className="font-display font-bold text-base text-text-primary">
            {item.name}
          </h3>
          <span
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0
                       text-text-secondary group-hover:bg-accent group-hover:text-white
                       transition-colors duration-200 shadow-sm"
            aria-hidden="true"
          >
            <DiagonalArrowIcon size={12} />
          </span>
        </div>
        {showDescription && (
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {item.desc}
          </p>
        )}
      </div>
    </Link>
  );
}
