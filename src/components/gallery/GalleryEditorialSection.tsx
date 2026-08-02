"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

type GalleryEditorialSectionProps = {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  onOpen: (image: GalleryImage) => void;
  index: number;
};

/** Editorial row sizes — varied widths, shared baseline like portfolio grids */
const SIZE_PATTERN = [
  { height: "100%", width: "clamp(9rem,14vw,11.5rem)" },
  { height: "88%", width: "clamp(10rem,16vw,13rem)" },
  { height: "72%", width: "clamp(12rem,20vw,16rem)" },
  { height: "94%", width: "clamp(8rem,12vw,10rem)" },
  { height: "82%", width: "clamp(11rem,17vw,14rem)" },
  { height: "96%", width: "clamp(9.5rem,14vw,12rem)" },
] as const;

function displayTitle(name: string) {
  return name.split(" (")[0].toUpperCase();
}

export function GalleryEditorialSection({
  title,
  subtitle,
  images,
  onOpen,
  index: sectionIndex,
}: GalleryEditorialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-gal-ed-header]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-gal-ed-tile]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-gal-ed-row]"),
            start: "top 88%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [images.length]);

  if (!images.length) return null;

  return (
    <section
      ref={sectionRef}
      data-gal-section
      className="relative border-t border-graphite-950/[0.06] py-14 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(233,122,60,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233,122,60,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(233,122,60,0.5) 0.5px, transparent 0.6px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative">
        <header data-gal-ed-header className="mb-8 md:mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite-500">
            Division {String(sectionIndex + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-[0.12em] text-graphite-950 md:text-3xl lg:text-4xl">
            {displayTitle(title)}
          </h2>
          {subtitle && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-copper-500/75">
              {subtitle}
            </p>
          )}
          <div className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-copper-500/40 via-graphite-950/10 to-transparent" />
        </header>

        <div
          ref={scrollRef}
          data-gal-ed-row
          className="relative -mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:-mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-max items-end gap-0 h-[min(42vh,22rem)] min-h-[14rem] sm:min-h-[16rem] md:min-h-[18rem]">
            {images.map((image, i) => {
              const size = SIZE_PATTERN[i % SIZE_PATTERN.length];
              return (
                <button
                  key={image.id}
                  type="button"
                  data-gal-ed-tile
                  onClick={() => onOpen(image)}
                  className={cn(
                    "group relative shrink-0 overflow-hidden bg-bone-50",
                    "border-r border-graphite-950/[0.06] last:border-r-0",
                    "transition-[transform,filter] duration-500 ease-out",
                    "hover:z-10 hover:-translate-y-1 hover:brightness-110",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-500/50"
                  )}
                  style={{
                    height: size.height,
                    width: size.width,
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-graphite-950/0 transition duration-500 group-hover:bg-graphite-950/10" />
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-graphite-950/95 via-graphite-950/50 to-transparent p-3 md:p-4">
                        {image.mineral && (
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-copper-500">
                            {image.mineral}
                          </p>
                        )}
                        <p className="mt-1 line-clamp-2 text-left text-xs font-medium text-bone-50 md:text-sm">
                          {image.title}
                        </p>
                      </div>
                    </div>
                    <span
                      className="pointer-events-none absolute left-2 top-2 font-[family-name:var(--font-display)] text-lg font-bold text-bone-50/70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition duration-500 group-hover:text-bone-50 md:text-xl"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-graphite-500">
            {images.length} specimens · scroll to browse
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => scrollContainer("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-graphite-950/10 text-graphite-500 transition-colors hover:bg-graphite-950/5 hover:text-graphite-950 focus-visible:outline-copper-500"
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.5 15L7.5 10l5-5" />
              </svg>
            </button>
            <button
              onClick={() => scrollContainer("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-graphite-950/10 text-graphite-500 transition-colors hover:bg-graphite-950/5 hover:text-graphite-950 focus-visible:outline-copper-500"
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.5 5l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
