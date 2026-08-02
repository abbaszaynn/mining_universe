"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GalleryMediaLightbox } from "@/components/gallery/GalleryMediaLightbox";
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
    <>
      <div
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-x-hidden bg-bone-50 text-graphite-950"
        data-gos-page-root
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(233,122,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,122,60,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          aria-hidden
        />

        <section className="relative overflow-hidden border-b border-graphite-950/[0.06]">
          <div className="absolute inset-0">
            <Image
              src="/images/cover_photo.png"
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-bone-50/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-bone-50 via-bone-50/40 to-bone-50/85" />
          </div>

          <div
            data-gal-hero
            className="relative z-10 mx-auto flex min-h-[44vh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center md:min-h-[48vh] md:px-10 md:py-32"
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-copper-500">
              Multimedia archive
            </p>
            <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold uppercase tracking-wide text-graphite-950 md:text-6xl">
              Durr & Zircon Mines Consortium
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-graphite-600 md:text-lg">
              Specimens, landscapes, and field photography from our unified operations across Gilgit Baltistan.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-graphite-500">
              {allImages.length} images · {minerals.length} mineral types ·{" "}
              {grouped.length} divisions
            </p>
          </div>
        </section>

        <div className="sticky top-[4.5rem] z-20 border-b border-graphite-950/[0.06] bg-bone-50/90 backdrop-blur-xl md:top-[5rem]">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition",
                activeFilter === "all"
                  ? "border-copper-500/50 bg-copper-500/15 text-copper-500"
                  : "border-graphite-950/10 bg-graphite-950/[0.03] text-graphite-500 hover:border-copper-500/30 hover:text-graphite-950"
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
                    ? "border-copper-500/50 bg-copper-500/15 text-copper-500"
                    : "border-graphite-950/10 bg-graphite-950/[0.03] text-graphite-500 hover:border-copper-500/30 hover:text-graphite-950"
                )}
              >
                {mineral}
              </button>
            ))}
          </div>
        </div>

        <div className="group my-4 overflow-hidden border-y border-copper-600/30 bg-copper-500 py-8 shadow-sm md:my-8 md:py-10">
          <div
            className="flex w-max whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{ animation: "marquee-scroll 60s linear infinite" }}
          >
            {[0, 1].map((rep) => (
              <span key={rep} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="mx-16 font-sans text-base font-light tracking-widest text-bone-50 md:text-xl"
                  >
                    For latest images of samples from the field visits, fill the form in the investor desk.{" "}
                    <a
                      href="/investor-desk"
                      className="ml-3 font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white"
                    >
                      Speak with us ↗
                    </a>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 md:px-10 md:pb-32 md:pt-12">
          <div data-gal-showcase>
            <GalleryCynxShowcase
              key={activeFilter}
              images={filteredImages}
              onOpen={openAt}
            />
          </div>

          {grouped.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="mb-10 border-b border-graphite-950/[0.06] pb-6 md:mb-14">
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-graphite-500">
                  By division
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold uppercase tracking-[0.1em] text-graphite-950 md:text-2xl">
                  Division archives
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
          <GalleryMediaLightbox
            images={filteredImages}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </div>
    </>
  );
}
