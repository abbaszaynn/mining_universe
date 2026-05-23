"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Company, Document } from "@/lib/types";

const TYPE_COLORS: Record<Document["type"], string> = {
  "Geological Report": "text-emerald-400/90",
  License: "text-[#d4af37]/90",
  "Concession Paper": "text-sky-400/90",
  "Financial Summary": "text-violet-400/90",
  Map: "text-amber-400/90",
};

type CompanyDocumentsSectionProps = {
  company: Company;
};

export function CompanyDocumentsSection({ company }: CompanyDocumentsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-doc-row]",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [company.id]);

  if (company.documents.length === 0) {
    return (
      <div className="rounded-2xl bg-white/[0.03] p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#64748b]">
          Repository empty
        </p>
        <p className="mt-3 text-sm text-[#94a3b8]">
          Official reports and licenses for this operator will be published here.
        </p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="space-y-8">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#d4af37]/90">
          Official records
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7] md:text-3xl">
          Document repository
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#94a3b8] md:text-base">
          Geological reports, licenses, and concession papers available for
          investor review and due diligence.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/[0.02]">
        <div className="hidden border-b border-white/[0.06] px-6 py-4 md:grid md:grid-cols-[minmax(0,1fr)_10rem_7rem] md:items-center md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_11rem_7.5rem] lg:gap-x-14 lg:px-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
            Title
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
            Type
          </span>
          <span className="text-right font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b]">
            Access
          </span>
        </div>

        <ul className="divide-y divide-white/[0.05]">
          {company.documents.map((doc, index) => (
            <li
              key={doc.id}
              data-doc-row
              className="group flex flex-col gap-4 px-6 py-5 transition hover:bg-white/[0.03] md:grid md:grid-cols-[minmax(0,1fr)_10rem_7rem] md:items-center md:gap-x-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_11rem_7.5rem] lg:gap-x-14 lg:px-8"
            >
              <div className="flex min-w-0 items-start gap-4 pr-2">
                <span className="shrink-0 font-mono text-sm text-[#d4af37]/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-medium leading-snug text-[#f0f4f7] transition group-hover:text-[#f5e6a8]">
                    {doc.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#475569] md:hidden">
                    {doc.type}
                  </p>
                </div>
              </div>

              <span
                className={`hidden shrink-0 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] md:block ${TYPE_COLORS[doc.type]}`}
              >
                {doc.type}
              </span>

              <div className="shrink-0 md:text-right">
                {doc.url && doc.url !== "#" ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-[#d4af37] transition hover:gap-3 hover:text-[#f5e6a8]"
                  >
                    Download
                    <span>↓</span>
                  </a>
                ) : (
                  <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-[#475569]">
                    On request
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
