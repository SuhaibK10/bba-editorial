import Image from "next/image";
import { videoPoster } from "@/lib/media";
import type { ProductMedia as ProductMediaFields } from "@/data/products";

// Shared media block: Cloudinary video with poster, next/image,
// or a styled placeholder for categories awaiting photography.
// Accepts anything with a name plus the media fields, so both
// category entries (products.ts) and catalog items (catalog.ts) work.
export default function ProductMedia({
  product,
  sizes,
  priority = false,
  className = "",
}: {
  product: { name: string } & ProductMediaFields;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!product.image) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center gap-3 ${className}`}
        role="img"
        aria-label={product.name}
      >
        {/* Layered acrylic sheets mark */}
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="text-accent opacity-25">
          <rect x="10" y="18" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" />
          <rect x="17" y="12" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
          <rect x="24" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
        </svg>
        <span className="font-body text-[11px] uppercase tracking-[0.12em] text-text-faint">
          Made to order
        </span>
      </div>
    );
  }
  if (product.video) {
    return (
      <video
        src={product.image}
        poster={videoPoster(product.image)}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={product.name}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }
  return (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      draggable={false}
    />
  );
}
