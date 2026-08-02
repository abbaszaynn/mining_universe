"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GalleryLiquidStrip } from "@/components/gallery/GalleryLiquidStrip";

const STRIP_COUNT = 3;
const CENTER_WIDTH =
  "w-[min(92vw,680px)] sm:w-[min(72vw,720px)] lg:w-[min(58vw,740px)]";

type GalleryCynxShowcaseProps = {
  images: GalleryImage[];
  onOpen: (image: GalleryImage) => void;
  className?: string;
};

function StripWing({
  side,
  onNavigate,
}: {
  side: "left" | "right";
  onNavigate: () => void;
}) {
  const isLeft = side === "left";

  return (
    <div
      className={cn(
        "hidden h-full min-w-0 flex-1 items-stretch gap-2 sm:flex md:gap-2.5 lg:gap-3",
        isLeft ? "justify-end pr-1.5 md:pr-2" : "justify-start pl-1.5 md:pl-2"
      )}
    >
      {Array.from({ length: STRIP_COUNT }).map((_, i) => (
        <GalleryLiquidStrip
          key={`${side}-${i}`}
          phase={isLeft ? i * 0.85 : i * 1.05 + 1.4}
          mirror={!isLeft}
          onClick={onNavigate}
          ariaLabel={
            isLeft
              ? `Previous specimen, strip ${i + 1}`
              : `Next specimen, strip ${i + 1}`
          }
          className="h-full min-w-[2rem] flex-1"
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
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const animatingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const total = images.length;
  const active = images[activeIndex] ?? images[0];

  const animateTo = useCallback(
    (index: number, dir: 1 | -1) => {
      if (!total || animatingRef.current) return;
      const next = ((index % total) + total) % total;
      if (next === activeIndex) return;

      animatingRef.current = true;
      setSlideDir(dir);
      setPrevIndex(activeIndex);
      setActiveIndex(next);
    },
    [activeIndex, total]
  );

  useLayoutEffect(() => {
    if (prevIndex === null || !containerRef.current) return;

    const prevSlide = containerRef.current.querySelector(`[data-slide-index="${prevIndex}"]`);
    const nextSlide = containerRef.current.querySelector(`[data-slide-index="${activeIndex}"]`);
    
    // Caption animations
    const captionTitle = captionRef.current?.querySelector('.caption-title');
    const captionSub = captionRef.current?.querySelector('.caption-sub');

    const tl = gsap.timeline({
      onComplete: () => {
        animatingRef.current = false;
        setPrevIndex(null); // clean up previous slide
      },
    });

    if (prevSlide && nextSlide) {
      // Setup initial state for next slide
      gsap.set(nextSlide, { 
        zIndex: 10, 
        xPercent: 20 * slideDir, 
        scale: 1.05, 
        opacity: 0 
      });
      gsap.set(prevSlide, { zIndex: 5 });

      tl.to(prevSlide, {
        xPercent: -15 * slideDir,
        scale: 0.95,
        opacity: 0,
        duration: 0.75,
        ease: "power3.inOut",
      }, 0);

      tl.to(nextSlide, {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 0.75,
        ease: "power3.inOut",
      }, 0);
    }
    
    if (captionTitle && captionSub) {
       tl.fromTo(captionTitle, 
         { y: 15, opacity: 0 }, 
         { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, 
         0.2
       );
       tl.fromTo(captionSub, 
         { y: 10, opacity: 0 }, 
         { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 
         0.3
       );
    }

  }, [activeIndex, prevIndex, slideDir]);

  const goPrev = useCallback(() => {
    animateTo(activeIndex - 1, -1);
  }, [animateTo, activeIndex]);

  const goNext = useCallback(() => {
    animateTo(activeIndex + 1, 1);
  }, [animateTo, activeIndex]);

  // Handle activeIndex out of bounds when images change
  useEffect(() => {
    if (activeIndex >= total && total > 0) {
      setActiveIndex(0);
      setPrevIndex(null);
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

  // Auto-play functionality
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, total, goNext]);

  if (!total || !active) {
    return (
      <p className="py-16 text-center text-graphite-500">No specimens to display.</p>
    );
  }

  return (
    <section
      className={cn("relative", className)}
      aria-roledescription="carousel"
      aria-label="Specimen gallery"
    >
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="flex h-[min(52vh,440px)] w-full items-stretch md:h-[min(58vh,520px)] lg:h-[min(60vh,560px)]">
          <StripWing side="left" onNavigate={goPrev} />

          <button
            type="button"
            onClick={() => onOpen(active)}
            className={cn(
              "group relative h-full shrink-0 overflow-hidden border border-graphite-950/[0.07] bg-bone-50 shadow-[0_40px_120px_rgba(0,0,0,0.1)] transition-[border-color] duration-500 hover:border-copper-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper-500/40",
              CENTER_WIDTH
            )}
          >
            <div ref={containerRef} className="relative h-full w-full">
              {/* Render only active and previous slide for performance */}
              {images.map((image, i) => {
                const isActive = i === activeIndex;
                const isPrev = i === prevIndex;
                
                if (!isActive && !isPrev) return null;
                
                return (
                  <div 
                    key={image.id}
                    data-slide-index={i}
                    className="absolute inset-0 h-full w-full will-change-transform"
                    style={{ zIndex: isActive ? 10 : (isPrev ? 5 : 0) }}
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 92vw, 740px"
                      priority={isActive || isPrev}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/70 via-transparent to-graphite-950/8" />
                  </div>
                );
              })}
              
              <span className="pointer-events-none absolute inset-0 z-20 ring-1 ring-inset ring-graphite-950/[0.05]" />
              <span className="pointer-events-none absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-copper-500/25 bg-bone-50/70 text-sm text-copper-500 opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 md:right-4 md:top-4">
                ↗
              </span>
            </div>
          </button>

          <StripWing side="right" onNavigate={goNext} />
        </div>
      </div>

      <div
        ref={captionRef}
        className="mx-auto mt-8 flex max-w-[1180px] flex-wrap items-end justify-between gap-4 border-t border-graphite-950/[0.06] pt-6 md:mt-10 md:pt-7"
      >
        <div className="min-w-0 max-w-xl">
          <p className="caption-sub font-mono text-[10px] uppercase tracking-[0.32em] text-graphite-500">
            {active.companyName}
          </p>
          <h3 className="caption-title mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-graphite-950 md:text-2xl lg:text-[1.75rem]">
            {active.title}
          </h3>
          {active.mineral && (
            <p className="caption-sub mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-copper-500/85">
              {active.mineral}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-950/10 text-graphite-500 transition hover:border-copper-500/35 hover:text-copper-500 md:h-10 md:w-10"
            aria-label="Previous specimen"
          >
            ←
          </button>
          <p className="font-mono text-sm tabular-nums tracking-widest text-graphite-500">
            <span className="text-graphite-950">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-graphite-400">—</span>
            {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite-950/10 text-graphite-500 transition hover:border-copper-500/35 hover:text-copper-500 md:h-10 md:w-10"
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
            onClick={() => {
               if (index !== activeIndex) {
                 const dir = index > activeIndex ? 1 : -1;
                 animateTo(index, dir);
               }
            }}
            className={cn(
              "h-1 shrink-0 rounded-full transition-all duration-300",
              index === activeIndex ? "w-8 bg-copper-500" : "w-3 bg-graphite-950/15"
            )}
            aria-label={`Go to ${image.title}`}
          />
        ))}
      </div>
    </section>
  );
}
