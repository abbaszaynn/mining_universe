import { notFound } from "next/navigation";
import { CompanyDetail } from "@/components/companies/CompanyDetail";
import { GROUP_COMPANIES, companyConcessions, getGroupCompany } from "@/lib/group-companies";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return GROUP_COMPANIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const co = getGroupCompany(params.slug);
  if (!co) return createPageMetadata({ title: "Company Not Found", description: "This company page could not be found.", path: `/companies/${params.slug}`, noIndex: true });
  const n = companyConcessions(co).length;
  return createPageMetadata({
    title: `${co.shortName}: Mining Company in Gilgit Baltistan`,
    description: `${co.legalName}, SECP-registered (CUIN ${co.cuin}), holds ${n} licensed mining concessions in Gilgit Baltistan, Pakistan, as part of GB Mines / Durr & Zircon Consortium.`,
    path: `/companies/${co.slug}`,
  });
}

export default function CompanyPage({ params }: { params: { slug: string } }) {
  const co = getGroupCompany(params.slug);
  if (!co) notFound();
  return <CompanyDetail company={co} />;
}
