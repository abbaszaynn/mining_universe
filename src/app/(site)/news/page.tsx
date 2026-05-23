import type { Metadata } from "next";
import { getNews, getCompanies } from "@/lib/data";
import { BlogListingExperience } from "@/components/blog/BlogListingExperience";

export const metadata: Metadata = {
  title: "Blogs & Insights | GOS",
  description:
    "Articles on mining potential, geological discoveries, and investment opportunities in Gilgit Baltistan.",
};

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
