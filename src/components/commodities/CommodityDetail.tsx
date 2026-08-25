import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/faq/FaqSection";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/lib/faq-data";
import type { Commodity } from "@/lib/commodities";
import { getCommoditySourceConcessions } from "@/lib/commodities";

export function CommodityDetail({ commodity: c }: { commodity: Commodity }) {
  const url = absoluteUrl(`/commodities/${c.slug}`);
  const sources = getCommoditySourceConcessions(c);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: c.name,
    description: c.intro,
    url,
    image: absoluteUrl(c.image),
    brand: { "@type": "Organization", name: "Durr & Zircon Consortium" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      priceSpecification: {
        "@type": "PriceSpecification",
        // No published price - this is a B2B commodity quoted per shipment,
        // not a fixed retail price. Omitting `price` outright trips schema
        // validators that expect one, so this stays deliberately vague
        // instead of publishing a number nobody actually quotes at.
        valueAddedTaxIncluded: false,
      },
      seller: { "@type": "Organization", name: "Durr & Zircon Consortium" },
    },
  };

  const faqItems: FaqItem[] = [
    {
      question: `What are the minimum order quantity and shipping terms for ${c.name.toLowerCase()}?`,
      answer: `We quote FOB Karachi or CIF to your discharge port. Trial shipments are accepted before any monthly offtake commitment, so minimum order quantity is negotiated per buyer rather than fixed.`,
    },
    {
      question: `Can I get an assay report before committing to a purchase?`,
      answer: `Yes. Assay reports and, where relevant, SGS pre-shipment inspection are arranged for verified buyers ahead of any commitment. Reach out through the investor desk to start that process.`,
    },
  ];

  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Commodities", path: "/commodities" },
    { name: c.name },
  ]);

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema]} />

      <main className="relative bg-bone-50">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <nav aria-label="Breadcrumb" className="text-xs text-graphite-400">
              <Link href="/commodities" className="hover:text-graphite-950">
                Commodities
              </Link>
              <span className="mx-2">/</span>
              <span className="text-graphite-500">{c.name}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Pill>Gilgit Baltistan</Pill>
            </div>

            <h1 className="mt-6 max-w-[24ch] text-display-lg tracking-[-0.035em] text-graphite-950">
              {c.name}
            </h1>

            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              {c.intro}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SquareButton href="/investor-desk" tone="accent">
                Enquire about {c.name.toLowerCase()}
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
              <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                End-use and demand
              </span>
              <p className="mt-3 text-base leading-[1.6] text-graphite-600 md:text-lg">
                {c.demand}
              </p>

              <div className="mt-8 border-t border-graphite-950/12 pt-8">
                <p className="text-sm leading-[1.5] text-graphite-500">
                  Assay data, trade documentation and shipment history are
                  shared directly with verified buyers, by email or once an
                  enquiry is confirmed through the investor desk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {sources.length > 0 && (
          <section className="relative overflow-hidden bg-bone-50 py-16 md:py-24">
            <GridLines />
            <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
              <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">
                Sourced from
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {sources.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/concessions/${s.slug}`}
                    className="group flex flex-col overflow-hidden bg-bone-100 transition-transform duration-base ease-out hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="30vw"
                        className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                        {s.district}
                      </span>
                      <h3 className="mt-1.5 text-base text-graphite-950">{s.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FaqSection
          items={faqItems}
          title={`${c.name}: supply FAQ`}
          subtitle={`Direct answers for buyers evaluating ${c.name.toLowerCase()} from Durr & Zircon Consortium.`}
          id="faq"
        />
      </main>
    </>
  );
}
