import Link from "next/link";
import ProductMedia from "@/components/products/ProductMedia";
import DiagonalArrowIcon from "@/components/shared/icons/DiagonalArrowIcon";
import type { Product } from "@/data/products";

// Shared product-tile markup used by the /products grid and the
// /products/[slug] related-products strip. imageHeight and the
// description/view-arrow toggles cover the two current use cases;
// add more props here rather than re-forking the markup.
export default function ProductCard({
  product,
  priority = false,
  sizes,
  imageHeight = "h-64",
  showDescription = true,
  showViewArrow = true,
}: {
  product: Product;
  priority?: boolean;
  sizes: string;
  imageHeight?: string;
  showDescription?: boolean;
  showViewArrow?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="card group"
      style={{ background: product.color }}
    >
      <div className="p-4 pb-0">
        <div className={`relative overflow-hidden rounded-xl ${imageHeight}`}>
          <ProductMedia
            product={product}
            sizes={sizes}
            priority={priority}
            className="group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
      </div>
      <div className={showDescription ? "p-6 bg-white/60" : "p-5 bg-white/60"}>
        <div className={showViewArrow ? "flex items-center justify-between mb-2" : ""}>
          <h2
            className={
              showDescription
                ? "font-display font-bold text-lg text-text-primary"
                : "font-display font-bold text-base text-text-primary"
            }
          >
            {product.name}
          </h2>
          {showViewArrow && (
            <span
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0
                         text-text-secondary group-hover:bg-accent group-hover:text-white
                         transition-colors duration-200 shadow-sm"
              aria-hidden="true"
            >
              <DiagonalArrowIcon size={12} />
            </span>
          )}
        </div>
        {showDescription && (
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {product.desc}
          </p>
        )}
      </div>
    </Link>
  );
}
