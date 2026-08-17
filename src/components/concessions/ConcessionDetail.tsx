import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/faq/FaqSection";
import { absoluteUrl } from "@/lib/seo";
import type { Concession } from "@/lib/concessions";
import { concessions } from "@/lib/concessions";
import { getConcessionContext } from "@/lib/concession-context";
import type { FaqItem } from "@/lib/faq-data";

export function ConcessionDetail({ concession: c }: { concession: Concession }) {
  const url = absoluteUrl(`/concessions/${c.slug}`);
  const context = getConcessionContext(c.slug);

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: c.name,
    // Deliberately no `geo` property — exact coordinates are not published.
    address: { "@type": "PostalAddress", addressRegion: c.district, addressCountry: "PK" },
    url,
    ...(c.forSale
      ? {
          "@type": ["Place", "Product"],
          offers: {
            "@type": "Offer",
            businessFunction: "http://purl.org/goodrelations/v1#Sell",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: c.companyName },
          },
        }
      : {}),
  };

  // Coordinates question first — it's the one every serious enquirer actually
  // has — then the hand-written per-concession FAQ (licence stage, data room).
  const coordinatesFaq: FaqItem = {
    question: `Can I get the exact coordinates for ${c.name}?`,
    answer: `Yes. Boundary coordinates and the geological report for ${c.name} are shared directly with verified investors and buyers on request, either by email or once an enquiry is confirmed through the investor desk.`,
  };
  const faqItems: FaqItem[] = [coordinatesFaq, ...(context?.faqs ?? [])];

  const others = concessions.filter((o) => o.slug !== c.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={placeSchema} />

      <main className="relative bg-bone-50">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <nav aria-label="Breadcrumb" className="text-xs text-graphite-400">
              <Link href="/concessions" className="hover:text-graphite-950">
                Concessions
              </Link>
              <span className="mx-2">/</span>
              <span className="text-graphite-500">{c.name}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Pill>{c.district}</Pill>
              {c.forSale && <Pill tone="outline">Offered for acquisition</Pill>}
            </div>

            <h1 className="mt-6 max-w-[24ch] text-display-lg tracking-[-0.035em] text-graphite-950">
              {c.name}
            </h1>

            {/* Direct-answer block — kept short, first thing on the page. */}
            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              {c.name} is a {c.type.toLowerCase()} concession in {c.district},
              held under licence by {c.companyName}. It carries{" "}
              {c.minerals.join(", ").toLowerCase()}
              {c.area ? `, across ${c.area.replace(/^Area:\s*/i, "")}` : ""}.
              {c.companyStatus === "Operational"
                ? " The site is operational."
                : " The site is in the exploration phase."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SquareButton href="/investor-desk" tone="accent">
                Enquire about this concession
              </SquareButton>
              <SquareButton href="/documents" tone="light">
                Review documentation
              </SquareButton>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
          <GridLines />
          <div className="relative z-10 mx-auto grid max-w-[105rem] gap-12 px-5 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>

            <div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-graphite-950/12 pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                    Operator
                  </dt>
                  <dd className="mt-1.5 text-base text-graphite-950">{c.companyName}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                    District
                  </dt>
                  <dd className="mt-1.5 text-base text-graphite-950">{c.district}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                    Deposit type
                  </dt>
                  <dd className="mt-1.5 text-base text-graphite-950">{c.type}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                    Status
                  </dt>
                  <dd className="mt-1.5 text-base text-graphite-950">{c.companyStatus}</dd>
                </div>
                {c.area && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                      Area
                    </dt>
                    <dd className="mt-1.5 text-base text-graphite-950">
                      {c.area.replace(/^Area:\s*/i, "")}
                    </dd>
                  </div>
                )}
                {c.licenceNote && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                      Licence status
                    </dt>
                    <dd className="mt-1.5 text-base text-graphite-950">{c.licenceNote}</dd>
                  </div>
                )}
              </dl>

              <div className="mt-8 border-t border-graphite-950/12 pt-8">
                <dt className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                  Minerals
                </dt>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.minerals.map((m) => (
                    <li
                      key={m}
                      className="bg-bone-50 px-3 py-1.5 text-sm text-graphite-700"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-graphite-950/12 pt-8">
                <p className="text-sm leading-[1.5] text-graphite-500">
                  Boundary coordinates and the geological report for this
                  concession are shared directly with verified investors and
                  buyers on request — by email, or once an enquiry is
                  confirmed through the investor desk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {context && context.narrative.length > 0 && (
          <section className="relative overflow-hidden bg-bone-50 py-16 md:py-24">
            <GridLines />
            <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
              <div className="max-w-[68ch]">
                <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                  Geological context
                </span>
                <h2 className="mt-3 text-display-md tracking-[-0.03em] text-graphite-950">
                  About {c.name}
                </h2>
                <div className="mt-6 space-y-5">
                  {context.narrative.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-[1.6] text-graphite-600 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <FaqSection
          items={faqItems}
          title={`${c.name} — investor FAQ`}
          subtitle={`Direct answers for investors and buyers evaluating ${c.name}, ${c.district}.`}
          id="faq"
        />

        {others.length > 0 && (
          <section className="relative overflow-hidden bg-bone-50 py-16 md:py-24">
            <GridLines />
            <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
              <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">
                Other concessions
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/concessions/${o.slug}`}
                    className="group flex flex-col overflow-hidden bg-bone-100 transition-transform duration-base ease-out hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={o.image}
                        alt={o.name}
                        fill
                        sizes="30vw"
                        className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                        {o.district}
                      </span>
                      <h3 className="mt-1.5 text-base text-graphite-950">{o.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
