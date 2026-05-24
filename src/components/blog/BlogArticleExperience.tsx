"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { formatDate, cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";
import { BlogMotionProvider } from "./BlogMotionProvider";
import { MineralTitle } from "./MineralTitle";
import { BlogCard } from "./BlogCard";

type BlogArticleExperienceProps = {
  article: NewsArticle;
  companyName?: string;
  relatedArticles: NewsArticle[];
  companyNames: Record<string, string>;
};

export function BlogArticleExperience({
  article,
  companyName,
  relatedArticles,
  companyNames,
}: BlogArticleExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const paragraphs = article.content.split("\n\n").filter(Boolean);

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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-blog-back]",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6 }
      )
        .fromTo(
          "[data-blog-meta] > *",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.25"
        )
        .fromTo(
          ".blog-title-word",
          { opacity: 0, y: 36, rotateX: 28 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.75, stagger: 0.045 },
          "-=0.2"
        )
        .fromTo(
          "[data-blog-excerpt]",
          { opacity: 0, y: 24, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.35"
        )
        .fromTo(
          "[data-blog-hero]",
          { opacity: 0, scale: 1.08, clipPath: "inset(12% 8% 12% 8% round 24px)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            duration: 1.15,
            ease: "power2.inOut",
          },
          "-=0.45"
        );

      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-blog-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-blog-paragraph]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        "[data-blog-related] > *",
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-blog-related]",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (progressRef.current) {
        gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [article.id]);

  return (
    <BlogMotionProvider>
      <div
        ref={rootRef}
        data-gos-page-root
        className="relative min-h-[100dvh] overflow-x-hidden bg-[#030712] text-[#e2e8f0]"
      >
        <div
          ref={progressRef}
          className="pointer-events-none fixed left-0 right-0 top-[4.25rem] z-[60] h-px origin-left scale-x-0 bg-gradient-to-r from-[#d4af37] via-[#f5e6a8] to-[#d4af37] md:top-[4.75rem]"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.1),transparent_58%)]"
          aria-hidden
        />

        <main className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-[6.5rem] md:px-10 md:pb-32 md:pt-[7.5rem]">
          <Link
            href="/news"
            data-blog-back
            data-blog-animate
            className="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#64748b] transition hover:text-[#d4af37]"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            All blogs
          </Link>

          <header className="mb-12 space-y-6 text-center [perspective:900px] md:mb-14">
            <div
              data-blog-meta
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {companyName && (
                <span className="rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-4 py-1.5 text-xs font-medium text-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.12)]">
                  {companyName}
                </span>
              )}
              <time
                dateTime={article.publishDate}
                className="font-mono text-xs uppercase tracking-[0.24em] text-[#64748b]"
              >
                {formatDate(article.publishDate)}
              </time>
              <span className="hidden h-1 w-1 rounded-full bg-[#d4af37]/50 sm:inline-block" />
              <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-[#475569] sm:inline">
                {paragraphs.length} sections
              </span>
            </div>

            <MineralTitle
              text={article.title}
              className="text-3xl md:text-5xl lg:text-[3.25rem]"
            />

            <p
              data-blog-excerpt
              data-blog-animate
              className="mx-auto max-w-2xl text-lg leading-relaxed text-[#94a3b8] md:text-xl"
            >
              {article.excerpt}
            </p>
          </header>

          <div
            data-blog-hero
            data-blog-animate
            className="relative mb-14 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 shadow-[0_32px_100px_rgba(0,0,0,0.55)] md:mb-16"
            style={{ aspectRatio: "16 / 9", overflow: "hidden" }}
          >
            <div
              ref={heroImageRef}
              className="absolute inset-0 scale-110"
              style={{ overflow: "hidden" }}
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-[#030712]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
          </div>

          <div
            data-blog-body
            className="relative mx-auto max-w-3xl space-y-8 md:space-y-10"
          >
            <div
              className="pointer-events-none absolute -left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/10 to-transparent md:block"
              aria-hidden
            />

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                data-blog-paragraph
                data-blog-animate
                className={cn(
                  "relative text-base leading-[1.85] text-[#cbd5e1] md:text-lg md:leading-[1.9]",
                  index === 0 &&
                    "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-[family-name:var(--font-display)] first-letter:text-5xl first-letter:font-semibold first-letter:text-[#d4af37] md:first-letter:text-6xl",
                  index % 2 === 1 &&
                    "border-l border-[#d4af37]/20 pl-6 md:pl-8"
                )}
              >
                {index > 0 && (
                  <span
                    className="mb-3 block font-mono text-[10px] uppercase tracking-[0.35em] text-[#d4af37]/70"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                {paragraph}
              </p>
            ))}
          </div>

          {relatedArticles.length > 0 && (
            <section className="mt-24 border-t border-white/10 pt-16 md:mt-32 md:pt-20">
              <div className="mb-10 max-w-xl">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
                  Continue reading
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#f0f4f7] md:text-3xl">
                  More from the field
                </h2>
              </div>
              <div
                data-blog-related
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                {relatedArticles.map((related) => (
                  <BlogCard
                    key={related.id}
                    article={related}
                    companyName={
                      related.companyId
                        ? companyNames[related.companyId]
                        : undefined
                    }
                    className="blog-related-card"
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </BlogMotionProvider>
  );
}
