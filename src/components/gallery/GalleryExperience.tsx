"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { CompanyMediaLightbox } from "@/components/companies/CompanyMediaLightbox";

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

  const allImages = useMemo(() => uniqueImages(images), [images]);

  const grouped = useMemo(() => {
    const map = new Map<string, GalleryImage[]>();
    for (const image of allImages) {
      const key = image.companyName;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(image);
    }
    return Array.from(map.entries());
  }, [allImages]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) return;

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
        "[data-gal-tile]",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [allImages.length]);

  const openAt = (image: GalleryImage) => {
    const index = allImages.findIndex((item) => item.id === image.id);
    if (index >= 0) setLightboxIndex(index);
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
            <div className="absolute inset-0 bg-[#030712]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-[#030712]/80" />
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
              operator across Gilgit Baltistan. Copper, nephrite, lithium, ruby,
              quartz, and the terrain that holds them.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
              {allImages.length} images · {grouped.length} operators
            </p>
          </div>
        </section>

        <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-20">
          {grouped.map(([companyName, companyImages]) => (
            <section key={companyName} className="mb-20 md:mb-28">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
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

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {companyImages.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    data-gal-tile
                    onClick={() => openAt(image)}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-[#0a0f1e] text-left transition duration-500 hover:ring-1 hover:ring-[#d4af37]/35"
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                      <p className="line-clamp-2 text-xs font-medium leading-snug text-[#f0f4f7] md:text-sm">
                        {image.title}
                      </p>
                      {image.mineral && (
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#d4af37]/80 md:text-[10px]">
                          {image.mineral}
                        </p>
                      )}
                    </div>
                  </button>
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
