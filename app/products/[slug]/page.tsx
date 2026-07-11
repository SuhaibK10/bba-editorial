import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductMedia from "@/components/products/ProductMedia";
import ProductCard from "@/components/products/ProductCard";
import AddToQuoteButton from "@/components/quote/AddToQuoteButton";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { products, getProduct } from "@/data/products";
import CheckIcon from "@/components/shared/icons/CheckIcon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.longDesc,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.desc,
      ...(product.image && !product.video ? { images: [product.image] } : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="bg-background">
      <div className="container-wide pt-28 md:pt-36 pb-20 md:pb-28">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 font-body text-sm text-text-faint">
            <li>
              <Link href="/products" className="hover:text-accent transition-colors duration-200">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-secondary">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Media */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3]"
            style={{ background: product.color }}
          >
            <ProductMedia
              product={product}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Details */}
          <div>
            <span className="section-label">Category {product.id}</span>
            <h1 className="section-heading-lg mb-6">{product.name}</h1>
            <p className="font-body text-lg text-text-secondary leading-relaxed mb-10">
              {product.longDesc}
            </p>

            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
              Highlights
            </h2>
            <ul className="flex flex-col gap-3 mb-12">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 font-body text-text-secondary">
                  <CheckIcon size={16} className="mt-1.5 shrink-0 text-accent" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <AddToQuoteButton slug={product.slug} name={product.name} />
              <WishlistButton slug={product.slug} />
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="mt-24">
          <h2 className="section-heading-md mb-8">
            More from <span className="text-accent">the range.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                sizes="(max-width: 640px) 100vw, 33vw"
                imageHeight="h-48"
                showDescription={false}
                showViewArrow={false}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
