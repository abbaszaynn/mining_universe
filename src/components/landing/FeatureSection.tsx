"use client";

import { useEffect, useRef, useState } from "react";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SplitReveal } from "@/components/ui/SplitReveal";
import GlobeStudy from "@/components/ui/globe-study";

const FEATURES = [
  {
    title: "Open to global investors",
    body: "We welcome partners from every market, with transparent company profiles, verified licences, and direct access to our investor desk.",
  },
  {
    title: "Guided field visits",
    body: "We accompany you to active sites across Gilgit Baltistan. Your safety is our responsibility from arrival through departure.",
  },
  {
    title: "Government clearance handled",
    body: "NOCs, security permissions and regulatory liaison with the authorities are fully managed. You focus on the opportunity.",
  },
];

export function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showGlobe, setShowGlobe] = useState(false);

  // The globe runs a persistent rAF/canvas loop inside its iframe — mount it
  // only once this section nears the viewport, rather than from first paint
  // while it's still several screens below the fold. A timed fallback covers
  // browsers/edge-cases where IntersectionObserver never reports back (the
  // section is short enough, or an environment that batches IO delivery
  // unpredictably) — the same fail-safe pattern used for the loader.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let settled = false;

    const reveal = () => {
      if (settled) return;
      settled = true;
      setShowGlobe(true);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: "50% 0px" }
    );
    io.observe(el);

    const fallback = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-graphite-950 py-24 md:py-36"
    >
      {/* Full-bleed background. `pointer-events-none` is deliberate: the
          vendored study captures wheel events to zoom the globe, and at
          section size that would hijack page scroll for anyone hovering
          over it. Disabling pointer events keeps the idle auto-rotation
          animating while every scroll/click passes through to the page. */}
      {showGlobe && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <GlobeStudy mode="dark" className="h-full w-full" />
        </div>
      )}

      {/* Scrim so body copy stays readable over the animated dot field. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-graphite-950/55 via-graphite-950/70 to-graphite-950/90"
        aria-hidden
      />

      <GridLines tone="dark" className="z-[2]" />

      <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
        <Pill tone="onDark">Meeting investors where they are</Pill>

        <SplitReveal
          as="h2"
          lines={["Diligence that fits", "investor reality"]}
          className="mt-8 max-w-[20ch] text-display-lg tracking-[-0.03em] text-bone-50"
        />

        <div className="mt-16 grid gap-px border-t border-white/10 md:mt-24 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="border-b border-white/10 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0"
            >
              <h3 className="text-2xl leading-[1.15] tracking-[-0.02em] text-bone-50 md:text-[1.75rem]">
                {feature.title}
              </h3>
              <p className="mt-4 max-w-[38ch] text-base leading-[1.45] text-graphite-300">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
