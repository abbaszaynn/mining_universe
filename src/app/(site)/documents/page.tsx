import { getCompanies } from "@/lib/data";
import { DocumentsVaultExperience } from "@/components/documents/DocumentsVaultExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Documents Vault",
  description:
    "Geological reports, mining licenses, incorporation letters, and concession documents from licensed operators in Gilgit Baltistan for investor due diligence.",
  path: "/documents",
});

export default async function DocumentsPage() {
  const companies = await getCompanies();

  return <DocumentsVaultExperience companies={companies} />;
}
