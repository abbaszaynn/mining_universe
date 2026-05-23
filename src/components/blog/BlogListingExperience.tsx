"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { NewsArticle } from "@/lib/types";
import { BlogMotionProvider } from "./BlogMotionProvider";
import { BlogCard } from "./BlogCard";

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

      gsap.fromTo(
        ".blog-list-card",
        { opacity: 0, y: 72, scale: 0.96, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-blog-grid]",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [articles.length]);

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.09),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-[6.5rem] md:px-10 md:pb-28 md:pt-[7.5rem]">
          <header className="mb-14 max-w-3xl md:mb-20">
            <p
              data-blog-hero-eyebrow
              data-blog-animate
              className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90"
            >
              Field notes
            </p>
            <h1
              data-blog-hero-title
              data-blog-animate
              className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl lg:text-6xl"
            >
              Latest blogs
              <span className="block bg-gradient-to-r from-[#f0f4f7] via-[#d4af37] to-[#94a3b8] bg-clip-text text-transparent">
                &amp; insights
              </span>
            </h1>
            <p
              data-blog-hero-desc
              data-blog-animate
              className="mt-6 text-lg leading-relaxed text-[#94a3b8] md:text-xl"
            >
              Explore mineral potential, sustainable practices, and the future of
              mining across Northern Pakistan — scroll to browse the archive.
            </p>
          </header>

          <div
            data-blog-grid
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                companyName={
                  article.companyId
                    ? companyNames[article.companyId]
                    : undefined
                }
                className="blog-list-card"
              />
            ))}
          </div>
        </main>
      </div>
    </BlogMotionProvider>
  );
}
