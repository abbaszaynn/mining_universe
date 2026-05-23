import dynamic from "next/dynamic";
import { getLatestNews, getCompanies } from "@/lib/data";

const LandingPage = dynamic(
  () =>
    import("@/components/landing/LandingPage").then((m) => m.LandingPage),
  { ssr: false }
);

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
