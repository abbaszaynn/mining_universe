"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    title: "Copper & polymetallic ore",
    body: "High-grade copper and complex polymetallic structures across Skardu, Shigar, and Gultari.",
  },
  {
    title: "Marble & construction stone",
    body: "Premium marble and granite deposits in Bagicha and Ghizer, ready for export and domestic supply.",
  },
  {
    title: "Gold & precious minerals",
    body: "Placer gold, gemstones, and rare earth indications across multiple licensed concessions.",
  },
  {
    title: "Verified documentation",
    body: "Geological reports, incorporation letters, and topography maps available for due diligence.",
  },
];

export function HorizontalStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 64),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-[100dvh] overflow-hidden bg-[#030712]/80"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
      <div className="flex h-[100dvh] flex-col justify-center px-6 py-16 md:px-12">
        <p className="mb-10 max-w-xl font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
          Mineral portfolio
        </p>
        <h2 className="mb-12 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl">
          Variety beneath the peaks, three operators, one region.
        </h2>
        <div className="relative -mx-6 flex-1 md:-mx-12">
          <div
            ref={trackRef}
            className={cn(
              "flex h-full min-w-max gap-6 px-6 will-change-transform md:gap-10 md:px-12"
            )}
          >
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="flex h-[min(420px,55vh)] w-[min(88vw,380px)] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 shadow-[0_0_0_1px_rgba(212,175,55,0.08)] backdrop-blur-md transition-transform duration-500 hover:-translate-y-1 hover:border-[#d4af37]/35"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#f0f4f7] md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#94a3b8] md:text-base">
                    {card.body}
                  </p>
                </div>
                <div className="mt-8 h-1 w-12 rounded-full bg-gradient-to-r from-[#d4af37] to-transparent" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
