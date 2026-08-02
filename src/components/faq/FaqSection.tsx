"use client";

import { useId, useState } from "react";
import { GOS_FAQ_ITEMS, type FaqItem } from "@/lib/faq-data";
import { faqJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  includeJsonLd?: boolean;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 transition-transform duration-300",
        open ? "text-copper-600 rotate-180" : "text-graphite-400"
      )}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function FaqSection({
  items = GOS_FAQ_ITEMS,
  title = "Frequently asked questions",
  subtitle = "Clear answers for investors exploring licensed mining opportunities in Gilgit Baltistan.",
  id = "faq",
  className,
  includeJsonLd = true,
}: FaqSectionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id={id}
      aria-labelledby={`${baseId}-heading`}
      className={cn(
        "relative overflow-hidden border-t border-graphite-950/[0.06] bg-bone-100",
        className
      )}
    >
      {includeJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,122,60,0.04),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16 lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-copper-600">
              Investor FAQ
            </p>
            <h2
              id={`${baseId}-heading`}
              className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-graphite-950 md:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-graphite-600 md:text-lg">
              {subtitle}
            </p>
            <div
              className="mt-8 hidden h-px w-24 bg-gradient-to-r from-copper-500/40 to-transparent lg:block"
              aria-hidden
            />
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              const open = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const triggerId = `${baseId}-trigger-${index}`;

              return (
                <article
                  key={item.question}
                  className={cn(
                    "rounded-2xl border transition duration-300",
                    open
                      ? "border-copper-500/30 bg-white shadow-sm"
                      : "border-graphite-950/[0.05] bg-bone-50/50 hover:border-graphite-950/10 hover:bg-white/80"
                  )}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-start gap-4 px-5 py-5 text-left md:px-6 md:py-6"
                    >
                      <span
                        className={cn(
                          "mt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] transition",
                          open ? "text-copper-600" : "text-graphite-400"
                        )}
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-graphite-950 md:text-lg">
                          {item.question}
                        </span>
                      </span>
                      <ChevronIcon open={open} />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-graphite-950/[0.06] px-5 pb-5 pt-4 text-sm leading-relaxed text-graphite-600 md:px-6 md:pb-6 md:pl-[3.25rem] md:text-base">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
