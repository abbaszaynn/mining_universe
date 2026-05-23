"use client";

import type { Document } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<Document["type"], string> = {
  "Geological Report": "text-emerald-400/90",
  License: "text-[#d4af37]/90",
  "Concession Paper": "text-sky-400/90",
  "Financial Summary": "text-violet-400/90",
  Map: "text-amber-400/90",
};

type DocumentsTableProps = {
  documents: Document[];
  className?: string;
};

export function DocumentsTable({
  documents,
  className,
}: DocumentsTableProps) {
  if (documents.length === 0) return null;

  return (
    <div className={cn("overflow-hidden rounded-2xl bg-white/[0.02]", className)}>
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
        {documents.map((doc, index) => (
          <li
            key={doc.id}
            data-doc-row=""
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
  );
}
