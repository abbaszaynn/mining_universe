import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import type { Market } from "@/lib/markets";
import { getMarketCommodities } from "@/lib/markets";

export function MarketDetail({ market: m }: { market: Market }) {
  const url = absoluteUrl(`/markets/${m.slug}`);
  const commodities = getMarketCommodities(m);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: m.metaTitle,
    description: m.metaDescription,
    url,
    about: {
      "@type": "Organization",
      name: "Durr & Zircon Consortium",
    },
    audience: {
      "@type": "BusinessAudience",
      geographicArea: { "@type": "Country", name: m.name },
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      <main className="relative bg-bone-50">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <nav aria-label="Breadcrumb" className="text-xs text-graphite-400">
              <Link href="/markets" className="hover:text-graphite-950">
                Markets
              </Link>
              <span className="mx-2">/</span>
              <span className="text-graphite-500">{m.name}</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Pill>Investor market</Pill>
            </div>

            <h1 className="mt-6 max-w-[24ch] text-display-lg tracking-[-0.035em] text-graphite-950">
              Mining investment for {m.name} investors
            </h1>

            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              {m.intro}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SquareButton href="/invest" tone="accent">
                See investment routes
              </SquareButton>
              <SquareButton href="/investor-desk" tone="light">
                Speak with the investor desk
              </SquareButton>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <div className="max-w-[68ch]">
              <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                Why {m.name}
              </span>
              <p className="mt-3 text-base leading-[1.6] text-graphite-600 md:text-lg">
                {m.context}
              </p>
            </div>
          </div>
        </section>

        {commodities.length > 0 && (
          <section className="relative overflow-hidden bg-bone-50 py-16 md:py-24">
            <GridLines />
            <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
              <h2 className="text-display-md tracking-[-0.03em] text-graphite-950">
                Relevant commodities
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {commodities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/commodities/${c.slug}`}
                    className="group flex flex-col overflow-hidden bg-bone-100 transition-transform duration-base ease-out hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="30vw"
                        className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base text-graphite-950">{c.name}</h3>
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
