"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { SquareButton } from "@/components/ui/SquareButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { SpiralAnimation } from "@/components/ui/spiral-animation";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const band = bandRef.current;
    if (!section || !band) return;

    const ctx = gsap.context(() => {
      // The accent band grows upward as you scroll into it — the panel "extends"
      // rather than simply scrolling past.
      gsap.fromTo(
        band,
        { yPercent: 6 },
        {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-bone-50">
      {/* Title plate */}
      <div className="relative pb-8 pt-28 md:pb-14 md:pt-40">
        <GridLines />
        <div className="relative z-20 mx-auto max-w-[105rem] px-5 md:px-10">
          <SplitReveal
            as="h1"
            trigger="mount"
            delay={0.15}
            lines={["Licensed minerals,", "mined at source."]}
            className="max-w-[18ch] text-display-xl tracking-[-0.035em] text-graphite-950"
          />
        </div>
      </div>

      {/* Accent band */}
      <div ref={bandRef} className="relative bg-copper-500 will-change-transform">
        <GridLines tone="dark" />
        <div className="relative z-20 mx-auto max-w-[105rem] px-5 py-14 md:px-10 md:py-28">
          <div className="max-w-[34rem]">
            <p className="text-xl leading-[1.35] text-bone-50 md:text-2xl">
              Durr & Zircon Consortium operates three licensed mining companies across
              Gilgit Baltistan — extracting copper, gold, lithium, nephrite and
              polymetallic ore under full regulatory compliance.
            </p>
            <div className="mt-10">
              <SquareButton href="/investor-desk" tone="light">
                Speak with us
              </SquareButton>
            </div>
          </div>
        </div>
      </div>

      {/* Particle spiral — the canvas spans the whole hero so the field can
          drift across both plates, while the spiral itself is centred over the
          right-hand column where the copy never reaches. */}
      <SpiralAnimation
        className="pointer-events-none absolute inset-0 z-10"
        color="rgba(28,25,22,1)"
        centerX={0.74}
        centerY={0.5}
        scale={1.15}
        // Mid-cycle the field expands across the full width, which would put
        // dark specks behind the headline. Fading it out to the left keeps the
        // spread while leaving the copy column clean.
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 34%, rgba(0,0,0,0.85) 52%, #000 68%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 34%, rgba(0,0,0,0.85) 52%, #000 68%)",
        }}
      />
    </section>
  );
}
