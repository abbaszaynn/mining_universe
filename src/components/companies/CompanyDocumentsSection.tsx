"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Company } from "@/lib/types";
import { DocumentsTable } from "@/components/documents/DocumentsTable";

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

      <DocumentsTable documents={company.documents} />
    </div>
  );
}
