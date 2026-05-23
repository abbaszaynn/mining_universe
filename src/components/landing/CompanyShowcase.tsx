"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Company } from "@/lib/types";

type CompanyShowcaseProps = {
  companies: Pick<Company, "id" | "name" | "logoUrl" | "status">[];
};

const CARD_OFFSETS = [
  "md:translate-y-6 md:scale-[0.96]",
  "md:-translate-y-3 md:scale-105 md:z-10",
  "md:translate-y-8 md:scale-[0.96]",
];

export function CompanyShowcase({ companies }: CompanyShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tweens: gsap.core.Tween[] = [];

    tweens.push(
      gsap.fromTo(
        section.querySelectorAll("[data-company-header]"),
        { opacity: 0, y: 36, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 84%" },
        }
      )
    );

    tweens.push(
      gsap.fromTo(
        section.querySelectorAll("[data-company-card]"),
        { opacity: 0, y: 56, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%" },
        }
      )
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [companies]);

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-white/5 bg-[#020617]/50 px-6 py-28 md:px-12 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/[0.04] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div data-company-header>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
              Portfolio registry
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0f4f7] md:text-4xl lg:text-5xl">
              Leaders in mineral exploration.
            </h2>
          </div>
          <p
            data-company-header
            className="max-w-md text-base leading-relaxed text-[#94a3b8] md:text-lg"
          >
            Pioneers shaping the future of mining across Gilgit Baltistan — tap
            a profile to explore.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:items-center md:gap-8">
          {companies.map((company, index) => (
            <Link
              key={company.id}
              href={`/companies#${company.id}`}
              data-company-card
              className={cn(
                "group relative flex flex-col items-center rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 py-10 text-center backdrop-blur-sm transition duration-500",
                "hover:border-[#d4af37]/40 hover:shadow-[0_32px_100px_rgba(212,175,55,0.14)]",
                CARD_OFFSETS[index] ?? ""
              )}
            >
              {/* Hex frame */}
              <div className="relative mb-7 flex h-36 w-36 items-center justify-center md:h-40 md:w-40">
                <div
                  className="absolute inset-0 rotate-0 rounded-[2rem] border border-[#d4af37]/20 bg-[#d4af37]/[0.06] transition duration-500 group-hover:rotate-6 group-hover:border-[#d4af37]/45"
                  aria-hidden
                />
                <div
                  className="absolute inset-2 rounded-[1.5rem] border border-white/10 bg-[#030712]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  aria-hidden
                />
                <div className="relative z-10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.03] p-3 md:h-28 md:w-28">
                  <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={112}
                    height={112}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <span
                  className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#030712] font-mono text-[10px] text-[#d4af37]"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[#f0f4f7] transition group-hover:text-[#d4af37] md:text-lg">
                {company.name}
              </h3>

              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b] transition group-hover:text-[#d4af37]/80">
                <span className="h-px w-6 bg-[#d4af37]/50 transition-all group-hover:w-10" />
                Profile
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
