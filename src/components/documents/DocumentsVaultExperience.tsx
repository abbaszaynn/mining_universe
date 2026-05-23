"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import type { Company } from "@/lib/types";
import { BlogMotionProvider } from "@/components/blog/BlogMotionProvider";
import { DocumentsTable } from "./DocumentsTable";

type DocumentsVaultExperienceProps = {
  companies: Company[];
};

export function DocumentsVaultExperience({
  companies,
}: DocumentsVaultExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const withDocs = companies.filter((c) => c.documents.length > 0);
  const totalDocs = withDocs.reduce((n, c) => n + c.documents.length, 0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      gsap.set(root.querySelectorAll("[data-doc-animate]"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-doc-hero] > *",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-doc-section]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [withDocs.length]);

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.022)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.09),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem] lg:max-w-7xl">
          <header data-doc-hero className="mb-12 md:mb-16">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
              Official records
            </p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl">
              Documents vault
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#94a3b8]">
              Geological reports, licenses, and concession papers from every
              licensed operator, available for investor review and due diligence.
            </p>
            <div className="mt-8 flex items-center gap-4" aria-hidden>
              <span className="h-px w-16 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#475569]">
                {totalDocs} documents · {withDocs.length} operators
              </span>
            </div>
          </header>

          {withDocs.length > 1 && (
            <nav
              className="sticky top-[4.25rem] z-40 mb-12 flex flex-wrap gap-2 border-b border-white/[0.06] bg-[#030712]/80 pb-4 backdrop-blur-xl md:top-[4.75rem] md:gap-3"
              aria-label="Jump to operator"
            >
              {withDocs.map((company, index) => (
                <a
                  key={company.id}
                  href={`#${company.id}-documents`}
                  data-doc-animate
                  className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#94a3b8] transition hover:border-[#d4af37]/35 hover:text-[#f0f4f7]"
                >
                  <span className="font-mono text-[10px] text-[#d4af37]/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[8rem] truncate sm:max-w-none">
                    {company.name.split(" (")[0]}
                  </span>
                </a>
              ))}
            </nav>
          )}

          <div className="flex flex-col gap-16 md:gap-24">
            {withDocs.map((company) => (
              <section
                key={company.id}
                id={`${company.id}-documents`}
                data-doc-section
                className="scroll-mt-32"
              >
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
                      Operator
                    </p>
                    <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7] md:text-3xl">
                      {company.name.split(" (")[0]}
                    </h2>
                    <p className="mt-2 text-sm text-[#94a3b8]">{company.tagline}</p>
                  </div>
                  <Link
                    href={`/companies#${company.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d4af37] transition hover:gap-3 hover:text-[#f5e6a8]"
                  >
                    Company profile
                    <span>→</span>
                  </Link>
                </div>

                <DocumentsTable documents={company.documents} />
              </section>
            ))}
          </div>
        </main>
      </div>
    </BlogMotionProvider>
  );
}
