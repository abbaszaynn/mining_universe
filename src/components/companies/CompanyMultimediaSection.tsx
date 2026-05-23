"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Company } from "@/lib/types";
import { CompanyMediaLightbox } from "./CompanyMediaLightbox";

type CompanyMultimediaSectionProps = {
  company: Company;
};

export function CompanyMultimediaSection({ company }: CompanyMultimediaSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-media-tile]",
        { opacity: 0, y: 28, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [company.id]);

  if (company.images.length === 0 && company.videos.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.03] p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#64748b]">
          No media yet
        </p>
        <p className="mt-3 text-sm text-[#94a3b8]">
          Site photography and operational footage for {company.name.split(" (")[0]}{" "}
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div ref={sectionRef} className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#d4af37]/90">
              Visual archive
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7] md:text-3xl">
              Multimedia gallery
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#94a3b8] md:text-base">
              Click any specimen to open full preview — view details, navigate the
              set, or download the image.
            </p>
          </div>
          {company.images.length > 0 && (
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#475569]">
              {company.images.length} images
            </p>
          )}
        </div>

        {company.images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {company.images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                data-media-tile
                onClick={() => setLightboxIndex(index)}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-2xl bg-[#0a0f1e] text-left transition duration-500",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:shadow-[0_24px_70px_rgba(212,175,55,0.14)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/50",
                  index % 5 === 0 && "sm:col-span-2 sm:aspect-[2/1] lg:col-span-2"
                )}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.07]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/25 to-[#030712]/10 opacity-70 transition duration-500 group-hover:opacity-100" />

                <span className="pointer-events-none absolute left-3 top-3 font-[family-name:var(--font-display)] text-lg font-bold text-[#d4af37]/25 transition group-hover:text-[#d4af37]/40 sm:text-xl">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="pointer-events-none absolute inset-3 rounded-xl border border-white/0 transition duration-500 group-hover:border-[#d4af37]/20" />

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  {image.mineral && (
                    <span className="inline-block rounded-full bg-[#030712]/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur-sm sm:text-[10px]">
                      {image.mineral}
                    </span>
                  )}
                  <p className="mt-2 line-clamp-2 font-[family-name:var(--font-display)] text-xs font-medium leading-snug text-[#f0f4f7] sm:text-sm">
                    {image.title}
                  </p>
                </div>

                <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#030712]/60 text-sm text-[#d4af37] opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </button>
            ))}
          </div>
        )}

        {company.videos.length > 0 && (
          <div className="space-y-4 border-t border-white/[0.06] pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/80">
              Operational video
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {company.videos.map((video) => (
                <div
                  key={video.id}
                  className="overflow-hidden rounded-2xl bg-white/[0.03]"
                >
                  <div className="aspect-video">
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  </div>
                  <p className="p-4 text-sm font-medium text-[#e2e8f0]">
                    {video.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <CompanyMediaLightbox
          images={company.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
