import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { getCompanies } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mining Map | GOS",
  description:
    "3D terrain map with satellite imagery and licensed mine coordinates across Gilgit Baltistan.",
};

const MapExperience = nextDynamic(
  () =>
    import("@/components/map/MapExperience").then((m) => m.MapExperience),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[#030712]">
        <div className="text-center">
          <div
            className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full"
            style={{
              background:
                "radial-gradient(circle, #d4af37 0%, rgba(212,175,55,0.3) 50%, transparent 80%)",
              boxShadow: "0 0 40px rgba(212,175,55,0.5)",
            }}
          />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94a3b8]">
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
    <div className="h-full w-full">
      <MapExperience companies={companies} />
    </div>
  );
}
