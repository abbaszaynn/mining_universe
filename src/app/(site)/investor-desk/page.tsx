import type { Metadata } from "next";
import { getInvestorDeskCompanies } from "@/lib/investor-desk-data";
import { InvestorDeskPageClient } from "@/components/contact/InvestorDeskPageClient";

export const metadata: Metadata = {
  title: "Investor Desk | GOS",
  description:
    "Submit an initial inquiry to the Game of Stones investor desk. Partner with licensed mining operators across Gilgit Baltistan.",
};

export default function InvestorDeskPage() {
  const companies = getInvestorDeskCompanies();

  return <InvestorDeskPageClient companies={companies} />;
}
