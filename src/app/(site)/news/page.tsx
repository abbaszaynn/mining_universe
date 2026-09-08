import { getNews, getCompanies } from "@/lib/data";
import { BlogListingExperience } from "@/components/blog/BlogListingExperience";
import { createPageMetadata } from "@/lib/seo";
import { assertSitemapNewsInSync } from "@/lib/sitemap-audit";

export const metadata = createPageMetadata({
  title: "Blogs & Insights",
  description:
    "Field notes and geological insights on mining potential, mineral discoveries, and investment opportunities in Gilgit Baltistan.",
  path: "/news",
});

export default async function NewsPage() {
  // Dev-only: warns if an article was added to data.ts without a matching
  // NEWS_ROUTES entry (or vice versa), which would leave it out of
  // sitemap.xml. Checked here rather than in sitemap.ts, which is
  // deliberately kept free of the data.ts import chain.
  assertSitemapNewsInSync();

  const [articles, companies] = await Promise.all([
    getNews(),
    getCompanies(),
  ]);

  const companyNames = Object.fromEntries(
    companies.map((company) => [company.id, company.name])
  );

  return (
    <BlogListingExperience articles={articles} companyNames={companyNames} />
  );
}
