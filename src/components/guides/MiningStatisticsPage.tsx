import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { FaqSection } from "@/components/faq/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import {
  STAT_SECTIONS,
  STATS_FAQ,
  TOTAL_STAT_COUNT,
} from "@/lib/mining-statistics";

const PATH = "/guides/gilgit-baltistan-mining-statistics-2026";
const TITLE = "Gilgit Baltistan Mining Statistics 2026";

/**
 * A link-magnet page. Note the deliberate absence of outbound links: sources
 * are plain text throughout. The page exists to be cited, so it keeps its
 * authority rather than passing it out to every source it quotes. Internal
 * links to our own pages are the exception and are encouraged.
 */
export function MiningStatisticsPage() {
  const url = absoluteUrl(PATH);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description:
      "Verified statistics on mining in Gilgit Baltistan, Pakistan: licensed area, mineral profile, sector economics, 2025 to 2026 investment agreements, and the licensing framework. Every figure sourced and dated.",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
    author: { "@type": "Organization", name: SITE.legalName },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon.svg") },
    },
    mainEntityOfPage: url,
    url,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: STATS_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: TITLE },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, faqSchema, breadcrumbSchema]} />

      <main className="relative bg-bone-50">
        <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <Pill>Statistics</Pill>
            <h1 className="mt-6 max-w-[26ch] text-display-lg tracking-[-0.035em] text-graphite-950">
              {TITLE}
            </h1>
            <p className="mt-4 text-sm text-graphite-400">
              {TOTAL_STAT_COUNT} verified figures &middot; last updated 26 August 2026
            </p>
            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              Every figure on this page carries a named source and a year.
              Where reputable sources disagree, both numbers appear with
              their own attribution rather than the more flattering one.
              Anything we could not verify against the source document was
              left out.
            </p>
            <p className="mt-4 max-w-[62ch] text-base leading-[1.5] text-graphite-500">
              Journalists and analysts are welcome to cite this page. If you
              need something not listed here, or the underlying operator
              data behind our own concessions, the{" "}
              <Link
                href="/investor-desk"
                className="text-copper-600 underline underline-offset-4"
              >
                investor desk
              </Link>{" "}
              will respond directly.
            </p>
          </div>
        </section>

        {/* Contents. Anchors only, so no authority leaves the page. */}
        <section className="relative overflow-hidden bg-bone-100 py-10 md:py-14">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <h2 className="text-xs uppercase tracking-[0.08em] text-graphite-400">
              Contents
            </h2>
            <ol className="mt-5 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {STAT_SECTIONS.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-base text-graphite-700 underline decoration-graphite-950/20 underline-offset-4 transition-colors hover:text-copper-600"
                  >
                    <span className="mr-2 font-mono text-xs text-graphite-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {STAT_SECTIONS.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            className={`relative overflow-hidden py-16 md:py-24 ${
              sectionIndex % 2 === 0 ? "bg-bone-50" : "bg-bone-100"
            }`}
          >
            <GridLines />
            <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
              <div className="max-w-[68ch]">
                <span className="font-mono text-xs text-graphite-400">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-display-md tracking-[-0.03em] text-graphite-950">
                  {section.title}
                </h2>
                <p className="mt-5 text-base leading-[1.6] text-graphite-600 md:text-lg">
                  {section.intro}
                </p>
              </div>

              {section.headline && (
                <div className="mt-10 max-w-[68ch] border-l-2 border-copper-500 pl-6">
                  <p className="text-display-md leading-none tracking-[-0.03em] text-copper-600">
                    {section.headline.value}
                  </p>
                  <p className="mt-3 text-base leading-[1.5] text-graphite-600">
                    {section.headline.label}
                  </p>
                </div>
              )}

              <ol className="mt-10 max-w-[80ch] border-t border-graphite-950/12">
                {section.stats.map((stat, i) => (
                  <li
                    key={`${section.id}-${i}`}
                    className="grid gap-2 border-b border-graphite-950/10 py-6 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8"
                  >
                    <p className="text-xl leading-tight tracking-[-0.02em] text-graphite-950 sm:text-2xl">
                      {stat.value}
                    </p>
                    <div>
                      <p className="text-base leading-[1.55] text-graphite-700">
                        {stat.claim}
                      </p>
                      {/* Plain text, never a link. See the file header in
                          lib/mining-statistics.ts. */}
                      <p className="mt-2 text-sm text-graphite-400">
                        Source: {stat.source}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ))}

        <FaqSection
          items={STATS_FAQ}
          title="Questions about these figures"
          subtitle="The questions that come up most often about mining data in Gilgit Baltistan."
          id="faq"
        />

        <section className="relative overflow-hidden bg-graphite-950 py-20 md:py-28">
          <GridLines tone="dark" />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <h2 className="max-w-[26ch] text-display-md tracking-[-0.03em] text-bone-50">
              We hold ten of the licensed blocks these figures describe.
            </h2>
            <p className="mt-6 max-w-[56ch] text-base leading-[1.5] text-graphite-300 md:text-lg">
              Durr &amp; Zircon Consortium operates across seven districts of
              Gilgit Baltistan under three registered companies. Concession
              areas, licence status and mineral indications are published per
              site. Boundary coordinates and geological reports are shared
              with verified counterparties on request.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <SquareButton href="/concessions" tone="light">
                Browse the concessions
              </SquareButton>
              <SquareButton href="/invest" tone="light">
                Investment routes
              </SquareButton>
            </div>
            <p className="mt-8 max-w-[56ch] text-sm leading-[1.5] text-graphite-400">
              Related reading:{" "}
              <Link
                href="/guides/mining-licence-gilgit-baltistan"
                className="text-copper-500 underline underline-offset-4"
              >
                how to get a mining licence in Gilgit Baltistan
              </Link>
              , or the{" "}
              <Link
                href="/commodities"
                className="text-copper-500 underline underline-offset-4"
              >
                commodities we supply
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
