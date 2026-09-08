import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { FaqSection } from "@/components/faq/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { concessions } from "@/lib/concessions";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/faq-data";

/**
 * Built against a specific search finding (Sept 2026): every first-page result
 * for "mining companies in gilgit baltistan", "private mining companies in
 * gilgit baltistan" and their variants is a directory (Dun & Bradstreet,
 * ensun, Lusha, ScrapMonster) or a government portal. Not one is an operator's
 * own site. That is a page-type mismatch, not a content-quality problem: the
 * query wants a list, and a company homepage is not a list.
 *
 * So this page answers the list question properly and honestly. It does NOT
 * invent a directory of other companies, which would mean publishing claims
 * about third parties we cannot stand behind. What it does instead:
 *
 *  - explains how titles are actually granted, so the page earns the query
 *  - names the government title-holder registry as the authoritative full
 *    list and links to it, which is the honest answer to "who holds titles"
 *  - lists our own three registered companies and all ten blocks in full,
 *    generated from the concession data so it cannot drift
 *  - gives real evaluation criteria, which is the part no directory provides
 */

const EVALUATION_CRITERIA = [
  {
    heading: "Is the licence named, staged and checkable?",
    body: "A licence is not a single thing. Gilgit Baltistan runs four stages: reconnaissance, exploration, mineral deposit retention, and mining lease. An operator describing a reconnaissance licence as a mine is either confused or hoping you are. Ask which stage, and for the application or lease number.",
  },
  {
    heading: "Is the holding entity locally incorporated?",
    body: "Mineral titles can only be granted to a Pakistani-incorporated entity. Any structure a foreign investor enters runs through a local company, a joint venture, or a farm-in against an existing title. An operator who cannot show you the incorporation certificate behind the licence has a gap you will inherit.",
  },
  {
    heading: "Are the grades evidenced or asserted?",
    body: "This is where most of the sector falls down. Published percentages with no assay behind them are marketing. Ask whether a figure comes from a named survey, an independent laboratory, or the operator's own estimate, and ask to take split samples for your own assay.",
  },
  {
    heading: "Can you physically reach the deposit?",
    body: "In the Karakoram this is a cost line, not a detail. Helicopter-supported work can consume a budget before any material moves. Road access changes the arithmetic on sampling, bulk testing and shipment, so ask specifically how a truck gets to the working face.",
  },
  {
    heading: "Are the community agreements in place?",
    body: "Provincial approval is one of two approvals. The valleys a concession sits in are the other, and community consent is the approval most often skipped and most often the reason a project stalls later. Ask to see signed agreements, not assurances that relations are good.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How many mining companies operate in Gilgit Baltistan?",
    answer:
      "There is no single reliable public count, and any specific number you see quoted should be treated with suspicion. The authoritative source is the Mines and Minerals Department's own List of Title Holders, published on its portal, which lists the companies holding reconnaissance licences, exploration licences and mining leases in the region. Commercial directories such as Dun & Bradstreet also carry partial listings, but they reflect registered business entities rather than actual licence holders, which are not the same set.",
  },
  {
    question: "Where can I check whether a company actually holds a mining title?",
    answer:
      "The Mines and Minerals Department Gilgit Baltistan publishes a List of Title Holders on its portal at portal.minesandmineralsgb.gog.pk. That register, rather than any company's own website, is the document to verify a claim against. Ask the operator for the licence or application number and check it there before money moves.",
  },
  {
    question: "Can a foreign company hold a mining licence in Gilgit Baltistan?",
    answer:
      "No. Under the Gilgit-Baltistan Mining Concession Rules, mineral titles are granted only to locally incorporated entities. A foreign investor's practical routes are a joint venture with an existing licence holder, a farm-in or earn-in agreement against a licensed block, or incorporating a Pakistani subsidiary and applying through it. Most foreign capital enters through the first two, because they attach to ground that is already permitted.",
  },
  {
    question: "What is the difference between a private mining company and the Mines and Minerals Department?",
    answer:
      "The department is the regulator. It grants titles, sets the concession rules, and publishes the register of who holds what. It does not sell minerals or take investment. Private operators hold the licences and do the actual exploration, extraction and supply. If you are searching for a counterparty to buy from or invest alongside, you are looking for a licence holder, not the department.",
  },
  {
    question: "Which minerals are private operators in Gilgit Baltistan actually working?",
    answer:
      "Across our own ten licensed blocks the worked and indicated minerals are copper, nephrite jade, serpentine, placer gold, antimony, lead, silver, molybdenum, lithium, ruby, quartz and silica, and granite and marble. The regional profile more broadly runs to the same base and critical metals plus dimension stone and gemstones, which is why Gilgit Baltistan features in Pakistan's critical minerals positioning.",
  },
];

