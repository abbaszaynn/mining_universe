"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useMotionValue, animate } from "motion/react";
import { GridLines } from "@/components/ui/GridLines";
import { VerticalCardStack, type StackSlide } from "@/components/ui/VerticalCardStack";
import { useScrollState } from "@/context/scroll-context";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "Exploration & Licensing",
    body: "We hold government-granted exploration licences and manage every renewal, NOC and regulatory filing in-house — so a concession you review today is one you can act on tomorrow.",
    image: "/blogs/b1.jpeg",
    badge: "Survey",
  },
  {
    title: "Extraction & Processing",
    body: "Traditional mining discipline paired with modern survey, automation and processing methods — raising recovery rates while keeping our footprint on the valley floor as small as possible.",
    image: "/blogs/b2.jpeg",
    badge: "Extraction",
  },
  {
    title: "Unified Management",
    body: "Durr Mines and Zircon Mines operate as one consolidated group, letting us pool equipment, geology teams and logistics across eight concessions instead of three separate balance sheets.",
    image: "/blogs/b3.jpeg",
    badge: "Scale",
  },
  {
    title: "Export & Global Trade",
    body: "From pit to port. We handle grading, documentation and export clearance for buyers, distributors and jewellery manufacturers across Asia, the Gulf, Europe and North America.",
    image: "/blogs/b4.jpeg",
    badge: "Export",
  },
];

/** Must mirror the `pin` screen in tailwind.config.ts — the scroll driver and
 *  the CSS pinning have to switch on at exactly the same breakpoint. */
const PIN_QUERY = "(min-width: 768px) and (min-height: 760px)";

const SLIDES: StackSlide[] = SERVICES.map((s) => ({
  image: s.image,
  title: s.title,
  badge: s.badge,
}));

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const cardProgress = useMotionValue(0);
  const { lenisRef } = useScrollState();

  const last = SERVICES.length - 1;

  /** The sticky child already does the pinning, so progress is just this
   *  section's travel through the viewport — read straight off its rect rather
   *  than through ScrollTrigger, whose measurements race the loader here. */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pinned = window.matchMedia(PIN_QUERY);
    let lastStep = -1;

    const update = () => {
      // Outside the pinned range the section is a normal block and the steps
      // are tapped rather than scrubbed.
      if (!pinned.matches) return;

      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / travel)) * last;
      cardProgress.set(p);

      const step = Math.min(last, Math.max(0, Math.round(p)));
      if (step !== lastStep) {
        lastStep = step;
        setActive(step);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    pinned.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      pinned.removeEventListener("change", update);
    };
  }, [cardProgress, last]);

  /** Clicking a step scrolls to the position that step occupies, so the
   *  scrubbing and the click affordance never fight each other. */
  const goToStep = (i: number) => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia(PIN_QUERY).matches) {
      setActive(i);
      animate(cardProgress, i, { type: "spring", stiffness: 200, damping: 30 });
      return;
    }

    const rect = section.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const travel = rect.height - window.innerHeight;
    const target = top + (travel * i) / last;

    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-bone-100 pin:h-[360vh]"
    >
      <div className="relative overflow-hidden pin:sticky pin:top-0 pin:h-[100dvh]">
        <GridLines />

        {/* Anchored to the top, not centred: the content is taller than the
            pinned viewport, and centring pushed the heading up out of the
            clipped box. Top padding clears the fixed header. */}
        <div className="relative mx-auto flex h-full max-w-[105rem] flex-col justify-start px-5 py-24 md:px-10 pin:pb-8 pin:pt-[clamp(6.5rem,13vh,9rem)]">
          {/* Raised above the card stack — the cards fan well outside their
              own box and would otherwise paint over the heading, since they
              come later in DOM order. */}
          <h2 className="relative z-20 text-display-lg tracking-[-0.035em] text-graphite-950">
            What We Do
          </h2>

          <div className="mt-6 grid gap-8 border-t border-graphite-950/12 pt-6 lg:grid-cols-2 lg:gap-12">
            {/* Card stack */}
            <div>
              <p className="relative z-20 flex items-center gap-2.5 text-xs uppercase tracking-[0.08em] text-graphite-500">
                <span className="h-2 w-2 rounded-full bg-graphite-950" aria-hidden />
                Our approach
              </p>
              <VerticalCardStack
                slides={SLIDES}
                progress={cardProgress}
                className="relative z-0 mt-6 h-[clamp(12rem,32vh,26rem)] w-full"
              />
            </div>

            {/* Steps */}
            <div>
              <p className="hidden max-w-[56ch] text-base leading-[1.45] text-graphite-400 md:block">
                Game of Stones explores, extracts and commercially manages
                high-value gemstones and minerals across Gilgit Baltistan —
                bridging traditional mining with modern technology, from licence
                through to last-mile export.
              </p>

              <ol className="mt-6 border-t border-graphite-950/12">
                {SERVICES.map((service, i) => {
                  const isActive = active === i;
                  return (
                    <li key={service.title} className="border-b border-graphite-950/12">
                      <button
                        type="button"
                        onClick={() => goToStep(i)}
                        aria-current={isActive}
                        className="flex w-full items-start gap-4 py-3.5 text-left"
                      >
                        <span
                          className={cn(
                            "mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-xs transition-colors duration-base ease-out",
                            isActive
                              ? "bg-graphite-950 text-bone-50"
                              : "border border-graphite-950/25 text-graphite-400"
                          )}
                        >
                          {i + 1}
                        </span>

                        <span className="flex-1">
                          <span
                            className={cn(
                              "block text-lg leading-tight tracking-[-0.02em] transition-colors duration-base ease-out md:text-[1.5rem]",
                              isActive ? "text-graphite-950" : "text-graphite-300"
                            )}
                          >
                            {service.title}
                          </span>
                          <span
                            className={cn(
                              "grid transition-[grid-template-rows,opacity] duration-slow ease-out",
                              isActive
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <span className="overflow-hidden">
                              <span className="block max-w-[52ch] pt-2 text-sm leading-[1.45] text-graphite-500">
                                {service.body}
                              </span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
