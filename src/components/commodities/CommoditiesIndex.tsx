import Image from "next/image";
import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { COMMODITIES } from "@/lib/commodities";

export function CommoditiesIndex() {
  return (
    <main className="relative bg-bone-50">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Our commodities</Pill>
          <h1 className="mt-6 max-w-[22ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            Seven commodities, supplied direct from our own concessions.
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            Copper, antimony, placer gold, lead, nephrite jade, quartz and
            granite, quoted FOB Karachi or CIF, with no intermediary layer
            between the pit and your purchase order. Assay reports and
            trade documentation are shared with verified buyers on request.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMMODITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/commodities/${c.slug}`}
                className="group flex flex-col overflow-hidden bg-bone-50 transition-transform duration-base ease-out hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 1024px) 45vw, 30vw"
                    className="object-cover transition-transform duration-slow ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg text-graphite-950">{c.name}</h2>
                  <p className="mt-2 text-sm leading-[1.5] text-graphite-500">
                    {c.intro.split(". ")[0]}.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
