import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function PageShell({
  children,
  className,
  eyebrow,
  title,
  description,
}: PageShellProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent"
        aria-hidden
      />

      <main
        className={cn(
          "relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-[6.5rem] md:px-10 md:pb-28 md:pt-[7.5rem]",
          className
        )}
      >
        {(eyebrow || title || description) && (
          <header className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && (
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
                {eyebrow}
              </p>
            )}
            {title && (
              <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl lg:text-6xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-5 text-lg leading-relaxed text-[#94a3b8] md:text-xl">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </main>
    </div>
  );
}

type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoonPanel({ title, description }: ComingSoonProps) {
  return (
    <PageShell eyebrow="Coming next" title={title} description={description}>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-10 md:p-14">
        <p className="max-w-2xl text-[#94a3b8]">
          This section is part of the phased rollout. The homepage, blogs, and
          shared navigation are live now, with full company profiles, maps, and
          documents arriving in the next phase.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:brightness-110"
          >
            Back to home
          </Link>
          <Link
            href="/news"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-[#e2e8f0] transition hover:border-[#d4af37]/40"
          >
            Read blogs
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
