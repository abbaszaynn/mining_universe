import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SquareButton } from "@/components/ui/SquareButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { concessions, GB_DISTRICTS } from "@/lib/concessions";
import { absoluteUrl } from "@/lib/seo";
import { cn, spellOutCount, spellOutCountCapitalised } from "@/lib/utils";

export function ConcessionsIndex() {
  // Derived rather than written into the headline: the hardcoded version
  // said "two companies" and stayed wrong once licences were attributed to
  // their real holders (Durr, Zircon and Earth Lux are three entities).
  // District count comes from GB_DISTRICTS, not from the per-block `district`
  // strings: those are locations and each block has a distinct one, so
  // counting them gives ten rather than seven. See the note on GB_DISTRICTS.
  const districtCount = GB_DISTRICTS.length;
  const holderCount = new Set(concessions.map((c) => c.licenceHolder)).size;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Licensed mining concessions of Durr & Zircon Consortium",
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
              {spellOutCountCapitalised(concessions.length)} licensed
              concessions, {spellOutCount(districtCount)} districts,{" "}
              {spellOutCount(holderCount)} companies.
            </h1>
            <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
              Durr Mines and Minerals (PVT) LTD holds Bagicha, Gultari,
              Mahdi Abad Kharmang and the Skardu placer gold licence. Zircon
              Mines (PVT) LTD holds Hilal Abad, Shigar, Gojal and Ishkoman.
              Together they trade as Durr &amp; Zircon Consortium. Earth Lux
              Mines &amp; Minerals (PVT) LTD, our third company, holds Jutial
              Nala and Gupis, and is currently offered for outright
              acquisition.
            </p>
            <p className="mt-4 max-w-[62ch] text-sm leading-[1.5] text-graphite-400">
              Exact GPS coordinates and boundary surveys are shared with
              verified counterparties on enquiry, or once an agreement is in
              place, not published here.
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
                  className="group relative flex flex-col overflow-hidden border border-graphite-950/10 bg-bone-50 transition-all duration-base ease-out hover:-translate-y-1 hover:border-copper-500/40 hover:shadow-[0_18px_48px_rgba(0,0,0,0.10)]"
                >
                  {/*
                    Deliberately shorter than 4/3. The photo used to take the
                    dominant share of the card and squeezed the licence detail,
                    which is the part an investor is actually scanning for,
                    into a cramped strip underneath.
                  */}
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={`${c.name}, ${c.district}`}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-graphite-950/50 via-graphite-950/5 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
                          c.status === "Operational"
                            ? "bg-bone-50 text-copper-700"
                            : "bg-graphite-950/75 text-bone-50"
                        )}
                      >
                        {c.status}
                      </span>
                      {c.forSale && (
                        <span className="bg-copper-500 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-bone-50">
                          For sale
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-copper-600">
                      {c.district}
                    </span>
                    <h2 className="mt-2 text-xl leading-[1.15] tracking-[-0.015em] text-graphite-950">
                      {c.name}
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-[1.5] text-graphite-600">
                      {c.minerals.slice(0, 4).join(" · ")}
                    </p>

                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-graphite-950/10 pt-4">
                      {c.area && (
                        <div>
                          <dt className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-graphite-400">
                            Area
                          </dt>
                          <dd className="mt-1 text-sm font-medium text-graphite-950">
                            {c.area.replace(/^Area:\s*/i, "")}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-graphite-400">
                          Access
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-graphite-950">
                          {c.roadAccess ? "Road access" : "Field approach"}
                        </dd>
                      </div>
                      <div className="col-span-2">
                        <dt className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-graphite-400">
                          Held by
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-graphite-950">
                          {c.licenceHolder}
                        </dd>
                      </div>
                    </dl>
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
