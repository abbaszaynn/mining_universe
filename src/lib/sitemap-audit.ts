import { news } from "@/lib/data";
import { NEWS_ROUTES } from "@/lib/sitemap-routes";

/**
 * Guards the one piece of duplicated state in the sitemap: `NEWS_ROUTES` in
 * `sitemap-routes.ts` has to mirror the `news` array in `data.ts`, and nothing
 * structural stops the two drifting apart.
 *
 * Drift is silent in the worst way. An article missing from `NEWS_ROUTES`
 * still renders, still has metadata, still works if you click to it, and is
 * simply never announced in sitemap.xml. That happened to the serpentine
 * article on 2026-09-08 and was only caught by manually diffing the two.
 *
 * Returns the differences rather than throwing, so callers decide how loud to
 * be. `assertSitemapNewsInSync` warns in development and stays silent in
 * production, where a console warning helps nobody.
 */
export function diffSitemapNews() {
  const articleIds = new Set(news.map((article) => article.id));
  const routeIds = new Set(NEWS_ROUTES.map((route) => route.id));

  return {
    /** In data.ts but not in the sitemap: invisible to search engines. */
    missingFromSitemap: news
      .map((article) => article.id)
      .filter((id) => !routeIds.has(id)),
    /** In the sitemap but not in data.ts: sitemap.xml advertising a 404. */
    missingFromData: NEWS_ROUTES.map((route) => route.id).filter(
      (id) => !articleIds.has(id)
    ),
  };
}

export function assertSitemapNewsInSync() {
  if (process.env.NODE_ENV === "production") return;

  const { missingFromSitemap, missingFromData } = diffSitemapNews();

  if (missingFromSitemap.length) {
    console.warn(
      `[sitemap] ${missingFromSitemap.length} article(s) in data.ts are missing from NEWS_ROUTES ` +
        `and will not appear in sitemap.xml: ${missingFromSitemap.join(", ")}`
    );
  }

  if (missingFromData.length) {
    console.warn(
      `[sitemap] ${missingFromData.length} entr(ies) in NEWS_ROUTES have no matching article in data.ts ` +
        `and will point sitemap.xml at a 404: ${missingFromData.join(", ")}`
    );
  }
}
