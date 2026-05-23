"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Company } from "@/lib/types";

import { CompanyMultimediaSection } from "./CompanyMultimediaSection";
import { CompanyDocumentsSection } from "./CompanyDocumentsSection";
import { CompanyInvestorSection } from "./CompanyInvestorSection";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "multimedia", label: "Multimedia" },
  { id: "documents", label: "Documents" },
  { id: "investor", label: "Investor relations" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

type CompanyProfilePanelProps = {
  company: Company;
  index: number;
};

function getMotiveLines(company: Company) {
  return company.description
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !/incorporat/i.test(sentence))
    .slice(0, 2);
}

export function CompanyProfilePanel({ company, index }: CompanyProfilePanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<SectionId>("overview");
  const label = String(index + 1).padStart(2, "0");

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.querySelector("[data-co-panel-header]"),
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, panel);

    return () => ctx.revert();
  }, [company.id]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) return;

    gsap.fromTo(
      content,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [section, company.id]);

  return (
    <section
      id={company.id}
      ref={panelRef}
      className="scroll-mt-32"
      aria-labelledby={`company-${company.id}-title`}
    >
      {index > 0 && (
        <div className="mb-12 flex items-center gap-4 md:mb-16" aria-hidden>
          <span className="h-px w-14 bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#334155]">
            Operator {label}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
        </div>
      )}

      <div
        data-co-panel-header
        className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8"
      >
        <div className="relative shrink-0">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.04] p-3 sm:h-28 sm:w-28">
            <Image
              src={company.logoUrl}
              alt={`${company.name} logo`}
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="absolute -right-2 -top-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[#d4af37]/20">
            {label}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
                company.status === "Operational"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              )}
            >
              {company.status}
            </span>
            <span className="h-px w-8 bg-[#d4af37]/25" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#475569]">
              {company.locations.length} sites · {company.deposits.length} deposits
            </span>
          </div>
          <h2
            id={`company-${company.id}-title`}
            className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-[#f0f4f7] md:text-3xl lg:text-4xl"
          >
            {company.name}
          </h2>
          <p className="mt-2 text-base text-[#d4af37]/90 md:text-lg">
            {company.tagline}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 md:mt-10" role="tablist">
        {SECTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={section === item.id}
            onClick={() => setSection(item.id)}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition duration-300",
              section === item.id
                ? "bg-[#d4af37]/15 text-[#f0f4f7] shadow-[inset_0_0_0_1px_rgba(212,175,55,0.35)]"
                : "text-[#64748b] hover:text-[#94a3b8]"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div ref={contentRef} className="mt-8 md:mt-10" role="tabpanel">
        {section === "overview" && (
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
            <OverviewCard title="Motive" accent>
              <p className="text-lg font-medium leading-snug text-[#f0f4f7]">
                {company.tagline}
              </p>
              {getMotiveLines(company).map((line) => (
                <p
                  key={line}
                  className="mt-4 text-sm leading-relaxed text-[#94a3b8] md:text-base"
                >
                  {line}
                </p>
              ))}
            </OverviewCard>

            <OverviewCard title="Leadership">
              <ul className="space-y-3">
                {company.leadership.map((person) => (
                  <li key={`${person.name}-${person.title}`}>
                    <p className="font-medium text-[#e2e8f0]">{person.name}</p>
                    <p className="mt-0.5 text-sm text-[#64748b]">{person.title}</p>
                  </li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard title="Deposits">
              <ul className="space-y-3">
                {company.deposits.map((deposit) => (
                  <li
                    key={deposit.name}
                    className="flex items-start justify-between gap-3 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#e2e8f0]">
                        {deposit.name}
                      </p>
                      {deposit.location && (
                        <p className="mt-0.5 text-xs text-[#64748b]">
                          {deposit.location}
                        </p>
                      )}
                    </div>
                    {deposit.type && (
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-[#d4af37]/80">
                        {deposit.type}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </OverviewCard>

            <OverviewCard title="Mining sites">
              <ul className="space-y-2">
                {company.locations.map((site) => (
                  <li
                    key={site.name}
                    className="flex items-center gap-3 text-sm text-[#cbd5e1]"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-[#d4af37]/60" />
                    {site.name}
                  </li>
                ))}
              </ul>
              <Link
                href="/map"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d4af37] transition hover:gap-3 hover:text-[#f5e6a8]"
              >
                View on map
                <span>→</span>
              </Link>
            </OverviewCard>
          </div>
        )}

        {section === "multimedia" && (
          <CompanyMultimediaSection company={company} />
        )}

        {section === "documents" && (
          <CompanyDocumentsSection company={company} />
        )}

        {section === "investor" && (
          <CompanyInvestorSection company={company} />
        )}
      </div>
    </section>
  );
}

function OverviewCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-7",
        accent
          ? "bg-gradient-to-br from-[#d4af37]/10 via-white/[0.04] to-transparent"
          : "bg-white/[0.03]"
      )}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-[#d4af37]/40" aria-hidden />
        <h3 className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#d4af37]/90">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
