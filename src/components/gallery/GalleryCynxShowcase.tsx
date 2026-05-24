"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GalleryLiquidStrip } from "@/components/gallery/GalleryLiquidStrip";

const STRIP_COUNT = 3;

type GalleryCynxShowcaseProps = {
  images: GalleryImage[];
  onOpen: (image: GalleryImage) => void;
  className?: string;
};

function StripColumn({
  side,
  onNavigate,
}: {
  side: "left" | "right";
  onNavigate: () => void;
}) {
  return (
    <div className="hidden h-full shrink-0 items-stretch gap-2 sm:flex md:gap-2.5 lg:gap-3">
      {Array.from({ length: STRIP_COUNT }).map((_, i) => (
        <GalleryLiquidStrip
          key={`${side}-${i}`}
          phase={side === "left" ? i * 0.7 : i * 0.9 + 1.2}
          onClick={onNavigate}
          ariaLabel={
            side === "left"
              ? `Previous specimen, strip ${i + 1}`
              : `Next specimen, strip ${i + 1}`
          }
          className="h-full w-[clamp(1.5rem,2.2vw,2.5rem)] opacity-95"
        />
      ))}
    </div>
  );
}

export function GalleryCynxShowcase({
  images,
  onOpen,
  className,
}: GalleryCynxShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const activeIndexRef = useRef(0);

  const total = images.length;
  const active = images[activeIndex] ?? images[0];

  activeIndexRef.current = activeIndex;

  const animateTo = useCallback(
    (index: number, slideDir: 1 | -1) => {
      if (!total || animatingRef.current) return;
      const current = activeIndexRef.current;
      const next = ((index % total) + total) % total;
      if (next === current) return;

      const wrap = imageWrapRef.current;
      const caption = captionRef.current;
      if (!wrap) {
        setActiveIndex(next);
        return;
      }

      animatingRef.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      tl.to(wrap, {
        opacity: 0,
        x: 56 * slideDir,
        scale: 0.96,
        duration: 0.42,
        ease: "power2.in",
      });

      if (caption) {
        tl.to(
          caption,
          { opacity: 0, y: 10, duration: 0.28, ease: "power2.in" },
          0
        );
      }

      tl.call(() => {
        setActiveIndex(next);
      });

      tl.fromTo(
        wrap,
        { opacity: 0, x: -56 * slideDir, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.58,
          ease: "power3.out",
        }
      );

      if (caption) {
        tl.fromTo(
          caption,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.48, ease: "power3.out" },
          "-=0.35"
        );
      }
    },
    [total]
  );

  const goTo = useCallback(
    (index: number) => {
      const current = activeIndexRef.current;
      const next = ((index % total) + total) % total;
      const slideDir: 1 | -1 = next >= current ? 1 : -1;
      animateTo(index, slideDir);
    },
    [animateTo, total]
  );

  const goPrev = useCallback(() => {
    animateTo(activeIndexRef.current - 1, -1);
  }, [animateTo]);

  const goNext = useCallback(() => {
    animateTo(activeIndexRef.current + 1, 1);
  }, [animateTo]);

  useEffect(() => {
    if (activeIndex >= total && total > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, total]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (!total || !active) {
    return (
      <p className="py-16 text-center text-[#64748b]">No specimens to display.</p>
    );
  }

  return (
    <section
      className={cn("relative", className)}
      aria-roledescription="carousel"
      aria-label="Specimen gallery"
    >
      <div className="mx-auto flex justify-center px-2 sm:px-4">
        <div className="flex h-[min(52vh,440px)] w-full max-w-[1180px] items-stretch justify-center gap-3 md:h-[min(58vh,520px)] md:gap-4 lg:h-[min(60vh,560px)] lg:gap-5">
          <StripColumn side="left" onNavigate={goPrev} />

          <button
            type="button"
            onClick={() => onOpen(active)}
            className="group relative h-full min-w-0 flex-1 overflow-hidden border border-white/[0.07] bg-[#0a0f1e] shadow-[0_40px_120px_rgba(0,0,0,0.5)] transition-[border-color] duration-500 hover:border-[#d4af37]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]/40"
          >
            <div ref={imageWrapRef} className="relative h-full w-full">
              <Image
                key={active.id}
                src={active.url}
                alt={active.title}
                fill
                className="object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 65vw, 720px"
                priority={activeIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-[#030712]/8" />
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
              <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/25 bg-[#030712]/55 text-sm text-[#d4af37] opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 md:right-4 md:top-4">
                ↗
              </span>
            </div>
          </button>

          <StripColumn side="right" onNavigate={goNext} />
        </div>
      </div>

      <div
        ref={captionRef}
        className="mx-auto mt-8 flex max-w-[1180px] flex-wrap items-end justify-between gap-4 border-t border-white/[0.06] pt-6 md:mt-10 md:pt-7"
      >
        <div className="min-w-0 max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#64748b]">
            {active.companyName}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#f0f4f7] md:text-2xl lg:text-[1.75rem]">
            {active.title}
          </h3>
          {active.mineral && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4af37]/85">
              {active.mineral}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#94a3b8] transition hover:border-[#d4af37]/35 hover:text-[#d4af37] md:h-10 md:w-10"
            aria-label="Previous specimen"
          >
            ←
          </button>
          <p className="font-mono text-sm tabular-nums tracking-widest text-[#64748b]">
            <span className="text-[#f0f4f7]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-[#475569]">—</span>
            {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#94a3b8] transition hover:border-[#d4af37]/35 hover:text-[#d4af37] md:h-10 md:w-10"
            aria-label="Next specimen"
          >
            →
          </button>
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1180px] justify-center gap-1.5 sm:hidden">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => goTo(index)}
            className={cn(
              "h-1 shrink-0 rounded-full transition-all duration-300",
              index === activeIndex ? "w-8 bg-[#d4af37]" : "w-3 bg-white/15"
            )}
            aria-label={`Go to ${image.title}`}
          />
        ))}
      </div>
    </section>
  );
}
