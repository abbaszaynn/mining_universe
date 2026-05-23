"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ORBIT_GALLERY_ITEMS, type OrbitMediaItem } from "@/lib/gallery-orbit-items";
import { useIsMobile } from "@/lib/use-is-mobile";
import { cn } from "@/lib/utils";

type MediaItem = OrbitMediaItem;

const MEDIA_ITEMS: MediaItem[] = ORBIT_GALLERY_ITEMS;

export function MediaOrbitGallery() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const mobileDragRef = useRef({
    active: false,
    pointerId: 0,
    lastX: 0,
    velocity: 0,
    moved: false,
    momentumFrame: 0,
    tapIndex: null as number | null,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);
  const interactiveRotation = useRef({ x: -12, y: 0 });
  const dragState = useRef({
    active: false,
    lastX: 0,
    velocity: 0,
    moved: false,
  });

  const cards = useMemo(
    () =>
      MEDIA_ITEMS.map((item, index) => {
        const angle = (index / MEDIA_ITEMS.length) * 360;
        return { ...item, angle };
      }),
    []
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tween = gsap.fromTo(
      section.querySelectorAll("[data-gallery-reveal]"),
      { opacity: 0, y: 46, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    let rafId = 0;
    const loop = () => {
      const drag = dragState.current;
      const idleSpin = drag.active ? 0.01 : 0.08;
      drag.velocity *= 0.94;
      setRotation((prev) => prev + idleSpin + drag.velocity);
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const getNearestCardIndex = useCallback(() => {
    const rail = mobileRailRef.current;
    if (!rail) return 0;
    const children = Array.from(rail.children) as HTMLElement[];
    if (!children.length) return 0;
    const mid = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    children.forEach((el, i) => {
      const left = el.offsetLeft;
      const right = left + el.offsetWidth;
      const center = (left + right) / 2;
      const d = Math.abs(center - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    setActiveIndex(getNearestCardIndex());
  }, [getNearestCardIndex]);

  const snapMobileToIndex = useCallback((index: number) => {
    const rail = mobileRailRef.current;
    if (!rail) return;
    const child = rail.children[index] as HTMLElement | undefined;
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  const snapMobileToNearest = useCallback(() => {
    const idx = getNearestCardIndex();
    setActiveIndex(idx);
    snapMobileToIndex(idx);
  }, [getNearestCardIndex, snapMobileToIndex]);

  useEffect(() => {
    if (!isMobile) return;
    const rail = mobileRailRef.current;
    if (!rail) return;
    const onScroll = () => updateActiveFromScroll();
    rail.addEventListener("scroll", onScroll, { passive: true });
    updateActiveFromScroll();
    return () => rail.removeEventListener("scroll", onScroll);
  }, [isMobile, updateActiveFromScroll]);

  const stopMomentum = () => {
    const drag = mobileDragRef.current;
    if (drag.momentumFrame) {
      cancelAnimationFrame(drag.momentumFrame);
      drag.momentumFrame = 0;
    }
  };

  const runMomentum = () => {
    const rail = mobileRailRef.current;
    const drag = mobileDragRef.current;
    if (!rail) return;
    const step = () => {
      if (Math.abs(drag.velocity) < 0.35) {
        drag.velocity = 0;
        drag.momentumFrame = 0;
        snapMobileToNearest();
        return;
      }
      rail.scrollLeft -= drag.velocity;
      drag.velocity *= 0.94;
      drag.momentumFrame = requestAnimationFrame(step);
    };
    stopMomentum();
    drag.momentumFrame = requestAnimationFrame(step);
  };

  const focusedRotation = activeIndex * (360 / MEDIA_ITEMS.length);
  const orbitRotationY = rotation + dragRotation - focusedRotation;

  const orbitRadius = 340;
  const perspective = "1800px";

  return (
    <section
      ref={sectionRef}
      className="relative z-10 -mt-16 overflow-x-hidden overflow-y-visible bg-transparent px-4 pb-20 pt-10 md:mt-0 md:overflow-hidden md:bg-[#020617]/70 md:px-12 md:py-32 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#030712] via-[#030712]/85 to-transparent md:h-32 md:from-[#030712]/90 md:via-[#030712]/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/12 to-transparent md:via-[#d4af37]/20"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 md:mb-16" data-gallery-reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
            Field photography
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl">
            Landscapes and specimens from the north.
          </h2>
          <p className="mt-5 max-w-3xl font-light text-[#94a3b8]">
            <span className="md:hidden">
              Swipe to browse site photography, geological landscapes, and mineral
              specimens from our operators.
            </span>
            <span className="hidden md:inline">
              Rotate the gallery to explore landscapes, geological vistas, and
              mineral specimens from across Gilgit Baltistan.
            </span>
          </p>
        </div>

        {isMobile ? (
          <div className="relative -mx-4" data-gallery-reveal>
            <div
              ref={mobileRailRef}
              role="region"
              aria-roledescription="carousel"
              aria-label="Media gallery"
              className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-3 pt-1 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
              style={{ scrollPaddingInline: "1rem" }}
              onPointerDown={(event) => {
                if (event.button !== 0 && event.pointerType === "mouse") return;
                stopMomentum();
                const drag = mobileDragRef.current;
                drag.active = true;
                drag.pointerId = event.pointerId;
                drag.lastX = event.clientX;
                drag.velocity = 0;
                drag.moved = false;
                const hit = (event.target as HTMLElement | null)?.closest(
                  "button[data-card-index]"
                ) as HTMLButtonElement | null;
                drag.tapIndex = hit?.dataset.cardIndex
                  ? Number(hit.dataset.cardIndex)
                  : null;
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                const drag = mobileDragRef.current;
                if (!drag.active || event.pointerId !== drag.pointerId) return;
                const delta = event.clientX - drag.lastX;
                drag.lastX = event.clientX;
                if (Math.abs(delta) > 2) drag.moved = true;
                drag.velocity = delta;
                const rail = mobileRailRef.current;
                if (rail) {
                  rail.scrollLeft -= delta;
                }
              }}
              onPointerUp={(event) => {
                const drag = mobileDragRef.current;
                if (!drag.active || event.pointerId !== drag.pointerId) return;
                drag.active = false;
                try {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                } catch {
                  /* ignore */
                }
                if (!drag.moved && drag.tapIndex !== null) {
                  drag.velocity = 0;
                  setActiveIndex(drag.tapIndex);
                  snapMobileToIndex(drag.tapIndex);
                  drag.tapIndex = null;
                  return;
                }
                drag.tapIndex = null;
                if (Math.abs(drag.velocity) > 1.2) {
                  runMomentum();
                } else {
                  drag.velocity = 0;
                  snapMobileToNearest();
                }
              }}
              onPointerCancel={(event) => {
                const drag = mobileDragRef.current;
                drag.active = false;
                drag.velocity = 0;
                try {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                } catch {
                  /* ignore */
                }
                stopMomentum();
              }}
            >
              {MEDIA_ITEMS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  data-card-index={index}
                  onClick={() => {
                    setActiveIndex(index);
                    snapMobileToIndex(index);
                  }}
                  className={cn(
                    "relative h-52 w-[min(82vw,340px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-black/50 text-left shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition",
                    activeIndex === index
                      ? "border-[#d4af37]/45 shadow-[0_24px_90px_rgba(212,175,55,0.24)]"
                      : ""
                  )}
                >
                  {item.kind === "video" ? (
                    <video
                      className="h-full w-full object-cover"
                      src={item.src}
                      poster={"poster" in item ? item.poster : undefined}
                      muted
                      loop
                      playsInline
                      autoPlay={activeIndex === index}
                      preload="metadata"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="h-full w-full object-cover"
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                    <p className="text-base font-medium text-[#f8fafc]">{item.title}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/90">
                      Gallery
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div
              className="mt-3 flex justify-center gap-1.5 px-4"
              aria-hidden
            >
              {MEDIA_ITEMS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeIndex
                      ? "w-6 bg-[#d4af37]"
                      : "w-1.5 bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative mx-auto flex w-full max-w-[100vw] min-h-[620px] cursor-grab items-center justify-center active:cursor-grabbing"
            style={{ perspective }}
            onPointerDown={(event) => {
              const drag = dragState.current;
              drag.active = true;
              drag.lastX = event.clientX;
              drag.velocity = 0;
              drag.moved = false;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              const px = (event.clientX - bounds.left) / bounds.width;
              const py = (event.clientY - bounds.top) / bounds.height;
              interactiveRotation.current.x = -18 + py * 12;
              interactiveRotation.current.y = -14 + px * 28;

              const drag = dragState.current;
              if (!drag.active) return;
              const deltaX = event.clientX - drag.lastX;
              drag.lastX = event.clientX;
              drag.velocity = deltaX * 0.012;
              if (Math.abs(deltaX) > 1) {
                drag.moved = true;
              }
              setDragRotation((prev) => prev + deltaX * 0.22);
            }}
            onPointerUp={(event) => {
              const drag = dragState.current;
              if (drag.active) {
                const step = 360 / MEDIA_ITEMS.length;
                const nearestIndex =
                  ((Math.round((rotation + dragRotation) / step) % MEDIA_ITEMS.length) +
                    MEDIA_ITEMS.length) %
                  MEDIA_ITEMS.length;
                setActiveIndex(nearestIndex);
              }
              drag.active = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={(event) => {
              dragState.current.active = false;
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerLeave={() => {
              dragState.current.active = false;
            }}
            data-gallery-reveal
          >
            <div
              ref={orbitRef}
              className="relative h-[440px] w-[440px] [transform-style:preserve-3d] md:h-[520px] md:w-[520px]"
              style={{
                transform: `rotateX(${interactiveRotation.current.x}deg) rotateY(${interactiveRotation.current.y + orbitRotationY}deg)`,
              }}
            >
              {cards.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (dragState.current.moved) {
                      dragState.current.moved = false;
                      return;
                    }
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition duration-500 [transform-style:preserve-3d] h-44 w-72 md:h-52 md:w-80",
                    activeIndex === index
                      ? "border-[#d4af37]/45 shadow-[0_24px_90px_rgba(212,175,55,0.24)]"
                      : "hover:border-[#d4af37]/30"
                  )}
                  style={{
                    transform: `translate3d(-50%, -50%, 0px) rotateY(${item.angle}deg) translateZ(${orbitRadius}px)`,
                  }}
                >
                  {item.kind === "video" ? (
                    <video
                      className="h-full w-full object-cover"
                      src={item.src}
                      poster={"poster" in item ? item.poster : undefined}
                      muted
                      loop
                      playsInline
                      autoPlay={activeIndex === index}
                      preload="metadata"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="h-full w-full object-cover"
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 text-left">
                    <p className="text-sm font-medium text-[#f8fafc]">{item.title}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/90">
                      Gallery
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="pointer-events-auto mt-10 flex justify-center md:mt-14" data-gallery-reveal>
          <Link
            href="/gallery"
            className="text-sm font-medium uppercase tracking-[0.22em] text-[#d4af37] transition hover:text-[#f5e6a8]"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}
