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
          <div className="max-w-4xl">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-[#d4af37]/90 md:text-sm">
              Front-end only · scroll-native 3D
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-[#f0f4f7] md:text-6xl lg:text-7xl">
              A mineral intelligence surface,
              <span className="block bg-gradient-to-r from-[#f0f4f7] via-[#d4af37] to-[#94a3b8] bg-clip-text text-transparent">
                rendered in depth.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#94a3b8] md:text-xl">
              Smooth Lenis scrolling, GSAP reveals, and a live Three.js canvas
              that responds to your journey — a client-ready shell with no
              backend dependencies in this phase.
            </p>
            <div className="pointer-events-auto mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/map"
                className="inline-flex items-center gap-3 rounded-full border border-[#d4af37]/45 bg-[#d4af37]/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d4af37] shadow-[0_0_32px_rgba(212,175,55,0.2)] backdrop-blur-sm transition hover:border-[#d4af37]/70 hover:bg-[#d4af37]/25 hover:text-[#f0f4f7]"
              >
                EXPLORE THE MINES
                <span
                  className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#d4af37]"
                  aria-hidden
                />
              </Link>
              <span className="text-sm text-[#64748b]">
                Opens the interactive mine map with live coordinates.
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
                Motion that carries meaning.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#94a3b8]">
                Parallax copy, depth cues, and restrained gold accents echo the
                Game of Stones palette — professional, geological, and calm under
                pressure.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                "Scroll-choreographed camera drift in WebGL",
                "Bloom-adjacent lighting without heavy post stacks",
                "Pinned horizontal chapter for dense narratives",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition hover:border-[#d4af37]/25"
                >
                  <p className="text-[#cbd5e1]">{item}</p>
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
              Ready when you are.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[#94a3b8]">
              This MVP is intentionally front-end only: ship it as a demo,
              iterate on art direction, then wire Firebase, Supabase, and the
              assistant when you are ready.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <span className="rounded-full bg-[#d4af37] px-8 py-3 text-sm font-semibold text-[#0f172a] shadow-[0_0_40px_rgba(212,175,55,0.25)] transition hover:brightness-110">
                Book a walkthrough
              </span>
              <span className="rounded-full border border-white/15 px-8 py-3 text-sm text-[#e2e8f0] transition hover:border-[#d4af37]/40">
                Request the roadmap PDF
              </span>
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
                  Mining Universe
                </p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[#94a3b8]">
                  A cinematic investor interface for mineral assets, regional
                  intelligence, and project storytelling across Gilgit Baltistan.
                </p>
                <div className="mt-6 inline-flex items-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]">
                  Investor Preview Environment
                </div>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]/90">
                  Platform
                </p>
                <ul className="mt-4 space-y-2 text-[#94a3b8]">
                  <li>Vision</li>
                  <li>3D Experience</li>
                  <li>Media Vault</li>
                  <li>Roadmap</li>
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37]/90">
                  Investor Desk
                </p>
                <ul className="mt-4 space-y-2 text-[#94a3b8]">
                  <li>partnerships@mininguniverse.io</li>
                  <li>+92 51 000 0000</li>
                  <li>Islamabad / Gilgit Region</li>
                  <li>Mon - Fri, 09:00 - 18:00 PKT</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 text-xs md:flex-row md:items-center md:justify-between">
              <p className="font-mono uppercase tracking-widest">
                © {new Date().getFullYear()} Mining Universe · All rights reserved
              </p>
              <p className="text-[#64748b]">
                Demonstration experience · production integrations arrive in the next phase.
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
