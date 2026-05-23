import type { Metadata } from "next";
import { getCompanies } from "@/lib/data";
import { CompaniesExperience } from "@/components/companies/CompaniesExperience";

export const metadata: Metadata = {
  title: "Mining Companies | GOS",
  description:
    "Profiles of licensed mining operators in Gilgit Baltistan, including leadership, deposits, and active sites.",
};

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return <CompaniesExperience companies={companies} />;
}
