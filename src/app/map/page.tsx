import nextDynamic from "next/dynamic";
import { getCompanies } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Mining Map",
  description:
    "Interactive 3D terrain map with satellite imagery and licensed mine coordinates across Skardu, Gilgit, and Ghizer in Gilgit Baltistan.",
  path: "/map",
});

const MapExperience = nextDynamic(
  () =>
    import("@/components/map/MapExperience").then((m) => m.MapExperience),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-graphite-950">
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

export default async function MapPage() {
  const companies = await getCompanies();

  return (
    <div className="h-full w-full" data-gos-page-root>
      <MapExperience companies={companies} />
    </div>
  );
}
