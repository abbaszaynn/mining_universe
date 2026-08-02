"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";

/** Authored line breaks — deterministic, so each line can carry its own mask. */
const STATEMENTS = [
  [
    "For decades the mineral wealth of the",
    "Karakoram was treated as rumour —",
    "significant, but unmapped. That",
    "ambiguity is gone.",
  ],
  [
    "Gilgit Baltistan holds one of Asia's",
    "richest untapped mineral corridors —",
    "copper, gold, lithium, nephrite and",
    "rare earth indications.",
  ],
  [
    "Three registered operators across",
    "Skardu, Gilgit and Ghizer, with reports,",
    "permits and site access handled",
    "end to end.",
  ],
];

export function AboutStickySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-statement]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          // Low scrub keeps lines locked to the wheel instead of drifting
          // behind it, which is what made the previous pass feel loose.
          scrub: 0.35,
        },
      });

      // Each statement gets an equal slot; lines wipe in, hold, then wipe out.
      const slot = 1 / blocks.length;

      blocks.forEach((block, i) => {
        const lines = block.querySelectorAll("[data-line-inner]");
        const start = i * slot;

        gsap.set(lines, { yPercent: i === 0 ? 0 : 110 });

        if (i > 0) {
          tl.to(
            lines,
            { yPercent: 0, duration: slot * 0.42, stagger: slot * 0.05, ease: "power2.out" },
            start
          );
        }

        if (i < blocks.length - 1) {
          tl.to(
            lines,
            {
              yPercent: -110,
              duration: slot * 0.42,
              stagger: slot * 0.05,
              ease: "power2.in",
            },
            start + slot * 0.58
          );
        }
      });

      [leftRef.current, rightRef.current].forEach((el, i) => {
        if (!el) return;
        
        // Left image gets dim + scale effect on scroll
        if (i === 0) {
          gsap.fromTo(
            el,
            { yPercent: 24, scale: 0.7, opacity: 0.35 },
            {
              yPercent: -10,
              scale: 1.15,
              opacity: 0.65, // Remains somewhat dim
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            }
          );
        } else {
          // Right image prominent scale, float & fade effect
          gsap.fromTo(
            el,
            { yPercent: 25, scale: 0.75, rotation: 12, opacity: 0.2 },
            {
              yPercent: -15,
              scale: 1.15,
              rotation: -5,
              opacity: 0.65, // Remains dimmed like the left side
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "bottom top",
                scrub: 0.7,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[260vh] bg-bone-50">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <GridLines />

        <div
          ref={leftRef}
          className="pointer-events-none absolute bottom-0 left-1/2 w-[50%] -translate-x-1/2 origin-bottom md:left-4 md:w-[22%] md:translate-x-0 md:origin-bottom-left"
          aria-hidden
        >
          <div className="relative aspect-[4/5] w-full drop-shadow-2xl">
            <Image src="/images/left-side.png" alt="Energy extraction symbol" fill sizes="30vw" className="object-contain" />
          </div>
        </div>

        <div
          ref={rightRef}
          className="pointer-events-none absolute -right-12 top-[10%] hidden w-[45%] md:block md:-right-12 md:w-[45%] origin-right"
          aria-hidden
        >
          <div className="relative aspect-square w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
            <Image src="/images/right-side-new.png" alt="Natural stones isolated" fill sizes="45vw" className="object-contain" />
          </div>
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-5 md:px-10">
          <Pill>Gilgit Baltistan is no longer overlooked</Pill>

          <div className="relative mt-10 w-full max-w-[56rem]">
            {STATEMENTS.map((lines, i) => (
              <div
                key={i}
                data-statement
                className={i === 0 ? "relative" : "absolute inset-0"}
                aria-label={lines.join(" ")}
              >
                {lines.map((line, j) => (
                  <span key={j} className="line-mask" aria-hidden>
                    <span
                      data-line-inner
                      className="block text-center text-display-md tracking-[-0.025em] text-graphite-950"
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
