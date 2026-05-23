"use client";

import { useEffect, useRef } from "react";
import type { Company } from "@/lib/types";
import type { Map as MapLibreMap, GeoJSONSource } from "maplibre-gl";

type MiningMapGlProps = {
  companies: Company[];
  selectedMineId: string | null;
  onMineSelect: (id: string | null) => void;
  terrain3d: boolean;
};

function polygonCenter(polygon: { lat: number; lng: number }[]) {
  const lat = polygon.reduce((sum, p) => sum + p.lat, 0) / polygon.length;
  const lng = polygon.reduce((sum, p) => sum + p.lng, 0) / polygon.length;
  return { lat, lng };
}

function buildGeoJson(companies: Company[]) {
  const boundaries: GeoJSON.Feature[] = [];
  const labels: GeoJSON.Feature[] = [];

  companies.forEach((company) => {
    company.locations.forEach((location) => {
      if (!location.polygon?.length) return;

      const mineId = `${company.id}::${location.name}`;
      const ring = location.polygon.map((p) => [p.lng, p.lat] as [number, number]);
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        ring.push(first);
      }

      const center = polygonCenter(location.polygon);

      boundaries.push({
        type: "Feature",
        properties: {
          mineId,
          companyId: company.id,
          companyName: company.name,
          locationName: location.name,
          status: company.status,
          lat: center.lat.toFixed(5),
          lng: center.lng.toFixed(5),
        },
        geometry: {
          type: "Polygon",
          coordinates: [ring],
        },
      });

      labels.push({
        type: "Feature",
        properties: {
          mineId,
          locationName: location.name,
        },
        geometry: {
          type: "Point",
          coordinates: [center.lng, center.lat],
        },
      });
    });
  });

  return {
    boundaries: {
      type: "FeatureCollection" as const,
      features: boundaries,
    },
    labels: {
      type: "FeatureCollection" as const,
      features: labels,
    },
  };
}

export function MiningMapGl({
  companies,
  selectedMineId,
  onMineSelect,
  terrain3d,
}: MiningMapGlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const onSelectRef = useRef(onMineSelect);
  onSelectRef.current = onMineSelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: MapLibreMap | null = null;
    let disposed = false;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;

      if (disposed || !containerRef.current) return;

      map = new maplibregl.Map({
        container: containerRef.current,
        center: [74.5, 35.8],
        zoom: 7.2,
        pitch: terrain3d ? 52 : 0,
        bearing: terrain3d ? -12 : 0,
        maxPitch: 72,
        style: {
          version: 8,
          sources: {
            satellite: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution:
                "Esri, Maxar, Earthstar Geographics | Terrain: AWS Terrarium",
            },
            "terrain-dem": {
              type: "raster-dem",
              tiles: [
                "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              encoding: "terrarium",
              maxzoom: 14,
            },
          },
          layers: [
            {
              id: "satellite",
              type: "raster",
              source: "satellite",
            },
          ],
        },
      });

      map.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true }),
        "bottom-right"
      );

      map.on("load", () => {
        if (!map) return;

        map.setTerrain({
          source: "terrain-dem",
          exaggeration: terrain3d ? 1.45 : 0,
        });

        const geo = buildGeoJson(companies);

        map.addSource("mine-boundaries", {
          type: "geojson",
          data: geo.boundaries,
        });

        map.addSource("mine-labels", {
          type: "geojson",
          data: geo.labels,
        });

        map.addLayer({
          id: "mine-lines",
          type: "line",
          source: "mine-boundaries",
          paint: {
            "line-color": "#d4af37",
            "line-width": 2,
            "line-opacity": 0.9,
          },
        });

        map.addLayer({
          id: "mine-lines-selected",
          type: "line",
          source: "mine-boundaries",
          paint: {
            "line-color": "#f5e6a8",
            "line-width": 3.5,
            "line-opacity": 1,
          },
          filter: ["==", ["get", "mineId"], ""],
        });

        map.addLayer({
          id: "mine-labels-layer",
          type: "symbol",
          source: "mine-labels",
          layout: {
            "text-field": ["get", "locationName"],
            "text-size": 11,
            "text-offset": [0, 1.2],
            "text-anchor": "top",
            "text-max-width": 12,
          },
          paint: {
            "text-color": "#f0f4f7",
            "text-halo-color": "#030712",
            "text-halo-width": 1.5,
          },
        });

        map.on("click", "mine-lines", (event) => {
          const feature = event.features?.[0];
          const mineId = feature?.properties?.mineId;
          if (typeof mineId === "string") {
            onSelectRef.current(mineId);
          }
        });

        map.on("mouseenter", "mine-lines", () => {
          map!.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "mine-lines", () => {
          map!.getCanvas().style.cursor = "";
        });

        requestAnimationFrame(() => map?.resize());
      });

      mapRef.current = map;
    })();

    const resizeObserver = new ResizeObserver(() => {
      mapRef.current?.resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const geo = buildGeoJson(companies);
    const boundarySource = map.getSource("mine-boundaries") as GeoJSONSource | undefined;
    const labelSource = map.getSource("mine-labels") as GeoJSONSource | undefined;
    boundarySource?.setData(geo.boundaries);
    labelSource?.setData(geo.labels);
  }, [companies]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const applySelection = () => {
      if (!map.getLayer("mine-lines-selected")) return;

      map.setFilter("mine-lines-selected", [
        "==",
        ["get", "mineId"],
        selectedMineId ?? "",
      ]);

      if (!selectedMineId) return;

      for (const company of companies) {
        for (const location of company.locations) {
          const mineId = `${company.id}::${location.name}`;
          if (mineId === selectedMineId && location.polygon.length > 0) {
            const center = polygonCenter(location.polygon);
            map.flyTo({
              center: [center.lng, center.lat],
              zoom: 12.5,
              pitch: terrain3d ? 58 : 0,
              bearing: terrain3d ? -18 : 0,
              duration: 1600,
              essential: true,
            });
            return;
          }
        }
      }
    };

    if (map.isStyleLoaded()) {
      applySelection();
    } else {
      map.once("load", applySelection);
    }
  }, [selectedMineId, companies, terrain3d]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    map.setTerrain({
      source: "terrain-dem",
      exaggeration: terrain3d ? 1.45 : 0,
    });

    map.easeTo({
      pitch: terrain3d ? 52 : 0,
      bearing: terrain3d ? -12 : 0,
      duration: 900,
    });
  }, [terrain3d]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      aria-label="3D terrain map of mining locations in Gilgit Baltistan"
    />
  );
}