export function MiningCompaniesGuide() {
  const operational = concessions.filter((c) => c.status === "Operational");
  const byCompany = concessions.reduce<Record<string, typeof concessions>>(
    (acc, c) => {
      (acc[c.companyName] ??= []).push(c);
      return acc;
    },
    {}
  );

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/mining-licence-gilgit-baltistan" },
    { name: "Mining companies in Gilgit Baltistan" },
  ]);

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Licensed mining concessions held in Gilgit Baltistan by Durr & Zircon Consortium and Earth Lux Mines",
    numberOfItems: concessions.length,
    itemListElement: concessions.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Place",
        name: c.name,
        address: { "@type": "PostalAddress", addressRegion: c.district, addressCountry: "PK" },
        url: absoluteUrl(`/concessions/${c.slug}`),
      },
    })),
  };

  return (
    <main className="relative bg-bone-50">
      <JsonLd data={[breadcrumbs, itemList, faqJsonLd(FAQ_ITEMS)]} />

      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Guide</Pill>
          <h1 className="mt-6 max-w-[30ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            Mining companies in Gilgit Baltistan
          </h1>

          {/* Direct-answer block: the 40 to 60 word summary an answer engine
              can lift whole, kept at the very top of the page. */}
          <p className="mt-8 max-w-[64ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            Mining in Gilgit Baltistan is carried out by private, locally
            incorporated companies holding titles granted by the Mines and
            Minerals Department. Titles run through four stages, from
            reconnaissance licence to mining lease, and only Pakistani-registered
            entities can hold one. The department publishes the authoritative
            register of who holds what.
          </p>

          <p className="mt-6 max-w-[64ch] text-base leading-[1.6] text-graphite-600 md:text-lg">
            This page sets out how to identify and check a licensed operator,
            lists the ten blocks our own three registered companies hold, and
            points at the government register you should verify any claim
            against. We have not published a directory of other companies:
            we cannot stand behind claims about third-party licences, and a
            list we cannot evidence is worth nothing to you.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <SquareButton href="/concessions" tone="accent">
              See all ten concessions
            </SquareButton>
            <SquareButton href="/guides/mining-licence-gilgit-baltistan" tone="light">
              How licensing works
            </SquareButton>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <h2 className="max-w-[34ch] text-display-md tracking-[-0.03em] text-graphite-950">
            The licensed blocks we hold
          </h2>
          <p className="mt-6 max-w-[62ch] text-base leading-[1.6] text-graphite-600 md:text-lg">
            Three registered companies, ten licensed blocks, seven districts.
            {operational.length > 0 && (
              <> {operational.length} of the ten are in operation; the rest are at
              exploration or reconnaissance stage.</>
            )}{" "}
            Every block below has its own page with district, minerals, area,
            licence stage and holding company.
          </p>

          <div className="mt-12 space-y-12">
            {Object.entries(byCompany).map(([company, blocks]) => (
              <div key={company}>
                <h3 className="text-xl tracking-[-0.01em] text-graphite-950 md:text-2xl">
                  {company}
                </h3>
                <p className="mt-2 text-sm uppercase tracking-[0.1em] text-copper-600">
                  {blocks.length} licensed {blocks.length === 1 ? "block" : "blocks"}
                </p>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[46rem] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-graphite-950/15">
                        {["Concession", "District", "Minerals", "Area", "Stage"].map((h) => (
                          <th
                            key={h}
                            scope="col"
                            className="pb-3 pr-4 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-graphite-400"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {blocks.map((c) => (
                        <tr key={c.slug} className="border-b border-graphite-950/8">
                          <td className="py-4 pr-4 align-top">
                            <Link
                              href={`/concessions/${c.slug}`}
                              className="text-base text-copper-600 underline decoration-copper-500/40 underline-offset-4 transition-colors hover:text-copper-500"
                            >
                              {c.name}
                            </Link>
                          </td>
                          <td className="py-4 pr-4 align-top text-sm text-graphite-700">
                            {c.district}
                          </td>
                          <td className="py-4 pr-4 align-top text-sm text-graphite-700">
                            {c.minerals.slice(0, 4).join(", ")}
                          </td>
                          <td className="py-4 pr-4 align-top text-sm text-graphite-700">
                            {c.area ? c.area.replace(/^Area:\s*/i, "") : "Not published"}
                          </td>
                          <td className="py-4 pr-4 align-top text-sm text-graphite-700">
                            {c.status}
                            {c.roadAccess ? ", road access" : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-50 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <h2 className="max-w-[36ch] text-display-md tracking-[-0.03em] text-graphite-950">
            How to check a mining company in Gilgit Baltistan
          </h2>
          <p className="mt-6 max-w-[62ch] text-base leading-[1.6] text-graphite-600 md:text-lg">
            Five questions worth asking any operator here, including us. None
            of them are difficult to answer honestly, which is what makes them
            useful.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-10">
            {EVALUATION_CRITERIA.map((item, i) => (
              <div key={item.heading} className="border-t border-graphite-950/12 pt-6">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-copper-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg leading-snug text-graphite-950 md:text-xl">
                  {item.heading}
                </h3>
                <p className="mt-3 text-base leading-[1.6] text-graphite-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-[68ch] border-l-2 border-copper-500/40 pl-6">
            <h3 className="text-lg text-graphite-950 md:text-xl">
              Verifying a title holder
            </h3>
            <p className="mt-3 text-base leading-[1.6] text-graphite-600">
              The Mines and Minerals Department Gilgit Baltistan publishes a
              List of Title Holders on its portal. That register, not any
              operator&apos;s own website, is what a licence claim should be
              checked against. Ask for the licence or application number and
              confirm it there. Our own blocks carry the stages and application
              numbers shown on each concession page, and the underlying
              incorporation certificates and licences are listed under{" "}
              <Link
                href="/documents"
                className="text-copper-600 underline underline-offset-4"
              >
                Documents
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <SquareButton href="/investor-desk" tone="accent">
              Speak with the investor desk
            </SquareButton>
            <SquareButton href="/guides/gilgit-baltistan-mining-statistics-2026" tone="light">
              Sector statistics
            </SquareButton>
          </div>
        </div>
      </section>

      {/*
        includeJsonLd={false}: the FAQPage schema for these items is already
        emitted in the JsonLd block at the top of this page. FaqSection emits
        its own by default, and two FAQPage blocks on one URL is a structured
        data error rather than twice the signal.
      */}
      <FaqSection
        items={FAQ_ITEMS}
        title="Questions about mining companies here"
        subtitle="Direct answers on who holds titles, how to verify them, and what a foreign investor can actually hold."
        id="faq"
        includeJsonLd={false}
      />
    </main>
  );
}
