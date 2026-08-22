"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, EASES } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { cn } from "@/lib/utils";
import { DIRECTORS } from "@/lib/directors";


export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set([0, 4]));

  // Idle organic fluctuation — randomly toggles cards on and off to create an elegant twinkling effect.
  // setInterval rather than rAF so it survives a throttled tab predictably.
  useEffect(() => {
    if (hovered !== null) return;
    
    const id = window.setInterval(() => {
      setActiveIndices(prev => {
        const next = new Set(prev);
        
        // Randomly toggle 1 or 2 cards
        const toggleCount = Math.random() > 0.5 ? 2 : 1;
        for (let i = 0; i < toggleCount; i++) {
          const randIdx = Math.floor(Math.random() * DIRECTORS.length);
          if (next.has(randIdx)) {
            next.delete(randIdx);
          } else {
            next.add(randIdx);
          }
        }
        
        // Ensure we always have between 1 and 3 cards lit simultaneously
        // so it looks elegant and not too busy or entirely blank.
        while (next.size > 3) {
          const item = Array.from(next)[Math.floor(Math.random() * next.size)];
          next.delete(item);
        }
        while (next.size < 1) {
          next.add(Math.floor(Math.random() * DIRECTORS.length));
        }
        
        return next;
      });
    }, 1200);

    return () => window.clearInterval(id);
  }, [hovered]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-director]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASES.out,
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const isHovering = hovered !== null;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bone-100 min-h-[100dvh] flex flex-col justify-center py-20 md:py-32"
    >
      <GridLines />

      {/* Everything in the section sits under this wash while a card is held —
          only the spotlit card is lifted above it. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 bg-graphite-950 transition-opacity duration-slow ease-out",
          isHovering ? "opacity-40" : "opacity-0"
        )}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[105rem] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16 items-center w-full">
        <div className="relative z-10 lg:col-span-5 lg:pr-10">
          <Pill>Who we are</Pill>
          <SplitReveal
            as="h2"
            lines={["We are directors", "of this land."]}
            className="mt-6 text-display-lg tracking-[-0.03em] text-graphite-950"
          />
          <p className="mt-6 max-w-[46ch] text-base leading-[1.5] text-graphite-500 md:text-lg">
            Durr & Zircon Consortium is led by a group of directors from Gilgit Baltistan,
            holding legal rights to this land and its mines granted by the
            Government of Gilgit Baltistan.
          </p>
          <p className="mt-4 max-w-[46ch] text-base leading-[1.5] text-graphite-500 md:text-lg">
            We were raised in these valleys and we are still exploring them. We
            have walked these seams, and we know what the rock here is worth.
          </p>
        </div>

        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:gap-6 lg:col-start-7 lg:col-span-6"
          onMouseLeave={() => setHovered(null)}
        >
          {DIRECTORS.map((person, i) => {
            const lit = isHovering ? hovered === i : activeIndices.has(i);
            return (
              <figure
                key={person.name}
                data-director
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                className={cn(
                  "group relative flex flex-col bg-white overflow-hidden rounded-md outline-none transition-[transform,box-shadow] duration-500 ease-out cursor-pointer aspect-square",
                  // Lifted clear of the wash so it reads as the only lit thing.
                  lit && isHovering ? "z-30 -translate-y-1 shadow-elevated" : "z-10"
                )}
              >
                {/* Image layer */}
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 18vw"
                  className={cn(
                    "object-cover transition-[opacity,transform] duration-[600ms] ease-in-out",
                    lit ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  )}
                />

                {/* Text content visible only on the white background */}
                <div 
                  className={cn(
                    "absolute inset-0 p-3 lg:p-4 flex flex-col items-center justify-center text-center z-20 transition-opacity duration-[600ms] ease-in-out text-graphite-950",
                    lit ? "opacity-0" : "opacity-100"
                  )}
                >
                  <figcaption className="font-[family-name:var(--font-display)] text-base lg:text-lg font-medium leading-tight tracking-tight">
                    {person.name}
                  </figcaption>
                  <p className="mt-1.5 text-[10px] font-medium leading-tight opacity-90 lg:text-xs text-graphite-500 uppercase tracking-widest">
                    {person.role}
                  </p>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
