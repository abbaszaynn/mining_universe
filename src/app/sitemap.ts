import type { MetadataRoute } from "next";
import { getNews } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getNews();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/companies"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/map"), changeFrequency: "monthly", priority: 0.85 },
    { url: absoluteUrl("/gallery"), changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/news"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/documents"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.75 },
    { url: absoluteUrl("/investor-desk"), changeFrequency: "monthly", priority: 0.9 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/news/${article.id}`),
    lastModified: new Date(article.publishDate),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
