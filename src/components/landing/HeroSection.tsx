"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { SpiralAnimation } from "@/components/ui/spiral-animation";
import { motion } from "framer-motion";

function TypewriterHeading({ delay = 0.2 }: { delay?: number }) {
  let charIndex = 0;

  const SEGMENTS = [
    { text: "Licensed ", className: "block md:inline-block text-[2rem] sm:text-4xl lg:text-[4.5rem] font-light text-graphite-600 tracking-normal lg:tracking-tight align-baseline" },
    { text: "Minerals,", className: "block md:inline-block text-[3.5rem] sm:text-[4.5rem] lg:text-[4.5rem] tracking-tight font-semibold align-baseline", animateColor: true },
    { text: "\n" },
    { text: "Mined at ", className: "block md:inline-block text-[2rem] sm:text-4xl lg:text-[4.5rem] font-light text-graphite-600 tracking-normal lg:tracking-tight align-baseline mt-2 md:mt-0" },
    { text: "Source.", className: "block md:inline-block text-[3.5rem] sm:text-[4.5rem] lg:text-[4.5rem] tracking-tight font-semibold align-baseline", animateColor: true },
  ];

  return (
    <h1 className="leading-[1.1] md:leading-[1.05] text-graphite-950 font-medium whitespace-pre-wrap max-w-full">
      <span className="md:whitespace-nowrap md:inline-block block">
        {SEGMENTS.slice(0, 2).map((segment, sIdx) => {
          const chars = segment.text.split("");
          return (
            <span key={sIdx} className={segment.className}>
              {chars.map((char, cIdx) => {
                const currentIdx = charIndex++;
                return (
                  <motion.span
                    key={cIdx}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      ...(segment.animateColor ? { color: ["#111827", "#e97a3c", "#d4af37", "#111827"] } : {})
                    }}
                    transition={{
                      opacity: { duration: 0, delay: delay + currentIdx * 0.04 },
                      ...(segment.animateColor ? { color: { duration: 4, repeat: Infinity, ease: "linear", delay: delay + currentIdx * 0.04 } } : {})
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </span>
      <br className="hidden md:block" />
      <span className="md:whitespace-nowrap md:inline-block block">
        {SEGMENTS.slice(3, 5).map((segment, sIdx) => {
          const chars = segment.text.split("");
          return (
            <span key={sIdx + 3} className={segment.className}>
              {chars.map((char, cIdx) => {
                const currentIdx = charIndex++;
                return (
                  <motion.span
                    key={cIdx}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      ...(segment.animateColor ? { color: ["#111827", "#e97a3c", "#d4af37", "#111827"] } : {})
                    }}
                    transition={{
                      opacity: { duration: 0, delay: delay + currentIdx * 0.04 },
                      ...(segment.animateColor ? { color: { duration: 4, repeat: Infinity, ease: "linear", delay: delay + currentIdx * 0.04 } } : {})
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: delay + charIndex * 0.04 }}
          className="inline-block w-[0.08em] h-[0.9em] bg-copper-500 ml-2 translate-y-[0.1em]"
        />
      </span>
    </h1>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const band = bandRef.current;
    if (!section || !band) return;

    const ctx = gsap.context(() => {
      // The accent band grows upward as you scroll into it
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
    <section ref={sectionRef} className="relative overflow-hidden bg-bone-50 pt-32 pb-0 md:pt-40 md:pb-0">
      <div className="relative z-20 w-full">
        {/* Title plate - Upper Position */}
        <div className="relative pb-10 md:pb-16">
          <GridLines />
          <div className="relative z-20 mx-auto max-w-[105rem] px-5 md:px-10">
            <TypewriterHeading delay={0.2} />
          </div>
        </div>

        {/* Accent band */}
        <div ref={bandRef} className="relative bg-copper-500 will-change-transform shadow-md">
          <GridLines tone="dark" />
          <div className="relative z-20 mx-auto max-w-[105rem] px-5 py-12 md:px-10 md:py-24">
            <div className="max-w-[40rem]">
              <p className="text-[1.35rem] leading-[1.4] text-bone-50 md:text-3xl font-light">
                Durr & Zircon Consortium operates three licensed mining companies across
                Gilgit Baltistan, extracting copper, gold, lithium, nephrite and
                polymetallic ore under full regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Particle spiral */}
      <SpiralAnimation
        className="pointer-events-none absolute inset-0 z-30"
        color="rgba(28,25,22,1)"
        centerX={0.74}
        centerY={0.5}
        scale={1.15}
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
