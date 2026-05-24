"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Company } from "@/lib/types";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { CompanyProfilePanel } from "./CompanyProfilePanel";
import { CompanyNavStrip } from "./CompanyNavStrip";

type CompaniesExperienceProps = {
  companies: Company[];
};

export function CompaniesExperience({ companies }: CompaniesExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      gsap.set(root.querySelectorAll("[data-co-animate]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-co-hero] > *",
        { opacity: 0, y: 36, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [companies.length]);

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
        data-gos-page-root
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.022)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem] lg:max-w-7xl">
          <header data-co-hero className="mb-12 md:mb-16">
            <p
              data-co-animate
              className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90"
            >
              Portfolio registry
            </p>
            <h1
              data-co-animate
              className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl lg:text-6xl"
            >
              Mining companies
              <span className="block bg-gradient-to-r from-[#f0f4f7] via-[#d4af37] to-[#94a3b8] bg-clip-text text-transparent">
                of Gilgit Baltistan
              </span>
            </h1>
            <p
              data-co-animate
              className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94a3b8]"
            >
              Three licensed operators across Northern Pakistan. Explore each
              profile through overview, leadership, deposits, and active sites.
            </p>
            <div data-co-animate className="mt-8 flex items-center gap-4" aria-hidden>
              <span className="h-px w-16 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#475569]">
                {companies.length} operators
              </span>
            </div>
          </header>

          <CompanyNavStrip companies={companies} />

          <div className="flex flex-col gap-20 md:gap-28">
            {companies.map((company, index) => (
              <CompanyProfilePanel
                key={company.id}
                company={company}
                index={index}
              />
            ))}
          </div>
        </main>
      </div>
    </BlogMotionProvider>
  );
}
