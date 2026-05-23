"use client";

import Image from "next/image";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { CompanyMediaLightbox } from "@/components/companies/CompanyMediaLightbox";
import {
  GallerySpecimenTile,
} from "@/components/gallery/GallerySpecimenTile";

type GalleryExperienceProps = {
  images: GalleryImage[];
};

function uniqueImages(images: GalleryImage[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.url)) return false;
    seen.add(image.url);
    return true;
  });
}

const FEATURED_PICK_IDS = [
  "gal-ruby-bagicha",
  "gal-lithium-bagicha",
  "gal-copper-hilalabad",
  "gal-nephrite-gupis-2",
  "gal-lead-gultari-1",
  "gal-mo-1",
  "gal-qz-3",
  "gal-nephrite-1",
];

export function GalleryExperience({ images }: GalleryExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const allImages = useMemo(() => uniqueImages(images), [images]);

  const minerals = useMemo(() => {
    const set = new Set<string>();
    for (const image of allImages) {
      if (image.mineral) set.add(image.mineral);
    }
    return Array.from(set).sort();
  }, [allImages]);

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") return allImages;
    return allImages.filter((image) => image.mineral === activeFilter);
  }, [allImages, activeFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, GalleryImage[]>();
    for (const image of filteredImages) {
      const key = image.companyName;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(image);
    }
    return Array.from(map.entries());
  }, [filteredImages]);

  const featuredImages = useMemo(() => {
    const picks: GalleryImage[] = [];
    for (const id of FEATURED_PICK_IDS) {
      const found = allImages.find((image) => image.id === id);
      if (found) picks.push(found);
    }
    if (picks.length < 6) {
      for (const image of allImages) {
        if (picks.length >= 8) break;
        if (!picks.some((item) => item.id === image.id)) picks.push(image);
      }
    }
    return picks;
  }, [allImages]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-gal-hero] > *",
        { opacity: 0, y: 36, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-gal-strip-item]",
        { opacity: 0, x: 48, scale: 0.94 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-gal-strip]",
            start: "top 88%",
          },
        }
      );

      root.querySelectorAll("[data-gal-section]").forEach((section) => {
        const tiles = section.querySelectorAll("[data-gal-tile]");
        if (!tiles.length) return;

        if (reduceMotion) {
          gsap.set(tiles, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          tiles,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, [filteredImages.length, activeFilter]);

  const openAt = useCallback(
    (image: GalleryImage) => {
      const index = allImages.findIndex((item) => item.id === image.id);
      if (index >= 0) setLightboxIndex(index);
    },
    [allImages]
  );

  const scrollStrip = (direction: -1 | 1) => {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#d4af37]/[0.04] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[#284c7d]/15 blur-3xl"
          aria-hidden
        />

        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0">
            <Image
              src="/images/cover_photo.png"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#030712]/72" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/35 to-[#030712]/85" />
          </div>

          <div
            data-gal-hero
            className="relative z-10 mx-auto flex min-h-[52vh] max-w-6xl flex-col items-center justify-center px-6 py-28 text-center md:min-h-[58vh] md:px-10 md:py-36"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
              Multimedia archive
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold uppercase tracking-wide text-[#f0f4f7] md:text-6xl">
              The Game of Stones
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-[#cbd5e1] md:text-lg">
              Specimens, landscapes, and field photography from every licensed
              operator across Gilgit Baltistan.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
              {allImages.length} images · {minerals.length} mineral types ·{" "}
              {grouped.length} operators
            </p>
          </div>
        </section>

        <section
          data-gal-strip
          className="relative z-10 border-b border-white/[0.06] bg-[#020617]/80 py-12 md:py-16"
        >
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
                  Curated selection
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#f0f4f7] md:text-2xl">
                  Field highlights
                </h2>
              </div>
              <div className="hidden gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => scrollStrip(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#94a3b8] transition hover:border-[#d4af37]/35 hover:text-[#d4af37]"
                  aria-label="Scroll highlights left"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollStrip(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#94a3b8] transition hover:border-[#d4af37]/35 hover:text-[#d4af37]"
                  aria-label="Scroll highlights right"
                >
                  →
                </button>
              </div>
            </div>

            <div
              ref={stripRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
            >
              {featuredImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  data-gal-strip-item
                  onClick={() => openAt(image)}
                  className="group relative h-56 w-[min(78vw,280px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] text-left transition duration-500 hover:border-[#d4af37]/35 hover:shadow-[0_24px_80px_rgba(212,175,55,0.14)] md:h-64 md:w-[300px]"
                >
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/25 to-transparent" />
                  <span className="absolute left-4 top-4 font-[family-name:var(--font-display)] text-3xl font-bold text-[#d4af37]/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    {image.mineral && (
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4af37]">
                        {image.mineral}
                      </p>
                    )}
                    <p className="mt-1 line-clamp-2 text-sm font-medium text-[#f0f4f7]">
                      {image.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="sticky top-[4.5rem] z-20 border-b border-white/[0.06] bg-[#030712]/90 backdrop-blur-xl md:top-[5rem]">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition",
                activeFilter === "all"
                  ? "border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37]"
                  : "border-white/10 bg-white/[0.03] text-[#94a3b8] hover:border-[#d4af37]/30 hover:text-[#e2e8f0]"
              )}
            >
              All specimens
            </button>
            {minerals.map((mineral) => (
              <button
                key={mineral}
                type="button"
                onClick={() => setActiveFilter(mineral)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition",
                  activeFilter === mineral
                    ? "border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37]"
                    : "border-white/10 bg-white/[0.03] text-[#94a3b8] hover:border-[#d4af37]/30 hover:text-[#e2e8f0]"
                )}
              >
                {mineral}
              </button>
            ))}
          </div>
        </div>

        <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-18">
          {filteredImages.length === 0 && (
            <p className="py-20 text-center text-[#64748b]">
              No specimens match this filter.
            </p>
          )}

          {grouped.map(([companyName, companyImages]) => (
              <section
                key={companyName}
                data-gal-section
                className="mb-20 md:mb-28"
              >
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
                      Operator
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7] md:text-3xl">
                      {companyName}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#475569]">
                    {companyImages.length} images
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                  {companyImages.map((image, index) => (
                    <GallerySpecimenTile
                      key={image.id}
                      image={image}
                      index={index}
                      variant="square"
                      onClick={() => openAt(image)}
                    />
                  ))}
                </div>
              </section>
            ))}
        </main>

        {lightboxIndex !== null && (
          <CompanyMediaLightbox
            images={allImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </div>
    </BlogMotionProvider>
  );
}
