import { LandingPage } from "@/components/landing/LandingPage";
import type { PressArticle } from "@/components/landing/PressInsightsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCompanies, getLatestNews } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";
import { articleTags } from "@/lib/article-tags";

const NEW_FOR_DAYS = 14;

// Re-render hourly so a newly published article takes the lead slot, and the
// "New" tag expires, without waiting for a deploy.
export const revalidate = 3600;

export default async function Home() {
  const [latest, companies] = await Promise.all([getLatestNews(4), getCompanies()]);
  const companyNames = Object.fromEntries(companies.map((c) => [c.id, c.name]));
  const now = Date.now();

  // Trimmed to what the Press & Insights section renders, so full article
  // bodies stay on the server.
  const latestArticles: PressArticle[] = latest.map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    imageUrl: article.imageUrl,
    publishDate: article.publishDate,
    companyName: article.companyId ? companyNames[article.companyId] : undefined,
    tags: articleTags(article),
    isNew: now - new Date(article.publishDate).getTime() < NEW_FOR_DAYS * 86_400_000,
  }));

  const base = getSiteUrl();

  return (
    <>
      {latestArticles.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Latest Press & Insights",
            itemListElement: latestArticles.map((article, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${base}/news/${article.id}`,
              name: article.title,
            })),
          }}
        />
      )}
      <LandingPage latestArticles={latestArticles} />
    </>
  );
}
