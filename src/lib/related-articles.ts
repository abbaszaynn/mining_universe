import type { NewsArticle } from "@/lib/types";
import { articleTags } from "@/lib/article-tags";

/**
 * Internal-link selection for articles.
 *
 * Until Nov 2026 every article's "More from the field" took the first three
 * entries of the news array, which is ordered oldest first, so all 15+
 * articles linked to the same three old pieces and every newer article had
 * almost no inbound internal links. That is the textbook cause of
 * "Discovered, currently not indexed" in Search Console. These helpers
 * spread links across the whole archive instead.
 */

const byNewest = (a: NewsArticle, b: NewsArticle) =>
  new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();

/**
 * Three related articles: the newest other article first (so every fresh
 * piece is linked from every article page the moment it is published), then
 * the closest topical matches by shared tags, ties broken by publish date
 * proximity so the archive's middle gets linked too.
 */
export function relatedArticles(article: NewsArticle, all: NewsArticle[], count = 3): NewsArticle[] {
  const others = all.filter((a) => a.id !== article.id);
  if (others.length === 0) return [];

  const newest = [...others].sort(byNewest)[0];
  const tags = new Set(articleTags(article));
  const t0 = new Date(article.publishDate).getTime();

  const ranked = others
    .filter((a) => a.id !== newest.id)
    .map((a) => ({
      a,
      shared: articleTags(a).filter((t) => tags.has(t)).length,
      distance: Math.abs(new Date(a.publishDate).getTime() - t0),
    }))
    .sort((x, y) => y.shared - x.shared || x.distance - y.distance)
    .map((x) => x.a);

  return [newest, ...ranked].slice(0, count);
}

/** Articles whose body links to `path` (e.g. "/concessions/hilal-abad-..."), newest first. */
export function articlesLinkingTo(path: string, all: NewsArticle[], count = 3): NewsArticle[] {
  const needle = `](${path})`;
  return all.filter((a) => a.content.includes(needle)).sort(byNewest).slice(0, count);
}
