"use client";

// The globe renders outside the /map route, which owns the only other import
// of this stylesheet — without it MapLibre's canvas positioning is undefined.
import "maplibre-gl/dist/maplibre-gl.css";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASES } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { SquareButton } from "@/components/ui/SquareButton";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";

/** Wide orbital view → the Gilgit Baltistan concession belt. */
const FROM_VIEW = { lng: 8, lat: 20, zoom: 1.35, pitch: 0, bearing: 0 };
const TO_VIEW = { lng: 74.9, lat: 35.6, zoom: 8.4, pitch: 56, bearing: -14 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Ease the camera so the descent accelerates like a real fly-in. */
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export function GlobeLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;
    const mapNode = mapNodeRef.current;
    if (!section || !frame || !content || !mapNode) return;

    let disposed = false;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (disposed) return;

      const map = new maplibregl.Map({
        container: mapNode,
        center: [FROM_VIEW.lng, FROM_VIEW.lat],
        zoom: FROM_VIEW.zoom,
        pitch: FROM_VIEW.pitch,
        bearing: FROM_VIEW.bearing,
        interactive: false,
        attributionControl: false,
        style: {
          version: 8,
          // Real 3D sphere at low zoom, flattening as it descends — the
          // Google-Earth-style approach, on real satellite imagery.
          projection: { type: "globe" },
          sources: {
            satellite: {
              type: "raster",
              tiles: [
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
              attribution: "Esri, Maxar, Earthstar Geographics",
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
          layers: [{ id: "satellite", type: "raster", source: "satellite" }],
        } as unknown as StyleSpecification,
      });

      mapRef.current = map;
      map.on("load", () => {
        if (disposed) return;
        map.setTerrain({ source: "terrain-dem", exaggeration: 1.4 });
        ScrollTrigger.refresh();
      });
    })();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          onUpdate: (self) => {
            const map = mapRef.current;
            if (!map) return;
            // Camera lands by ~68% so the copy has a steady frame to read against.
            const t = easeInOut(Math.min(self.progress / 0.68, 1));
            map.jumpTo({
              center: [lerp(FROM_VIEW.lng, TO_VIEW.lng, t), lerp(FROM_VIEW.lat, TO_VIEW.lat, t)],
              zoom: lerp(FROM_VIEW.zoom, TO_VIEW.zoom, t),
              pitch: lerp(FROM_VIEW.pitch, TO_VIEW.pitch, t),
              bearing: lerp(FROM_VIEW.bearing, TO_VIEW.bearing, t),
            });
          },
        },
      });

      // Normalised 0–1 timeline so the beats stay legible against the scrub.
      tl.fromTo(
        frame,
        { scale: 0.62, borderRadius: "10px" },
        { scale: 1, borderRadius: "0px", ease: "none", duration: 0.6 },
        0
      )
        .fromTo(marqueeRef.current, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.25 }, 0.08)
        .fromTo(
          content,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, ease: EASES.out, duration: 0.18 },
          0.7
        );
    }, section);

    return () => {
      disposed = true;
      ctx.revert();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-sand-100">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <GridLines />

        {/* Marquee sits behind the frame and fades as the globe takes over */}
        <div
          ref={marqueeRef}
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
          aria-hidden
        >
          <div
            className="flex w-max whitespace-nowrap"
            style={{ animation: "marquee-scroll 30s linear infinite" }}
          >
            {[0, 1].map((rep) => (
              <span key={rep} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="mx-8 text-marquee uppercase tracking-[-0.03em] text-copper-700"
                  >
                    Licensed mining at the source.
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Growing globe frame */}
        <div className="absolute inset-0 flex items-center justify-center px-5 md:px-10">
          <div
            ref={frameRef}
            className="relative h-[62vh] w-full max-w-[105rem] overflow-hidden bg-graphite-950 will-change-transform md:h-[70vh]"
          >
            <div ref={mapNodeRef} className="h-full w-full" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>

        {/* Copy that lands once the descent finishes */}
        <div
          ref={contentRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-14 md:px-10 md:pb-20"
        >
          <div className="mx-auto grid max-w-[105rem] gap-8 md:grid-cols-2 md:items-end md:gap-16">
            <h2 className="text-display-lg tracking-[-0.03em] text-bone-50">
              Licensed Mines
              <br />
              <span className="text-copper-500">in the North</span>
            </h2>
            <div className="pointer-events-auto">
              <p className="max-w-[38ch] text-lg leading-[1.4] text-bone-100/90 md:text-xl">
                Ten licensed concessions across Skardu, Gilgit and Ghizer,
                each with surveyed boundaries, government permits and
                coordinates you can verify before you travel.
              </p>
              <div className="mt-8">
                <SquareButton href="/map" tone="light">
                  Open the mine map
                </SquareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
