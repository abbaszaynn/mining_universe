import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { NEWS_ROUTES, STATIC_ROUTES } from "@/lib/sitemap-routes";
// Imported only here, not in sitemap-routes.ts — this pulls in companies-data,
// which sitemap-routes.ts is kept free of by design.
import { concessions } from "@/lib/concessions";

export const dynamic = "force-static";
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = NEWS_ROUTES.map((article) => ({
    url: `${base}/news/${article.id}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const concessionEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/concessions`,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...concessions.map((c) => ({
      url: `${base}/concessions/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return [...staticEntries, ...concessionEntries, ...articleEntries];
}
