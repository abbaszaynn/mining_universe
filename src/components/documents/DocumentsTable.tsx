"use client";

import type { Document } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SquareButton } from "@/components/ui/SquareButton";

const TYPE_COLORS: Record<Document["type"], string> = {
  "Geological Report": "text-graphite-950",
  License: "text-graphite-950",
  "Concession Paper": "text-graphite-950",
  "Financial Summary": "text-graphite-950",
  Map: "text-graphite-950",
  "Investor Report": "text-copper-600",
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
    <div className={cn("overflow-hidden rounded-2xl bg-graphite-950/[0.02]", className)}>
      <div className="hidden border-b border-graphite-950/[0.06] px-6 py-4 md:grid md:grid-cols-[minmax(0,1fr)_10rem_7rem] md:items-center md:gap-x-10 lg:grid-cols-[minmax(0,1fr)_11rem_7.5rem] lg:gap-x-14 lg:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite-600">
          Title
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-graphite-600">
          Type
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.28em] text-graphite-600">
          Access
        </span>
      </div>

      <ul className="divide-y divide-graphite-950/[0.05]">
        {documents.map((doc, index) => (
          <li
            key={doc.id}
            data-doc-row=""
            className="group flex flex-col gap-4 px-6 py-5 transition hover:bg-graphite-950/[0.03] md:grid md:grid-cols-[minmax(0,1fr)_10rem_7rem] md:items-center md:gap-x-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_11rem_7.5rem] lg:gap-x-14 lg:px-8"
          >
            <div className="flex min-w-0 items-start gap-4 pr-2">
              <span className="shrink-0 font-mono text-sm text-copper-500/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="font-medium leading-snug text-graphite-950 transition group-hover:text-copper-600">
                  {doc.title}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-500 md:hidden">
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
                <SquareButton
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tone="accent"
                  className="!px-3 !py-2 text-[10px] md:!px-4 md:!py-2.5"
                >
                  Download
                </SquareButton>
              ) : (
                <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-graphite-500">
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
