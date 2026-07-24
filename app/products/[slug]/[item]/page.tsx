import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageLightbox from "@/components/products/ImageLightbox";
import CatalogItemCard from "@/components/products/CatalogItemCard";
import AddToQuoteButton from "@/components/quote/AddToQuoteButton";
import AddToCartButton from "@/components/commerce-cart/AddToCartButton";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { getProduct } from "@/data/products";
import { catalog, getCatalogItem, getItemsByCategory, DEFAULT_LEAD_TIME } from "@/data/catalog";
import { formatPrice } from "@/lib/pricing";
import CheckIcon from "@/components/shared/icons/CheckIcon";

type Props = { params: Promise<{ slug: string; item: string }> };

export function generateStaticParams() {
  return catalog.map((i) => ({ slug: i.categorySlug, item: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, item: itemSlug } = await params;
  const item = getCatalogItem(itemSlug);
  if (!item || item.categorySlug !== slug) return {};
  return {
    title: item.name,
    description: item.desc,
    alternates: { canonical: `/products/${item.categorySlug}/${item.slug}` },
    openGraph: {
      title: item.name,
      description: item.desc,
    },
  };
}

export default async function CatalogItemPage({ params }: Props) {
  const { slug, item: itemSlug } = await params;
  const item = getCatalogItem(itemSlug);
  const category = getProduct(slug);
  if (!item || !category || item.categorySlug !== slug) notFound();

  const siblings = getItemsByCategory(slug)
    .filter((i) => i.slug !== item.slug)
    .slice(0, 3);

  return (
    <div className="bg-background">
      <div className="container-wide pt-28 md:pt-36 pb-20 md:pb-28">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-body text-sm text-text-faint">
            <li>
              <Link href="/products" className="hover:text-accent transition-colors duration-200">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/products/${category.slug}`}
                className="hover:text-accent transition-colors duration-200"
              >
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-secondary">
              {item.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Media */}
          <div
            className="relative rounded-2xl overflow-hidden aspect-4/3"
            style={{ background: category.color }}
          >
            <ImageLightbox
              product={item}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Details */}
          <div>
            <span className="section-label">SKU {item.sku}</span>
            <h1 className="section-heading-lg mb-3">{item.name}</h1>
            <p className="font-display font-bold text-2xl text-text-primary mb-6">
              {formatPrice(item.price)}
              <span className="font-body font-normal text-sm text-text-faint ml-2">
                inclusive of all taxes
              </span>
            </p>
            <p className="font-body text-lg text-text-secondary leading-relaxed mb-10">
              {item.longDesc}
            </p>

            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
              Highlights
            </h2>
            <ul className="flex flex-col gap-3 mb-10">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 font-body text-text-secondary">
                  <CheckIcon size={16} className="mt-1.5 shrink-0 text-accent" />
                  {highlight}
                </li>
              ))}
            </ul>

            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-text-primary mb-4">
              Specifications
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-12">
              {[...item.specs, { label: "Lead time", value: item.leadTime ?? DEFAULT_LEAD_TIME }].map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-2"
                >
                  <dt className="font-body text-sm text-text-faint">{spec.label}</dt>
                  <dd className="font-body text-sm text-text-primary text-right">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <AddToCartButton
                slug={item.slug}
                price={item.price}
                outOfStock={item.stock === "out-of-stock"}
              />
              <WishlistButton slug={item.slug} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <AddToQuoteButton slug={item.slug} name={item.name} variant="secondary" />
            </div>

            <p className="font-body text-sm text-text-secondary mt-6">
              Need a different size, colour or branding?{" "}
              <Link
                href={`/quote?product=${item.slug}`}
                className="text-accent hover:text-accent-hover font-medium transition-colors duration-200"
              >
                Customize this product
              </Link>{" "}
              (volume pricing available on request).
            </p>
          </div>
        </div>

        {/* Siblings */}
        {siblings.length > 0 && (
          <div className="mt-24">
            <h2 className="section-heading-md mb-8">
              More {category.name.toLowerCase()}
              <span className="text-accent">.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {siblings.map((sibling) => (
                <CatalogItemCard
                  key={sibling.sku}
                  item={sibling}
                  color={category.color}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  showDescription={false}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
