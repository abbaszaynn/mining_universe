"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { Company } from "@/lib/types";
import { ContactInquiryModal } from "@/components/contact/ContactInquiryModal";

type CompanyInvestorSectionProps = {
  company: Company;
};

export function CompanyInvestorSection({ company }: CompanyInvestorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-investor-card]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
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

  return (
    <div ref={sectionRef} className="space-y-8">
      <div className="mx-auto max-w-2xl text-center md:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#d4af37]/90">
          Investor desk
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7] md:text-3xl">
          Investor relations
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#94a3b8] md:text-base">
          Connect with the team for partnership opportunities, site visits, and
          mineral asset briefings across {company.name.split(" (")[0]}.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-5">
        {company.investorContacts.map((contact) => (
          <div
            key={`${contact.email}-${contact.name}`}
            data-investor-card
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-6 md:p-8"
          >
            <div
              className="pointer-events-none absolute right-0 top-0 h-24 w-24 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_70%)]"
              aria-hidden
            />

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#d4af37]/70">
                  Relations lead
                </span>
                <p className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-[#f0f4f7] md:text-2xl">
                  {contact.name}
                </p>
                <p className="mt-1 text-sm text-[#64748b]">
                  {company.name.split(" (")[0]}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#030712]/40 px-5 py-2.5 text-sm text-[#e2e8f0] transition hover:border-[#d4af37]/35 hover:text-[#d4af37]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b]">
                    Email
                  </span>
                  {contact.email}
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-[#030712]/40 px-5 py-2.5 text-sm text-[#e2e8f0] transition hover:border-[#d4af37]/35 hover:text-[#d4af37]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b]">
                    Phone
                  </span>
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 md:justify-start">
        <span className="h-px w-12 bg-[#d4af37]/30" aria-hidden />
        <button
          type="button"
          onClick={() => setInquiryOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37] transition hover:gap-3 hover:text-[#f5e6a8]"
        >
          General inquiry
          <span>→</span>
        </button>
      </div>

      <ContactInquiryModal
        open={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        companyName={company.name}
      />
    </div>
  );
}
