import Image from "next/image";
import { videoPoster } from "@/lib/media";
import type { Product } from "@/data/products";

// Shared media block: Cloudinary video with poster, or next/image.
export default function ProductMedia({
  product,
  sizes,
  priority = false,
  className = "",
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
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
