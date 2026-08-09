import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { concessions } from "@/lib/concessions";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function ConcessionsIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Licensed mining concessions — Durr & Zircon Consortium",
    itemListElement: concessions.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Place",
        name: c.name,
        address: { "@type": "PostalAddress", addressRegion: c.district },
        url: absoluteUrl(`/concessions/${c.slug}`),
      },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />

      <main className="relative bg-bone-50">
        <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <Pill>Our concessions</Pill>
            <h1 className="mt-8 max-w-[22ch] text-display-lg tracking-[-0.035em] text-graphite-950">
              Ten licensed concessions, seven districts, two companies.
            </h1>
            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              Durr & Zircon Consortium holds eight licensed concessions across
              Gultari, Bagicha, Kharmang, Skardu, Hilal Abad, Shigar, Gojal and
              Ishkoman. Earth Lux Mines & Minerals (PVT) LTD, our third
              company, holds two further concessions at Jutial Nala and
              Gupis, and is currently offered for outright acquisition.
            </p>
            <p className="mt-4 max-w-[62ch] text-sm leading-[1.5] text-graphite-400">
              Exact GPS coordinates and boundary surveys are shared with
              verified counterparties on enquiry, or once an agreement is in
              place — not published here.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <SquareButton href="/investor-desk" tone="accent">
                Request coordinates &amp; documents
              </SquareButton>
              <SquareButton href="/services" tone="light">
                How we work with investors
              </SquareButton>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
          <GridLines />
          <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {concessions.map((c) => (
                <Link
                  key={c.slug}
                  href={`/concessions/${c.slug}`}
                  className="group relative flex flex-col overflow-hidden bg-bone-50 transition-transform duration-base ease-out hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                    />
                    {c.forSale && (
                      <span className="absolute right-3 top-3 bg-copper-500 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-bone-50">
                        For sale
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs uppercase tracking-[0.08em] text-graphite-400">
                      {c.district}
                    </span>
                    <h2 className="mt-1.5 text-lg leading-tight tracking-[-0.01em] text-graphite-950">
                      {c.name}
                    </h2>
                    <p className="mt-2 text-sm leading-[1.4] text-graphite-500">
                      {c.minerals.slice(0, 3).join(" · ")}
                    </p>
                    <span
                      className={cn(
                        "mt-4 text-xs uppercase tracking-[0.06em]",
                        c.companyStatus === "Operational"
                          ? "text-copper-700"
                          : "text-graphite-400"
                      )}
                    >
                      {c.companyStatus} — {c.companyName}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
