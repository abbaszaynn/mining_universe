import { notFound } from "next/navigation";
import { ConcessionDetail } from "@/components/concessions/ConcessionDetail";
import { concessions, getConcession } from "@/lib/concessions";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return concessions.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getConcession(params.slug);
  if (!c) {
    return createPageMetadata({
      title: "Concession not found",
      description: "This concession page could not be found.",
      path: `/concessions/${params.slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${c.name} — ${c.district}`,
    description: `${c.name}, a licensed ${c.type.toLowerCase()} concession in ${c.district}, Gilgit Baltistan, held by ${c.companyName}. Minerals: ${c.minerals.join(", ")}.`,
    path: `/concessions/${c.slug}`,
  });
}

export default function ConcessionPage({ params }: { params: { slug: string } }) {
  const concession = getConcession(params.slug);
  if (!concession) notFound();
  return <ConcessionDetail concession={concession} />;
}
