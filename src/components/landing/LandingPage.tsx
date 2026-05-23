"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ScrollProvider, useScrollState } from "@/context/scroll-context";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AnimatedSection } from "./AnimatedSection";
import { HorizontalStrip } from "./HorizontalStrip";
import { MediaOrbitGallery } from "./MediaOrbitGallery";
import { BlogStrataShowcase } from "@/components/blog/BlogStrataShowcase";
import { CompanyShowcase } from "./CompanyShowcase";
import type { Company, NewsArticle } from "@/lib/types";

const CanvasLayer = dynamic(
  () => import("../canvas/CanvasLayer").then((m) => m.CanvasLayer),
  { ssr: false }
);

const SERVICE_POINTS = [
  {
    title: "Open to global investors",
    body: "We welcome partners from every market, with transparent profiles, verified licenses, and direct access to our investor desk.",
  },
  {
    title: "Guided field visits",
    body: "We accompany you to active sites across Gilgit Baltistan. Your safety is our responsibility from arrival to departure.",
  },
  {
    title: "Government clearance handled",
    body: "NOCs, security permissions, and regulatory liaison with authorities, all managed so you can focus on the opportunity.",
  },
];

function LandingInner({
  latestArticles,
  companyNames,
  companies,
}: {
  latestArticles: NewsArticle[];
  companyNames: Record<string, string>;
  companies: Pick<Company, "id" | "name" | "logoUrl" | "status">[];
}) {
  const { progressRef } = useScrollState();

  return (
    <div className="relative min-h-[100dvh] bg-[#030712] text-[#e2e8f0]">
      <CanvasLayer progressRef={progressRef} />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[5] h-24 bg-gradient-to-b from-[#030712] to-transparent" />

      <SiteHeader variant="overlay" />

      <main className="relative z-10">
        <section className="pointer-events-none flex min-h-[100dvh] flex-col justify-end px-6 pb-24 pt-32 md:px-12 md:pb-32">
          <div className="max-w-3xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-[#d4af37]/90 md:text-sm">
              Gilgit Baltistan · Licensed mining operators
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold uppercase leading-[0.92] tracking-tight text-[#f0f4f7] md:text-5xl lg:text-6xl">
              <span className="block text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal tracking-[0.45em] text-[#e8e4dc]">
                The
              </span>
              <span className="mt-1 block whitespace-nowrap text-[clamp(1.35rem,5.8vw,4.5rem)] font-semibold leading-none tracking-[0.05em] text-[#d4af37]">
                Game of Stones
              </span>
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90 md:text-sm">
              Mines in the North
            </p>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-[#a8b4c4] md:text-xl">
              Three licensed operators working across Skardu, Gilgit, and Ghizer.
              Copper, marble, gold, lithium, nephrite, serpentine, antimony, and
              polymetallic assets, all backed by geological reports, government
              permits, and a team that stands behind every site visit.
            </p>
            <div className="pointer-events-auto mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/map"
                className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d4af37] transition hover:border-[#d4af37]/50 hover:bg-[#d4af37]/12 hover:text-[#f0f4f7]"
              >
                Explore the mines
                <span
                  className="inline-block h-2 w-2 rounded-full bg-[#d4af37]/80"
                  aria-hidden
                />
              </Link>
              <span className="text-sm text-[#64748b]">
                Interactive map of active concessions and coordinates.
              </span>
            </div>
          </div>
          <div
            className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#64748b]"
            aria-hidden
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="flex h-10 w-6 justify-center rounded-full border border-white/15 pt-2">
              <span className="h-2 w-0.5 animate-bounce rounded-full bg-[#d4af37]/80" />
            </span>
          </div>
        </section>

        <AnimatedSection className="px-6 py-28 md:px-12">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0f4f7] md:text-4xl">
                Trustworthy partners for serious capital.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#94a3b8]">
                Game of Stones is built for investors who need more than a pitch deck.
                We operate in one of Pakistan&apos;s richest mineral corridors with
                full regulatory standing, and we make sure you are safe, informed,
                and cleared at every step.
              </p>
            </div>
            <div className="grid gap-4">
              {SERVICE_POINTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-[#d4af37]/25"
                >
                  <p className="font-medium text-[#f0f4f7]">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <CompanyShowcase companies={companies} />

        <HorizontalStrip />

        <AnimatedSection className="px-6 py-32 md:px-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#f0f4f7] md:text-5xl">
              Ready to visit the ground?
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[#94a3b8]">
              Browse company profiles, review geological documents, or reach our
              investor desk to arrange a field visit. We handle the rest.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/investor-desk"
                className="rounded-full bg-[#d4af37] px-8 py-3 text-sm font-semibold text-[#0f172a] transition hover:brightness-110"
              >
                Contact investor desk
              </Link>
              <Link
                href="/map"
                className="rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-8 py-3 text-sm font-semibold text-[#d4af37] transition hover:border-[#d4af37]/55 hover:bg-[#d4af37]/15"
              >
                Virtual 3D tour
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <MediaOrbitGallery />

        <BlogStrataShowcase
          articles={latestArticles}
          companyNames={companyNames}
        />

        <footer className="border-t border-white/10 bg-[#020617] px-6 py-16 text-sm text-[#64748b] md:px-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-4">
              <div className="md:col-span-2">
                <p className="font-[family-name:var(--font-display)] text-2xl text-[#dbe5f3]">
                  GOS
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-[#d4af37]/80">
                  Game of Stones
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#94a3b8]">
                  Licensed mining operators across Gilgit Baltistan, connecting
                  global investors with copper, marble, gold, and polymetallic
                  assets under full regulatory compliance.
                </p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]/90">
                  Explore
                </p>
                <ul className="mt-4 space-y-2 text-[#94a3b8]">
                  <li>
                    <Link href="/companies" className="transition hover:text-[#d4af37]">
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link href="/map" className="transition hover:text-[#d4af37]">
                      Mine map
                    </Link>
                  </li>
                  <li>
                    <Link href="/documents" className="transition hover:text-[#d4af37]">
                      Documents
                    </Link>
                  </li>
                  <li>
                    <Link href="/news" className="transition hover:text-[#d4af37]">
                      Blogs
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]/90">
                  Investor desk
                </p>
                <ul className="mt-4 space-y-2 text-[#94a3b8]">
                  <li>
                    <a
                      href="mailto:abbaszayn08@gmail.com"
                      className="transition hover:text-[#d4af37]"
                    >
                      abbaszayn08@gmail.com
                    </a>
                  </li>
                  <li>+92 310 9108714</li>
                  <li>Gilgit, Gilgit Baltistan</li>
                  <li>Mon to Fri, 9am to 6pm PKT</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 text-xs md:flex-row md:items-center md:justify-between">
              <p className="font-mono uppercase tracking-widest">
                © {new Date().getFullYear()} GOS · Game of Stones · All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function LandingPage({
  latestArticles,
  companyNames,
  companies,
}: {
  latestArticles: NewsArticle[];
  companyNames: Record<string, string>;
  companies: Pick<Company, "id" | "name" | "logoUrl" | "status">[];
}) {
  return (
    <ScrollProvider>
      <LandingInner
        latestArticles={latestArticles}
        companyNames={companyNames}
        companies={companies}
      />
    </ScrollProvider>
  );
}
