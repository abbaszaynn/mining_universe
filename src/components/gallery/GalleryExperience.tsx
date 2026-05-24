"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { CompanyMediaLightbox } from "@/components/companies/CompanyMediaLightbox";
import { GalleryCynxShowcase } from "@/components/gallery/GalleryCynxShowcase";
import { GalleryEditorialSection } from "@/components/gallery/GalleryEditorialSection";

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

export function GalleryExperience({ images }: GalleryExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

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
        "[data-gal-showcase]",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-gal-showcase]",
            start: "top 88%",
            once: true,
          },
        }
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => ctx.revert();
  }, [grouped.length, activeFilter]);

  const openAt = useCallback(
    (image: GalleryImage) => {
      const index = filteredImages.findIndex((item) => item.id === image.id);
      if (index >= 0) setLightboxIndex(index);
    },
    [filteredImages]
  );

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
            className="relative z-10 mx-auto flex min-h-[44vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center md:min-h-[48vh] md:px-10 md:py-32"
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

        <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 md:px-10 md:pb-32 md:pt-14">
          <div data-gal-showcase>
            <GalleryCynxShowcase
              key={activeFilter}
              images={filteredImages}
              onOpen={openAt}
            />
          </div>

          {grouped.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="mb-10 border-b border-white/[0.06] pb-6 md:mb-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#64748b]">
                  By operator
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold uppercase tracking-[0.1em] text-[#f0f4f7] md:text-2xl">
                  Company archives
                </h2>
              </div>

              {grouped.map(([companyName, companyImages], index) => (
                <GalleryEditorialSection
                  key={companyName}
                  title={companyName}
                  subtitle={`${companyImages.length} field photographs`}
                  images={companyImages}
                  onOpen={openAt}
                  index={index}
                />
              ))}
            </div>
          )}
        </main>

        {lightboxIndex !== null && (
          <CompanyMediaLightbox
            images={filteredImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </div>
    </BlogMotionProvider>
  );
}
