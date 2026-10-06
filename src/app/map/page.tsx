import Link from "next/link";
import nextDynamic from "next/dynamic";
import { getCompanies } from "@/lib/data";
import { concessions } from "@/lib/concessions";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Mining Map of Gilgit Baltistan: Licensed Concessions",
  description:
    "Interactive 3D satellite map of Durr & Zircon's licensed mining concessions in Gilgit Baltistan, with each site's district, minerals and stage across Skardu, Kharmang, Gilgit, Ghizer, Shigar and Hunza.",
  path: "/map",
});

const MapExperience = nextDynamic(
  () =>
    import("@/components/map/MapExperience").then((m) => m.MapExperience),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-graphite-950">
        <div className="text-center">
          <div
            className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full"
            style={{
              background:
                "radial-gradient(circle, #e97a3c 0%, rgba(233,122,60,0.3) 50%, transparent 80%)",
              boxShadow: "0 0 40px rgba(233,122,60,0.5)",
            }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-copper-500">
            Loading 3D terrain map…
          </p>
        </div>
      </div>
    ),
  }
);

/** Registry detail lines mix minerals with notes ("Riverbed Length: 26 km",
 * "Copper, vein exposed at surface"); keep just the mineral names. */
function mineralList(details: string[]) {
  return details
    .filter((d) => !d.includes(":"))
    .map((d) => d.split(",")[0].trim())
    .slice(0, 4)
    .join(", ");
}

/** "Gultari: Polymetallic Ores", but not "Shigar: Shigar Copper Deposit". */
function siteLabel(name: string, district: string) {
  const place = district.split(",")[0].trim();
  return name.toLowerCase().includes(place.toLowerCase()) ? name : `${place}: ${name}`;
}

export default async function MapPage() {
  const companies = await getCompanies();
  const producing = concessions.filter((c) => c.status === "Operational").length;

  return (
    <>
      <div className="relative h-[calc(100dvh-4.75rem)] w-full" data-gos-page-root>
        <MapExperience companies={companies} />
      </div>

      {/* Server-rendered so the page has real, crawlable content: the map
          above is client-only and invisible to anything that does not run
          WebGL. Every row links to the concession's own page. */}
      <section
        aria-labelledby="map-index-heading"
        className="bg-bone-50 px-5 py-16 text-graphite-950 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-copper-600">
            Site index
          </p>
          <h1
            id="map-index-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] md:text-5xl"
          >
            Mining map of Gilgit Baltistan
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-graphite-600 md:text-lg">
            The map above plots the surveyed boundaries of our {concessions.length}{" "}
            licensed concessions on 3D satellite terrain. {producing} are producing
            and the rest are at exploration or reconnaissance stage, spread across
            the Karakoram and Himalayan districts of Gilgit Baltistan where copper,
            gold, antimony, lead and nephrite jade occur. Select a site on the map to
            fly to it, or open any concession below for its minerals, area, licence
            holder and access.
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl border border-graphite-950/10 bg-white/60">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">
                Licensed mining concessions shown on the map
              </caption>
              <thead className="border-b border-graphite-950/10 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-500">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">Concession</th>
                  <th scope="col" className="px-5 py-3 font-medium">District</th>
                  <th scope="col" className="px-5 py-3 font-medium">Minerals</th>
                  <th scope="col" className="px-5 py-3 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody>
                {concessions.map((c) => (
                  <tr key={c.slug} className="border-b border-graphite-950/5 last:border-0">
                    <th scope="row" className="px-5 py-4 font-medium">
                      <Link
                        href={`/concessions/${c.slug}`}
                        className="text-graphite-950 underline decoration-copper-500/30 underline-offset-4 hover:text-copper-600"
                      >
                        {siteLabel(c.name, c.district)}
                      </Link>
                    </th>
                    <td className="px-5 py-4 text-graphite-600">{c.district}</td>
                    <td className="px-5 py-4 text-graphite-600">
                      {mineralList(c.minerals)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={
                          c.status === "Operational"
                            ? "rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs text-emerald-800"
                            : "rounded-full bg-graphite-950/5 px-2.5 py-1 text-xs text-graphite-600"
                        }
                      >
                        {c.status === "Operational" ? "Producing" : "Exploration"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm text-graphite-600">
            Full details for every block are in the{" "}
            <Link href="/concessions" className="text-copper-600 underline underline-offset-4">
              concession registry
            </Link>
            . To arrange a site visit, use the{" "}
            <Link href="/investor-desk" className="text-copper-600 underline underline-offset-4">
              investor desk
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
