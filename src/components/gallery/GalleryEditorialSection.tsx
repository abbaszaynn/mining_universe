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
      className="relative border-t border-white/[0.06] py-14 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(212,175,55,0.5) 0.5px, transparent 0.6px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative">
        <header data-gal-ed-header className="mb-8 md:mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#64748b]">
            Operator {String(sectionIndex + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-[0.12em] text-[#f0f4f7] md:text-3xl lg:text-4xl">
            {displayTitle(title)}
          </h2>
          {subtitle && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4af37]/75">
              {subtitle}
            </p>
          )}
          <div className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-[#d4af37]/40 via-white/10 to-transparent" />
        </header>

        <div
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
                    "group relative shrink-0 overflow-hidden bg-[#0a0f1e]",
                    "border-r border-white/[0.06] last:border-r-0",
                    "transition-[transform,filter] duration-500 ease-out",
                    "hover:z-10 hover:-translate-y-1 hover:brightness-110",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/50"
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
                    <div className="absolute inset-0 bg-[#030712]/0 transition duration-500 group-hover:bg-[#030712]/25" />
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/50 to-transparent p-3 md:p-4">
                        {image.mineral && (
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
                            {image.mineral}
                          </p>
                        )}
                        <p className="mt-1 line-clamp-2 text-left text-xs font-medium text-[#f0f4f7] md:text-sm">
                          {image.title}
                        </p>
                      </div>
                    </div>
                    <span
                      className="pointer-events-none absolute left-2 top-2 font-[family-name:var(--font-display)] text-lg font-bold text-[#d4af37]/20 transition duration-500 group-hover:text-[#d4af37]/45 md:text-xl"
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

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#475569]">
          {images.length} specimens · scroll to browse
        </p>
      </div>
    </section>
  );
}
