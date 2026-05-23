import type { Metadata } from "next";
import { getCompanies } from "@/lib/data";
import { DocumentsVaultExperience } from "@/components/documents/DocumentsVaultExperience";

export const metadata: Metadata = {
  title: "Documents | GOS",
  description:
    "Geological reports, licenses, and concession papers from licensed mining operators in Gilgit Baltistan.",
};

export default async function DocumentsPage() {
  const companies = await getCompanies();

  return <DocumentsVaultExperience companies={companies} />;
}
