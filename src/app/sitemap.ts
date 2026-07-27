import type { MetadataRoute } from "next";
import { getAllProducts } from "@/data/products";
import { getAllPosts } from "@/data/journal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maisonvela.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/journal",
    "/contact",
    "/faq",
    "/shipping-returns",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${siteUrl}/shop/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const journalRoutes = getAllPosts().map((p) => ({
    url: `${siteUrl}/journal/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
