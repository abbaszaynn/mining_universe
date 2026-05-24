import { getNews, getCompanies } from "@/lib/data";
import { BlogListingExperience } from "@/components/blog/BlogListingExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Blogs & Insights",
  description:
    "Field notes and geological insights on mining potential, mineral discoveries, and investment opportunities in Gilgit Baltistan.",
  path: "/news",
});

export default async function NewsPage() {
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
