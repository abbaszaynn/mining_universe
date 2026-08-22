import type { ReactNode } from "react";
import { GridLines } from "@/components/ui/GridLines";
import { Pill } from "@/components/ui/Pill";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  children: ReactNode;
};

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="relative bg-bone-50">
      <section className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
        <GridLines />
        <div className="relative z-10 mx-auto max-w-[105rem] px-5 md:px-10">
          <Pill>{eyebrow}</Pill>
          <h1 className="mt-6 max-w-[32ch] text-display-lg tracking-[-0.035em] text-graphite-950">
            {title}
          </h1>
          <p className="mt-4 text-sm text-graphite-400">
            Last updated {lastUpdated}
          </p>
          <p className="mt-8 max-w-[62ch] text-lg leading-[1.5] text-graphite-500 md:text-xl">
            {intro}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bone-50 pb-20 md:pb-28">
        <div className="relative z-10 mx-auto max-w-[70ch] px-5 md:px-10">
          <div
            className="
              [&>h2]:mt-12 [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:tracking-[-0.02em] [&>h2]:text-graphite-950
              [&>h2:first-child]:mt-0
              [&>h3]:mt-8 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-graphite-950
              [&>p]:mt-4 [&>p]:text-base [&>p]:leading-[1.6] [&>p]:text-graphite-600
              [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:text-base [&>ul]:leading-[1.6] [&>ul]:text-graphite-600
              [&_a]:text-copper-600 [&_a]:underline [&_a]:underline-offset-4
              [&>table]:mt-6 [&>table]:w-full [&>table]:border-collapse [&>table]:text-sm
              [&_th]:border-b [&_th]:border-graphite-950/15 [&_th]:py-2 [&_th]:pr-4 [&_th]:text-left [&_th]:font-medium [&_th]:text-graphite-950
              [&_td]:border-b [&_td]:border-graphite-950/8 [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_td]:text-graphite-600
            "
          >
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
