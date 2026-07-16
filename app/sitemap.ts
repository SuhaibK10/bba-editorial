import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { catalog } from "@/data/catalog";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/products`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/quote`, changeFrequency: "yearly", priority: 0.9 },
    { url: `${site.url}/industries`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const itemPages: MetadataRoute.Sitemap = catalog.map((i) => ({
    url: `${site.url}/products/${i.categorySlug}/${i.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...itemPages];
}
