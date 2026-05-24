"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { InvestorDeskForm } from "@/components/contact/InvestorDeskForm";
import {
  getInvestorDeskCompanies,
  type InvestorDeskCompany,
} from "@/lib/investor-desk-data";

const HIGHLIGHTS = [
  {
    title: "Global investors welcome",
    body: "We work with partners from every region, with transparent profiles and direct access to licensed operators.",
  },
  {
    title: "Safety on every visit",
    body: "Guided field trips across Skardu, Gilgit, and Ghizer, with your security handled from arrival to departure.",
  },
  {
    title: "Permits and clearance",
    body: "NOCs, security permissions, and government liaison managed so you can focus on the opportunity.",
  },
];

type InvestorDeskPageClientProps = {
  companies?: InvestorDeskCompany[];
};

export function InvestorDeskPageClient({
  companies: companiesProp,
}: InvestorDeskPageClientProps) {
  const companies = companiesProp ?? getInvestorDeskCompanies();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-desk-hero] > *",
        { opacity: 0, y: 36, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-desk-card]",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          delay: 0.15,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-desk-form]",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-desk-form]",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        data-gos-page-root
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.022)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-[#d4af37]/[0.04] blur-3xl"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem] lg:max-w-7xl">
          <header data-desk-hero className="mb-14 md:mb-20">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
              Investor desk
            </p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl lg:text-6xl">
              Partner with Game of Stones
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-[#94a3b8] md:text-xl">
              GOS represents three licensed mining operators across Gilgit
              Baltistan. We connect serious capital with copper, marble, gold,
              lithium, nephrite, serpentine, antimony, and polymetallic assets,
              backed by geological reports, government permits, and a team that
              stands behind every conversation and site visit.
            </p>
          </header>

          <div className="mb-16 grid gap-4 md:grid-cols-3 md:gap-6">
            {HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                data-desk-card
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition hover:border-[#d4af37]/20 hover:bg-white/[0.04]"
              >
                <span className="mb-4 inline-block h-px w-10 bg-[#d4af37]/50" aria-hidden />
                <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#f0f4f7] md:text-lg">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#94a3b8]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div data-desk-form className="relative">
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-[#d4af37]/20 via-transparent to-transparent opacity-60"
              aria-hidden
            />
            <InvestorDeskForm companies={companies} />
          </div>

          <p className="mt-10 text-center text-sm font-light text-[#64748b]">
            Prefer email? Reach us at{" "}
            <a
              href="mailto:abbaszayn08@gmail.com"
              className="text-[#d4af37] transition hover:text-[#f5e6a8]"
            >
              abbaszayn08@gmail.com
            </a>{" "}
            or call +92 310 9108714
          </p>
        </main>
      </div>
    </BlogMotionProvider>
  );
}
