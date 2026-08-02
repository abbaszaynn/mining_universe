"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { GridLines } from "@/components/ui/GridLines";
import { SquareButton } from "@/components/ui/SquareButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Pill } from "@/components/ui/Pill";
import type { Map as MapLibreMap, StyleSpecification, Marker } from "maplibre-gl";

/**
 * Coordinates come from the surveyed concession polygons in companies-data
 * wherever we hold one. Ishkoman and Gojal are positioned on the settlements
 * themselves — we operate in those valleys but the boundaries are not yet
 * surveyed, so they are marked as locations rather than licensed blocks.
 */
const REGIONS = [
  { name: "Askoli", district: "District Shigar", lng: 75.867, lat: 35.661, img: "/blogs/shigar_geology.png", surveyed: true },
  { name: "Mehdiabad & Hilalabad", district: "District Kharmang", lng: 75.99, lat: 35.1, img: "/blogs/hilal_abad_geology.png", surveyed: true },
  { name: "Bagicha", district: "District Skardu", lng: 75.372, lat: 35.585, img: "/images/ruby-bagicha.jpg", surveyed: true },
  { name: "Gilgit City", district: "District Gilgit", lng: 74.326, lat: 35.865, img: "/images/lead-jutial-1.jpg", surveyed: true },
  { name: "Ishkoman", district: "District Ghizer", lng: 73.86, lat: 36.42, img: "/images/nephrite-gupis-1.jpg", surveyed: false },
  { name: "Gojal", district: "District Hunza", lng: 74.86, lat: 36.43, img: "/blogs/gb_gemstone_mining.png", surveyed: false },
  { name: "Gultari", district: "District Roundu", lng: 75.652, lat: 34.715, img: "/images/lead-gultari-1.jpg", surveyed: true },
];

export function RegionsMapSection() {
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    const node = mapNodeRef.current;
    if (!node) return;

    let disposed = false;
    let markers: Marker[] = [];

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (disposed) return;

      const map = new maplibregl.Map({
        container: node,
        center: [74.9, 35.7],
        zoom: 6.4,
        interactive: false,
        attributionControl: false,
        style: {
          version: 8,
          sources: {
            satellite: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution: "Esri, Maxar, Earthstar Geographics",
            },
          },
          layers: [
            {
              id: "satellite",
              type: "raster",
              source: "satellite",
              // Drained of colour so the terrain reads as a drafting surface
              // and the specimen photos stay the only colour on the panel.
              paint: {
                "raster-saturation": -1,
                "raster-contrast": 0.12,
                "raster-brightness-max": 0.82,
                "raster-opacity": 0.85,
              },
            },
          ],
        } as unknown as StyleSpecification,
      });

      mapRef.current = map;

      // Framing and markers are projection-only work — they do not need the
      // style to finish loading, and waiting on "load" would leave the panel
      // unmarked if tile loading stalls.
      map.fitBounds(
        [
          [73.4, 34.4],
          [76.4, 36.8],
        ],
        { padding: { top: 90, bottom: 90, left: 60, right: 60 }, duration: 0 }
      );

      markers = REGIONS.map((region) => {
        const el = document.createElement("div");
        el.className = "gos-region-marker";
        el.innerHTML = `
          <span class="gos-region-crosshair" aria-hidden="true"></span>
          <span class="gos-region-photo"><img src="${region.img}" alt="" loading="lazy" /></span>
          <span class="gos-region-label">
            <span class="gos-region-name">${region.name}</span>
            <span class="gos-region-district">${region.district}</span>
          </span>
        `;
        return new maplibregl.Marker({ element: el })
          .setLngLat([region.lng, region.lat])
          .addTo(map);
      });
    })();

    return () => {
      disposed = true;
      markers.forEach((m) => m.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-bone-50 py-24 md:py-32">
      <GridLines />

      <div className="relative mx-auto max-w-[105rem] px-5 md:px-10">
        <Pill>Where we operate</Pill>
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SplitReveal
            as="h2"
            lines={["Seven valleys.", "One licensed group."]}
            className="text-display-lg tracking-[-0.03em] text-graphite-950"
          />
          <p className="max-w-[40ch] text-base leading-[1.5] text-graphite-700">
            Our concessions run from Ghizer in the west to Kharmang on the
            eastern rim — every block surveyed, permitted and reachable.
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-[105rem] px-5 md:px-10">
        <div className="relative mt-14 h-[38rem] w-full md:h-[46rem]">
          <div ref={mapNodeRef} className="h-full w-full bg-graphite-300" aria-label="Map of Game of Stones operating regions across Gilgit Baltistan" />
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-[105rem] px-5 md:px-10">
        <SquareButton href="/map" tone="dark">
          Explore the interactive map
        </SquareButton>
      </div>
    </section>
  );
}
