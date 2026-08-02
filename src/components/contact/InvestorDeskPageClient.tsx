"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { InvestorDeskForm } from "@/components/contact/InvestorDeskForm";
import {
  getInvestorDeskCompanies,
  type InvestorDeskCompany,
} from "@/lib/investor-desk-data";
import { FaqSection } from "@/components/faq/FaqSection";

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
    <>
      <div
        ref={rootRef}
        data-gos-page-root
        className="relative min-h-[100dvh] overflow-x-hidden bg-bone-50 text-graphite-950"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(233,122,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(233,122,60,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(233,122,60,0.06),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem] lg:max-w-7xl">
          <header data-desk-hero className="mb-14 md:mb-20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-copper-500">
              Investor desk
            </p>
            <h1 className="mt-4 mx-auto max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-wide uppercase text-graphite-950 md:text-5xl lg:text-6xl">
              Partner with Durr & Zircon Mines Consortium
            </h1>
            <p className="mt-6 mx-auto max-w-3xl text-lg font-light leading-relaxed text-graphite-600 md:text-xl">
              The Consortium represents unified mining operations across Gilgit
              Baltistan. We connect serious capital with copper, gold, and strategic assets,
              backed by geological reports, government permits, and a team that
              stands behind every conversation and site visit.
            </p>
          </header>

          <div className="mb-16 grid gap-4 md:grid-cols-3 md:gap-6">
            {HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                data-desk-card
                className="rounded-2xl border border-graphite-950/[0.05] bg-bone-50/50 p-6 shadow-sm transition hover:border-copper-500/20 hover:bg-white/80"
              >
                <span className="mb-4 inline-block h-px w-10 bg-copper-500/50" aria-hidden />
                <h2 className="font-[family-name:var(--font-display)] text-base font-semibold text-graphite-950 md:text-lg">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-graphite-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div data-desk-form className="relative">
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-copper-500/10 via-transparent to-transparent opacity-60"
              aria-hidden
            />
            <InvestorDeskForm companies={companies} />
          </div>

          <p className="mt-10 text-center text-sm font-light text-graphite-500">
            Prefer email? Reach us at{" "}
            <a
              href="mailto:abbaszayn08@gmail.com"
              className="text-copper-600 font-medium transition hover:text-copper-500"
            >
              abbaszayn08@gmail.com
            </a>{" "}
            or call +92 310 9108714
          </p>
        </main>

        <FaqSection
          subtitle="Answers to common questions before you submit an inquiry or plan a field visit to Gilgit Baltistan."
        />

        <footer className="border-t border-graphite-950/[0.06] bg-bone-100 px-6 py-12 text-sm text-graphite-500 md:px-10 md:py-14">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center md:flex-row md:items-center md:justify-between lg:max-w-7xl">
            <p className="font-[family-name:var(--font-display)] text-lg text-graphite-950 uppercase tracking-widest font-semibold">
              Durr & Zircon Mines Consortium
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
