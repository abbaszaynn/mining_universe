import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { JsonLd } from "@/components/seo/JsonLd";
import { GROUP_COMPANIES, companyConcessions, formatIncorporated } from "@/lib/group-companies";
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Mining Companies: Durr, Zircon & Earth Lux Mines",
  description:
    "GB Mines (Durr & Zircon Consortium) is three SECP-registered mining companies: Durr Mine & Minerals, Zircon Mines and Earth Lux Mines & Minerals, holding ten licensed concessions in Gilgit Baltistan, Pakistan.",
  path: "/companies",
});

export default function CompaniesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mining companies of GB Mines / Durr & Zircon Consortium",
    itemListElement: GROUP_COMPANIES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/companies/${c.slug}`),
      name: c.legalName,
    })),
  };
  return (
    <main className="relative bg-bone-50">
      <JsonLd data={[itemList, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Companies" }])]} />
      <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Our companies</Pill>
          <h1 className="mt-6 max-w-[26ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            Three registered mining companies, one consortium
          </h1>
          <p className="mt-8 max-w-[68ch] text-lg leading-[1.55] text-graphite-600 md:text-xl">
            GB Mines, trading as Durr &amp; Zircon Consortium, is the combined name for three companies
            registered with the Securities and Exchange Commission of Pakistan. Each holds its own mining
            licences in Gilgit Baltistan; together they hold ten concessions across seven districts.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {GROUP_COMPANIES.map((c) => {
              const blocks = companyConcessions(c);
              return (
                <Link
                  key={c.slug}
                  href={`/companies/${c.slug}`}
                  className="group flex flex-col rounded-sm border border-graphite-950/10 bg-bone-100 p-7 transition hover:-translate-y-1 hover:border-copper-500/40"
                >
                  <span className="text-xs uppercase tracking-[0.12em] text-copper-600">
                    {blocks.length} licensed {blocks.length === 1 ? "block" : "blocks"}
                  </span>
                  <h2 className="mt-3 text-xl text-graphite-950 group-hover:text-copper-700">{c.legalName}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-graphite-600">{c.summary}</p>
                  <p className="mt-5 text-xs text-graphite-500">
                    SECP CUIN {c.cuin} · incorporated {formatIncorporated(c.incorporatedOn)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
