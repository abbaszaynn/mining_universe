"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";
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

/** "Copper, Antimony, Garnet" — the minerals in a site group, in first-seen order. */
function siteMinerals(images: GalleryImage[]) {
  return Array.from(
    new Set(images.map((image) => image.mineral).filter(Boolean)),
  ).join(", ");
}

function displayTitle(name: string) {
  return name.split(" (")[0].toUpperCase();
}

/**
 * One division of the archive as a uniform catalogue grid.
 *
 * Replaced a horizontally scrolling strip of mixed-height tiles (Oct 2026):
 * only five or six photos were ever on screen, the rest hidden behind
 * arrows, and the ragged heights read as unfinished. Every photo now sits in
 * the same 4:5 frame with its mineral and title printed underneath, so a
 * division can be scanned at a glance and nothing depends on scrolling
 * sideways.
 */
export function GalleryEditorialSection({
  title,
  subtitle,
  images,
  onOpen,
  index: sectionIndex,
}: GalleryEditorialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const mineralCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const image of images) {
      if (!image.mineral) continue;
      counts.set(image.mineral, (counts.get(image.mineral) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [images]);

  /**
   * Sub-groups by site when a division spans more than one (Zircon Mines:
   * Hilal Abad nephrite, then Askoli samples). Order follows the data file;
   * images without a site collect in a trailing "Other specimens" group.
   */
  const siteGroups = useMemo(() => {
    const groups = new Map<string, GalleryImage[]>();
    for (const image of images) {
      const key = image.site ?? "";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(image);
    }
    const ordered = Array.from(groups.entries()).sort(
      ([a], [b]) => Number(a === "") - Number(b === ""),
    );
    let offset = 0;
    return ordered.map(([site, list]) => {
      const group = { site: site || "Other specimens", images: list, offset };
      offset += list.length;
      return group;
    });
  }, [images]);
  const showSites = siteGroups.length > 1;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-gal-ed-header]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        },
      );

      section.querySelectorAll("[data-gal-ed-grid]").forEach((grid) => {
        gsap.fromTo(
          grid.querySelectorAll("[data-gal-ed-tile]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.035,
            ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 90%", once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [images.length, siteGroups.length]);

  if (!images.length) return null;

  return (
    <section
      ref={sectionRef}
      data-gal-section
      aria-labelledby={`gal-division-${sectionIndex}`}
      className="border-t border-graphite-950/[0.08] py-14 md:py-20"
    >
      <header
        data-gal-ed-header
        className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite-500">
            Division {String(sectionIndex + 1).padStart(2, "0")}
          </p>
          <h2
            id={`gal-division-${sectionIndex}`}
            className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-[0.12em] text-graphite-950 md:text-3xl"
          >
            {displayTitle(title)}
          </h2>
          {subtitle && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-copper-600">
              {subtitle}
            </p>
          )}
        </div>

        {mineralCounts.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5 md:max-w-[50%] md:justify-end">
            {mineralCounts.map(([mineral, count]) => (
              <li
                key={mineral}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-500"
              >
                {mineral}{" "}
                <span className="tabular-nums text-graphite-950">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </header>

      {siteGroups.map((group, groupIndex) => (
        <div
          key={group.site}
          className={cn(groupIndex > 0 && "mt-14 md:mt-16")}
        >
          {showSites && (
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-graphite-950/[0.08] pb-3">
              <h3 className="font-[family-name:var(--font-display)] text-base font-semibold uppercase tracking-[0.14em] text-graphite-950 md:text-lg">
                {group.site}
              </h3>
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-500">
                {siteMinerals(group.images)} ·{" "}
                <span className="tabular-nums">{group.images.length}</span>
              </p>
            </div>
          )}
          <ul
            data-gal-ed-grid
            className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:gap-x-4 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5"
          >
            {group.images.map((image, j) => {
              const i = group.offset + j;
              return (
                <li key={image.id} data-gal-ed-tile>
                  <button
                    type="button"
                    onClick={() => onOpen(image)}
                    className="group block w-full text-left focus-visible:outline-none"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-graphite-950/[0.06] ring-1 ring-graphite-950/[0.08] transition duration-300 group-hover:ring-copper-500/50 group-focus-visible:ring-2 group-focus-visible:ring-copper-500">
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, (min-width: 640px) 31vw, 48vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden
                        className="absolute left-2 top-2 rounded-sm bg-graphite-950/55 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-bone-50 backdrop-blur-sm"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        aria-hidden
                        className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-bone-50/90 text-graphite-950 opacity-0 shadow-sm transition duration-300 group-hover:opacity-100"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          className="h-3.5 w-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.6"
                            d="M8 3H3v5M12 3h5v5M8 17H3v-5M12 17h5v-5"
                          />
                        </svg>
                      </span>
                    </div>
                    {image.mineral && (
                      <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-copper-600">
                        {image.mineral}
                      </p>
                    )}
                    <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-graphite-700 transition-colors group-hover:text-graphite-950">
                      {image.title}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
