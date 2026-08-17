import Link from "next/link";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { MARKETS } from "@/lib/markets";

export function MarketsIndex() {
  return (
    <main className="relative bg-bone-50">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>Investor markets</Pill>
          <h1 className="mt-6 max-w-[24ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            Where our investors and buyers come from.
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            China, the United States, Saudi Arabia, the UAE, Thailand, and
            Pakistan each have a distinct reason to look at Gilgit
            Baltistan right now. Find your market below.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MARKETS.map((m) => (
              <Link
                key={m.slug}
                href={`/markets/${m.slug}`}
                className="group flex flex-col bg-bone-50 p-6 transition-transform duration-base ease-out hover:-translate-y-1"
              >
                <h2 className="text-lg text-graphite-950">{m.name}</h2>
                <p className="mt-2 text-sm leading-[1.5] text-graphite-500">
                  {m.intro.split(". ")[0]}.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
