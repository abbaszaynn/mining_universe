import { getInvestorDeskCompanies } from "@/lib/investor-desk-data";
import { InvestorDeskPageClient } from "@/components/contact/InvestorDeskPageClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Investor Desk",
  description:
    "Partner with Game of Stones. Submit an inquiry to connect with licensed mining operators in Gilgit Baltistan — field visits, due diligence, and global investment opportunities.",
  path: "/investor-desk",
});

export default function InvestorDeskPage() {
  const companies = getInvestorDeskCompanies();

  return <InvestorDeskPageClient companies={companies} />;
}
