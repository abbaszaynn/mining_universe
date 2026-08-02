"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { NewsArticle } from "@/lib/types";
import { BlogHorizonRow } from "./BlogHorizonRow";

type BlogListingExperienceProps = {
  articles: NewsArticle[];
  companyNames: Record<string, string>;
};

export function BlogListingExperience({
  articles,
  companyNames,
}: BlogListingExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      gsap.set(root.querySelectorAll("[data-blog-animate]"), {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-blog-hero-eyebrow]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        "[data-blog-hero-title]",
        { opacity: 0, y: 48, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          delay: 0.12,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-blog-hero-desc]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 0.28,
          ease: "power3.out",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [articles.length]);

  return (
    <>
      <div
        ref={rootRef}
        data-gos-page-root
        className="relative min-h-[100dvh] overflow-x-hidden bg-bone-50 text-graphite-950"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(233,122,60,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(233,122,60,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(233,122,60,0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper-500/25 to-transparent"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-[6.5rem] md:px-10 md:pb-28 md:pt-[7.5rem] lg:max-w-7xl">
          <header className="relative mb-16 md:mb-24">
            <div
              className="pointer-events-none absolute -left-2 top-2 hidden h-32 w-px bg-gradient-to-b from-copper-500/40 via-copper-500/10 to-transparent md:block"
              aria-hidden
            />
            <p
              data-blog-hero-eyebrow
              data-blog-animate
              className="font-mono text-xs uppercase tracking-[0.35em] text-copper-500"
            >
              Field notes
            </p>
            <h1
              data-blog-hero-title
              data-blog-animate
              className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-graphite-950 md:text-5xl lg:text-6xl"
            >
              Latest blogs
              <span className="block bg-gradient-to-r from-graphite-950 via-copper-500 to-graphite-500 bg-clip-text text-transparent">
                &amp; insights
              </span>
            </h1>
            <p
              data-blog-hero-desc
              data-blog-animate
              className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite-600 md:text-xl"
            >
              Explore mineral potential, sustainable practices, and the future of
              mining across Northern Pakistan. Scroll the archive one story at
              a time.
            </p>
            <div
              className="mt-10 flex items-center gap-4"
              data-blog-animate
              aria-hidden
            >
              <span className="h-px w-20 bg-gradient-to-r from-copper-500/50 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-graphite-500">
                {articles.length} entries
              </span>
            </div>
          </header>

          <div
            data-blog-stack
            className="relative flex flex-col gap-4 md:gap-2"
          >
            <div
              className="pointer-events-none absolute bottom-0 left-3 top-0 hidden w-px bg-gradient-to-b from-copper-500/20 via-graphite-950/[0.06] to-transparent md:block"
              aria-hidden
            />
            {articles.map((article, index) => (
              <BlogHorizonRow
                key={article.id}
                article={article}
                index={index}
                companyName={
                  article.companyId
                    ? companyNames[article.companyId]
                    : undefined
                }
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
