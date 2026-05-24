import { getLatestNews, getCompanies } from "@/lib/data";
import { LandingPage } from "@/components/landing/LandingPage";

export default async function Home() {
  const [latestArticles, companies] = await Promise.all([
    getLatestNews(3),
    getCompanies(),
  ]);

  const companyNames = Object.fromEntries(
    companies.map((company) => [company.id, company.name])
  );

  const companyProfiles = companies.map(({ id, name, logoUrl, status }) => ({
    id,
    name,
    logoUrl,
    status,
  }));

  return (
    <LandingPage
      latestArticles={latestArticles}
      companyNames={companyNames}
      companies={companyProfiles}
    />
  );
}
