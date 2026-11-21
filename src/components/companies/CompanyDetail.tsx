import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/faq/FaqSection";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { FaqItem } from "@/lib/faq-data";
import {
  GROUP_COMPANIES,
  companyConcessions,
  formatIncorporated,
  secpVerifyUrl,
  type GroupCompany,
} from "@/lib/group-companies";

/**
 * One page per registered company. The opening paragraph is written as the
 * direct answer to "what is <company>?", which is what answer engines lift,
 * and every fact on the page comes from the SECP certificate or the
 * concession registry, so nothing here can drift from the source documents.
 */
export function CompanyDetail({ company: co }: { company: GroupCompany }) {
  const blocks = companyConcessions(co);
  const producing = blocks.filter((b) => b.status === "Operational");
  const minerals = Array.from(new Set(blocks.flatMap((b) => b.minerals.map((m) => m.split(",")[0].trim())))).slice(0, 8);
  const districts = Array.from(new Set(blocks.map((b) => b.district.split(",").pop()!.trim())));
  const incorporated = formatIncorporated(co.incorporatedOn);
  const siblings = GROUP_COMPANIES.filter((c) => c.slug !== co.slug);
  const url = absoluteUrl(`/companies/${co.slug}`);

  const answer = `${co.legalName} is a Pakistani mining company incorporated with the Securities and Exchange Commission of Pakistan on ${incorporated} (Corporate Unique Identification No. ${co.cuin}). It is one of three licence-holding companies of GB Mines, trading as ${SITE.legalName}, and holds ${blocks.length} licensed ${blocks.length === 1 ? "concession" : "concessions"} in Gilgit Baltistan${producing.length ? `, ${producing.length} of them producing` : ""}.`;

  const faqs: FaqItem[] = [
    {
      question: `Is ${co.legalName} a registered company?`,
      answer: `Yes. It was incorporated under the Companies Act, 2017 at ${co.incorporatedAt} on ${incorporated}, with Corporate Unique Identification No. ${co.cuin}. The registration can be checked directly on the SECP's company verification service, and a view-only copy of the certificate of incorporation is on our documents page.`,
    },
    {
      question: `What does ${co.shortName} mine?`,
      answer: `Across its ${blocks.length} licensed blocks, at ${districts.join(", ")}, the registry records ${minerals.join(", ").toLowerCase()}. ${producing.length ? `${producing.map((b) => b.name).join(" and ")} ${producing.length === 1 ? "is" : "are"} producing; the rest are at exploration stage.` : "All of its blocks are at exploration stage."}`,
    },
    {
      question: `How is ${co.shortName} related to Durr & Zircon Consortium and GB Mines?`,
      answer: `${SITE.legalName}, which trades as GB Mines at gbmines.com, is the combined name for three separately registered companies: Durr Mine & Minerals, Zircon Mines and Earth Lux Mines & Minerals. Each holds its own licences. Investors and buyers deal with the consortium as one counterparty, and contracts are signed by the company that holds the relevant licence.`,
    },
    ...(co.forSale
      ? [
          {
            question: `Is ${co.shortName} for sale?`,
            answer: `Yes. ${co.legalName} is offered for outright acquisition, including its licensed blocks. Enquiries go through the investor desk, and the licence documents and field data are shared with verified buyers under NDA.`,
          },
        ]
      : []),
  ];

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#organization`,
    name: co.legalName,
    legalName: co.legalName,
    alternateName: [co.shortName, co.holder],
    url,
    foundingDate: co.incorporatedOn,
    foundingLocation: { "@type": "Place", name: `${co.incorporatedAt}, Pakistan` },
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SECP Corporate Unique Identification No.",
      value: co.cuin,
      url: secpVerifyUrl(co.cuin),
    },
    parentOrganization: { "@id": `${absoluteUrl("/")}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: { "@type": "AdministrativeArea", name: "Gilgit Baltistan, Pakistan" },
    knowsAbout: minerals,
    employee: co.leadership.map((l) => ({ "@type": "Person", name: l.name, jobTitle: l.role })),
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Companies", path: "/companies" },
    { name: co.legalName },
  ]);

  const facts: [string, React.ReactNode][] = [
    ["Registered name", co.legalName],
    [
      "SECP registration",
      <>
        CUIN {co.cuin} ·{" "}
        <a href={secpVerifyUrl(co.cuin)} target="_blank" rel="noopener noreferrer" className="text-copper-600 underline underline-offset-4">
          verify on SECP
        </a>
      </>,
    ],
    ["Incorporated", `${incorporated}, ${co.incorporatedAt}`],
    ["Group", `${SITE.legalName} (GB Mines)`],
    ["Licensed blocks", `${blocks.length}${producing.length ? `, ${producing.length} producing` : ""}`],
    ["Locations", districts.join(", ")],
    ["Office", SITE.address.full],
  ];

  return (
    <>
      <JsonLd data={[orgSchema, breadcrumbs]} />
      <main className="relative bg-bone-50">
        <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <nav aria-label="Breadcrumb" className="text-xs text-graphite-400">
              <Link href="/companies" className="hover:text-graphite-950">Companies</Link>
              <span className="mx-2">/</span>
              <span className="text-graphite-500">{co.shortName}</span>
            </nav>
            <div className="mt-6 flex flex-wrap gap-3">
              <Pill>Mining company · Gilgit Baltistan</Pill>
              {co.forSale && <Pill>Available for acquisition</Pill>}
            </div>
            <h1 className="mt-6 max-w-[24ch] text-display-lg tracking-[-0.035em] text-graphite-950">{co.legalName}</h1>
            <p className="mt-8 max-w-[68ch] text-lg leading-[1.55] text-graphite-600 md:text-xl">{answer}</p>
            <p className="mt-4 max-w-[68ch] text-base leading-[1.6] text-graphite-500">{co.summary}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <SquareButton href="/investor-desk" tone="accent">Contact the investor desk</SquareButton>
              <SquareButton href="/documents" tone="light">View the certificate</SquareButton>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bone-100 py-14 md:py-20">
          <GridLines />
          <div className="relative z-10 mx-auto grid max-w-[105rem] gap-12 px-5 md:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">Company facts</h2>
              <dl className="mt-8 divide-y divide-graphite-950/10 border-y border-graphite-950/10">
                {facts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_minmax(0,1fr)] gap-4 py-3.5 text-sm">
                    <dt className="text-graphite-500">{k}</dt>
                    <dd className="text-graphite-950">{v}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-10 text-lg text-graphite-950">Leadership on record</h3>
              <ul className="mt-4 space-y-2 text-sm text-graphite-700">
                {co.leadership.map((l) => (
                  <li key={l.name}>
                    <span className="text-graphite-950">{l.name}</span>, {l.role}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">Licensed concessions</h2>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-graphite-950/15">
                      {["Concession", "District", "Minerals", "Area", "Stage"].map((h) => (
                        <th key={h} scope="col" className="pb-3 pr-4 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-graphite-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blocks.map((b) => (
                      <tr key={b.slug} className="border-b border-graphite-950/10">
                        <td className="py-4 pr-4 align-top">
                          <Link href={`/concessions/${b.slug}`} className="text-copper-600 underline decoration-copper-500/40 underline-offset-4 hover:text-copper-500">{b.name}</Link>
                        </td>
                        <td className="py-4 pr-4 align-top text-sm text-graphite-700">{b.district}</td>
                        <td className="py-4 pr-4 align-top text-sm text-graphite-700">{b.minerals.slice(0, 4).map((m) => m.split(",")[0]).join(", ")}</td>
                        <td className="py-4 pr-4 align-top text-sm text-graphite-700">{b.area ? b.area.replace(/^Area:\s*/i, "") : "Not published"}</td>
                        <td className="py-4 pr-4 align-top text-sm text-graphite-700">{b.status === "Operational" ? "Producing" : "Exploration"}{b.roadAccess ? ", road access" : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 text-sm text-graphite-500">
                Sister companies in the group:{" "}
                {siblings.map((s, i) => (
                  <span key={s.slug}>
                    {i > 0 && " and "}
                    <Link href={`/companies/${s.slug}`} className="text-copper-600 underline underline-offset-4">{s.legalName}</Link>
                  </span>
                ))}
                . All licences are listed on the <Link href="/concessions" className="text-copper-600 underline underline-offset-4">concession registry</Link> and the{" "}
                <Link href="/map" className="text-copper-600 underline underline-offset-4">Gilgit Baltistan mining map</Link>.
              </p>
            </div>
          </div>
        </section>

        <FaqSection items={faqs} title={`${co.shortName}: company FAQ`} subtitle={`Direct answers about ${co.legalName}.`} id="faq" />
      </main>
    </>
  );
}
