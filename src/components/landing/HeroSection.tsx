"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { SquareButton } from "@/components/ui/SquareButton";
import { SplitReveal } from "@/components/ui/SplitReveal";
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path";

/**
 * Vertical S-curve path for the stone marquee.
 * Runs top-to-bottom within a 400×1200 viewBox, weaving gently left-right
 * so the images stay within the right column but feel organic.
 */
const VERTICAL_PATH =
  "M 200 -100 C 100 100, 340 250, 200 450 C 60 650, 340 800, 200 1000 C 80 1180, 320 1300, 200 1400";

/** Mineral specimen images from the public folder. */
const STONES = [
  { src: "/images/durr-quartz-3.jpg", alt: "Durr quartz specimen" },
  { src: "/images/copper-generic-2.jpg", alt: "Copper ore specimen" },
  { src: "/images/nephrite-2.jpg", alt: "Nephrite jade specimen" },
  { src: "/images/mo-2.jpg", alt: "Molybdenum specimen" },
  { src: "/images/quartz-4.jpg", alt: "Quartz crystal specimen" },
  { src: "/images/ruby-bagicha.jpg", alt: "Ruby from Bagicha mine" },
  { src: "/images/lithium-bagicha.jpg", alt: "Lithium ore specimen" },
];

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
      <div className="relative pb-10 pt-32 md:pb-14 md:pt-40">
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
        <div className="relative z-20 mx-auto max-w-[105rem] px-5 py-20 md:px-10 md:py-28">
          <div className="max-w-[34rem]">
            <p className="text-xl leading-[1.35] text-bone-50 md:text-2xl">
              Game of Stones operates three licensed mining companies across
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

      {/* Vertical stone marquee — travels along an S-curve down the right
          column, spanning both the bone plate and the copper band. Hidden on
          small screens where the column would overlap the copy. */}
      <div
        className="absolute inset-y-0 right-0 z-10 hidden w-[34%] md:block lg:w-[30%]"
        aria-hidden
      >
        <MarqueeAlongSvgPath
          path={VERTICAL_PATH}
          viewBox="0 0 400 1200"
          preserveAspectRatio="xMidYMid slice"
          baseVelocity={3}
          direction="normal"
          slowdownOnHover
          slowDownFactor={0.25}
          draggable
          dragSensitivity={0.15}
          grabCursor
          repeat={2}
          responsive
          className="h-full w-full pointer-events-auto"
        >
          {STONES.map((stone, i) => (
            <div
              key={i}
              className="w-[5.5rem] h-[7.5rem] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 hover:scale-110 transition-transform duration-300 ease-out"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stone.src}
                alt={stone.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </MarqueeAlongSvgPath>
      </div>
    </section>
  );
}
