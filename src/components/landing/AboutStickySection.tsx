"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";

/** What actually comes out of the ground across the eight concessions. */
const MINERALS = [
  "copper",
  "gold",
  "lithium",
  "nephrite",
  "antimony",
  "rare earths",
];

export function AboutStickySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only the flanking plates are scroll-driven now. The statement text used
    // to be scrubbed line-by-line across 260vh of scroll, which is what made
    // this section drag on a phone; the copy is static and the one moving
    // element runs on its own timer.
    const ctx = gsap.context(() => {
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
    <section ref={sectionRef} className="relative h-[150vh] bg-bone-50">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <GridLines />

        <div
          ref={leftRef}
          className="pointer-events-none absolute bottom-0 left-1/2 w-[50%] -translate-x-1/2 origin-bottom md:left-4 md:w-[22%] md:translate-x-0 md:origin-bottom-left"
          aria-hidden
        >
          <div className="relative aspect-[4/5] w-full drop-shadow-2xl">
            <Image src="/images/left-side.webp" alt="Energy extraction symbol" fill sizes="30vw" className="object-contain" />
          </div>
        </div>

        <div
          ref={rightRef}
          className="pointer-events-none absolute -right-12 top-[10%] hidden w-[45%] md:block md:-right-12 md:w-[45%] origin-right"
          aria-hidden
        >
          <div className="relative aspect-square w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
            <Image src="/images/right-side-new.webp" alt="Natural stones isolated" fill sizes="45vw" className="object-contain" />
          </div>
        </div>

        <div className="relative flex h-full flex-col items-center justify-center px-5 pb-32 md:px-10 md:pb-0">
          <Pill>Gilgit Baltistan is no longer overlooked</Pill>

          <div className="relative mt-8 w-full max-w-[56rem] text-center md:mt-10">
            <p className="text-[1.75rem] leading-tight tracking-[-0.025em] text-graphite-950 md:text-display-md">
              The Karakoram holds
            </p>

            {/* The cycling word sits on its own line on purpose: animating its
                width inside a centred sentence would shunt the rest of the
                line sideways on every change, which reads as jitter on a
                narrow screen. Alone, only the word itself moves. */}
            <p className="mt-1 text-[1.75rem] leading-tight tracking-[-0.025em] md:text-display-md">
              <AnimatedTextCycle
                words={MINERALS}
                interval={2200}
                className="text-copper-500"
              />
            </p>

            <p className="mx-auto mt-8 max-w-[52ch] text-base leading-[1.55] text-graphite-500 md:text-lg">
              For decades this wealth was treated as rumour; significant, but
              unmapped. That ambiguity is gone. Three registered operators
              across Skardu, Gilgit and Ghizer, with reports, permits and site
              access handled end to end.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
