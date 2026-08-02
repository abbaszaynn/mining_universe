"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Company } from "@/lib/types";
import { MiningMapGl } from "./MiningMapGl";
import { cn } from "@/lib/utils";

type MapExperienceProps = {
  companies: Company[];
};

type MineEntry = {
  id: string;
  companyId: string;
  companyName: string;
  locationName: string;
  status: Company["status"];
  lat: number;
  lng: number;
  tagline: string;
};

function polygonCenter(polygon: { lat: number; lng: number }[]) {
  const lat = polygon.reduce((sum, p) => sum + p.lat, 0) / polygon.length;
  const lng = polygon.reduce((sum, p) => sum + p.lng, 0) / polygon.length;
  return { lat, lng };
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function MinesListIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export function MapExperience({ companies }: MapExperienceProps) {
  const [selectedMineId, setSelectedMineId] = useState<string | null>(null);
  const [terrain3d, setTerrain3d] = useState(true);
  const [isListOpen, setIsListOpen] = useState(false);
  const isMobile = useIsMobile();

  const mines = useMemo<MineEntry[]>(() => {
    return companies.flatMap((company) =>
      company.locations.map((location) => {
        const center = polygonCenter(location.polygon ?? []);
        return {
          id: `${company.id}::${location.name}`,
          companyId: company.id,
          companyName: company.name,
          locationName: location.name,
          status: company.status,
          lat: center.lat,
          lng: center.lng,
          tagline: company.tagline,
        };
      })
    );
  }, [companies]);

  const selectedMine = mines.find((m) => m.id === selectedMineId) ?? null;

  const handleMineSelect = useCallback(
    (id: string | null) => {
      setSelectedMineId(id);
      if (id && isMobile) {
        setIsListOpen(false);
      }
    },
    [isMobile]
  );

  const mineList = (
    <ul className="flex-1 overflow-y-auto px-3 py-3 md:px-4 md:py-4">
      {mines.map((mine) => {
        const active = selectedMineId === mine.id;
        return (
          <li key={mine.id} className="mb-2">
            <button
              type="button"
              onClick={() => handleMineSelect(active ? null : mine.id)}
              className={cn(
                "w-full rounded-xl border px-4 py-3 text-left backdrop-blur-md transition duration-300",
                active
                  ? "border-copper-500/50 bg-white/80 shadow-[0_0_24px_rgba(233,122,60,0.14)]"
                  : "border-graphite-950/10 bg-white/40 hover:border-copper-500/30 hover:bg-white/60"
              )}
            >
              <p className="text-sm font-medium leading-snug text-graphite-950">
                {mine.locationName}
              </p>
              <p className="mt-1 line-clamp-1 text-xs text-graphite-600">
                {mine.companyName}
              </p>
              <p className="mt-1 font-mono text-[10px] text-graphite-500">
                {mine.lat.toFixed(4)}°N · {mine.lng.toFixed(4)}°E
              </p>
              <span
                className={cn(
                  "mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                  mine.status === "Operational"
                    ? "bg-emerald-500/15 text-emerald-600"
                    : "bg-amber-500/15 text-amber-600"
                )}
              >
                {mine.status}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const listHeader = (
    <div className="border-b border-graphite-950/10 px-5 py-5 backdrop-blur-[2px] md:px-6 md:py-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-copper-500">
        Durr & Zircon Mines Consortium
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-graphite-950 md:text-2xl">
        Explore the mines
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-graphite-600">
        {mines.length} licensed sites · 3D terrain with satellite imagery. Select a
        site to fly to its coordinates.
      </p>
    </div>
  );

  return (
    <div data-gos-page-root className="relative h-full w-full overflow-hidden bg-bone-50">
      <MiningMapGl
        companies={companies}
        selectedMineId={selectedMineId}
        onMineSelect={handleMineSelect}
        terrain3d={terrain3d}
        mobileFocus={isMobile}
      />

      {/* View mode toggle */}
      <div
        className={cn(
          "pointer-events-auto absolute z-20 flex gap-2",
          isMobile ? "right-3 top-3" : "right-4 top-4 md:right-6 md:top-6"
        )}
      >
        <button
          type="button"
          onClick={() => setTerrain3d(true)}
          className={cn(
            "rounded-full border backdrop-blur-md transition",
            isMobile ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs",
            "font-semibold uppercase tracking-wider",
            terrain3d
              ? "border-copper-500/50 bg-copper-500/20 text-graphite-950"
              : "border-graphite-950/10 bg-white/40 text-graphite-600 hover:border-copper-500/30"
          )}
        >
          3D terrain
        </button>
        <button
          type="button"
          onClick={() => setTerrain3d(false)}
          className={cn(
            "rounded-full border backdrop-blur-md transition",
            isMobile ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs",
            "font-semibold uppercase tracking-wider",
            !terrain3d
              ? "border-copper-500/50 bg-copper-500/20 text-graphite-950"
              : "border-graphite-950/10 bg-white/40 text-graphite-600 hover:border-copper-500/30"
          )}
        >
          Flat view
        </button>
      </div>

      {/* Mobile: mines list toggle */}
      <button
        type="button"
        onClick={() => setIsListOpen((open) => !open)}
        className={cn(
          "pointer-events-auto absolute left-3 top-3 z-30 flex items-center gap-2 rounded-xl border border-graphite-950/10 bg-white/85 px-3 py-2.5 text-sm font-medium text-graphite-950 shadow-lg backdrop-blur-md transition md:hidden",
          isListOpen && "border-copper-500/40 bg-white/95"
        )}
        aria-expanded={isListOpen}
        aria-controls="mobile-mines-list"
      >
        {isListOpen ? (
          <>
            <span aria-hidden>✕</span>
            Close
          </>
        ) : (
          <>
            <MoreIcon className="h-4 w-4 text-copper-500" />
            <MinesListIcon className="h-4 w-4 text-graphite-600" />
            Mines list
          </>
        )}
      </button>

      {/* Mobile: drawer backdrop */}
      {isListOpen && (
        <button
          type="button"
          className="absolute inset-0 z-20 bg-bone-50/55 backdrop-blur-[1px] md:hidden"
          aria-label="Close mines list"
          onClick={() => setIsListOpen(false)}
        />
      )}

      {/* Mobile: slide-in mines list */}
      <aside
        id="mobile-mines-list"
        className={cn(
          "pointer-events-auto absolute left-0 top-0 z-30 flex h-full w-[min(100%,340px)] flex-col border-r border-graphite-950/10 bg-white/92 shadow-[24px_0_80px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-transform duration-300 ease-out md:hidden",
          isListOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-14">{listHeader}</div>
        {mineList}
      </aside>

      {/* Desktop: persistent sidebar */}
      <aside className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-full max-w-[min(100%,380px)] flex-col bg-gradient-to-r from-white/70 via-white/30 to-transparent md:flex">
        <div className="pointer-events-auto">{listHeader}</div>
        <div className="pointer-events-auto flex min-h-0 flex-1 flex-col">{mineList}</div>
      </aside>

      {/* Mobile: compact site label when focused — map stays clear */}
      {selectedMine && isMobile && (
        <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-20 md:hidden">
          <div className="flex items-center gap-3 rounded-2xl border border-copper-500/35 bg-white/90 px-4 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.15)] backdrop-blur-xl">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-copper-500"
              style={{ boxShadow: "0 0 12px rgba(233,122,60,0.65)" }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-graphite-950">
                {selectedMine.locationName}
              </p>
              <p className="truncate text-xs text-graphite-600">
                {selectedMine.companyName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleMineSelect(null)}
              className="shrink-0 rounded-lg border border-graphite-950/10 px-3 py-1.5 text-xs font-medium text-graphite-600 transition hover:border-graphite-950/25 hover:text-graphite-950"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Desktop: detail panel */}
      {selectedMine && !isMobile && (
        <div className="pointer-events-auto absolute bottom-6 right-6 z-20 w-[22rem]">
          <div className="relative rounded-2xl border border-copper-500/35 bg-white/85 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => handleMineSelect(null)}
              className="absolute right-3 top-3 text-graphite-500 transition hover:text-graphite-950"
              aria-label="Close details"
            >
              ✕
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper-500">
              {selectedMine.companyName}
            </p>
            <h2 className="mt-1 pr-6 font-[family-name:var(--font-display)] text-lg font-semibold text-graphite-950">
              {selectedMine.locationName}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-graphite-600">
              {selectedMine.tagline}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="font-mono uppercase tracking-wider text-graphite-500">
                  Latitude
                </dt>
                <dd className="mt-0.5 text-graphite-950">
                  {selectedMine.lat.toFixed(5)}°
                </dd>
              </div>
              <div>
                <dt className="font-mono uppercase tracking-wider text-graphite-500">
                  Longitude
                </dt>
                <dd className="mt-0.5 text-graphite-950">
                  {selectedMine.lng.toFixed(5)}°
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
