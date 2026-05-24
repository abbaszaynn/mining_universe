import { getCompanies } from "@/lib/data";
import { CompaniesExperience } from "@/components/companies/CompaniesExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mining Companies",
  description:
    "Licensed mining operators in Gilgit Baltistan — Durr Mines, Earth Lux, and Zircon Mines. Leadership, deposits, active sites, and investor-ready profiles.",
  path: "/companies",
});

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return <CompaniesExperience companies={companies} />;
}
