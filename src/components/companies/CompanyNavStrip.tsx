"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, type PointerEvent } from "react";
import { gsap } from "@/lib/gsap";
import type { Company } from "@/lib/types";
import { cn } from "@/lib/utils";

type CompanyNavStripProps = {
  companies: Company[];
};

function displayName(name: string) {
  return name.split(" (")[0];
}

function CompanyNavCard({
  company,
  index,
}: {
  company: Company;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const label = String(index + 1).padStart(2, "0");

  const onMove = useCallback((event: PointerEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(212,175,55,0.22), transparent 55%)`;
  }, []);

  const onLeave = useCallback(() => {
    const glow = glowRef.current;
    if (glow) glow.style.background = "transparent";
  }, []);

  return (
    <a
      ref={cardRef}
      href={`#${company.id}`}
      data-co-nav-item
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="co-nav-card group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0f1e]/90 p-[1px] text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/40 hover:shadow-[0_28px_80px_rgba(212,175,55,0.14)]"
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-60 [background:linear-gradient(110deg,transparent_35%,rgba(212,175,55,0.12)_50%,transparent_65%)] [background-size:220%_100%] animate-[co-nav-shimmer_4.5s_ease-in-out_infinite]"
        aria-hidden
      />
      <span
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <span className="co-nav-float relative block">
        <span className="relative flex flex-col gap-2.5 rounded-[calc(1rem-1px)] bg-[#0a0f1e]/95 px-4 py-3.5 md:px-5 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#030712] p-1 shadow-inner transition duration-500 group-hover:border-[#d4af37]/35 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.18)] md:h-10 md:w-10">
                <Image
                  src={company.logoUrl}
                  alt={`${displayName(company.name)} logo`}
                  fill
                  className="object-contain p-0.5 transition duration-500 group-hover:scale-105"
                  sizes="40px"
                />
              </div>
              <p className="min-w-0 flex-1 font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-[#f0f4f7] transition duration-500 group-hover:text-white md:text-[15px]">
                {displayName(company.name)}
              </p>
            </div>
            <span
              className="shrink-0 font-[family-name:var(--font-display)] text-2xl font-bold leading-none text-[#d4af37]/20 transition duration-500 group-hover:text-[#d4af37]/45 md:text-3xl"
              aria-hidden
            >
              {label}
            </span>
          </div>

          <p className="line-clamp-1 text-[11px] leading-relaxed text-[#64748b] transition duration-500 group-hover:text-[#94a3b8] md:text-xs">
            {company.tagline}
          </p>

          <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#d4af37]/70 transition duration-500 group-hover:text-[#d4af37]">
            <span className="h-px w-5 bg-[#d4af37]/50 transition-all duration-500 group-hover:w-8" />
            View profile
            <span className="translate-x-0 transition-transform duration-500 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </span>
      </span>
    </a>
  );
}

export function CompanyNavStrip({ companies }: CompanyNavStripProps) {
  const stripRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) return;

    const cards = strip.querySelectorAll(".co-nav-card");
    const floats = strip.querySelectorAll(".co-nav-float");
    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          delay: 0.15,
          ease: "power3.out",
        }
      )
    );

    tweens.push(
      gsap.to(floats, {
        y: -4,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.45, from: "start" },
        delay: 1,
      })
    );

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [companies.length]);

  return (
    <nav
      ref={stripRef}
      className="sticky top-[4.25rem] z-40 mb-12 border-b border-white/[0.06] bg-[#030712]/85 pb-6 pt-1 backdrop-blur-xl md:top-[4.75rem]"
      aria-label="Jump to company"
    >
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
        Select operator
      </p>
      <div
        className={cn(
          "grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4",
          companies.length === 3 && "lg:grid-cols-3"
        )}
      >
        {companies.map((company, index) => (
          <CompanyNavCard key={company.id} company={company} index={index} />
        ))}
      </div>
    </nav>
  );
}
