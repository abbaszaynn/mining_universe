"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { formatDate, cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";
import { MineralTitle } from "./MineralTitle";

type BlogHorizonRowProps = {
  article: NewsArticle;
  index: number;
  companyName?: string;
};

export function BlogHorizonRow({
  article,
  index,
  companyName,
}: BlogHorizonRowProps) {
  const rowRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const reversed = index % 2 === 1;
  const label = String(index + 1).padStart(2, "0");

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      gsap.set(row.querySelectorAll("[data-horizon-part]"), {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const imageX = reversed ? 32 : -32;
      const textX = reversed ? -20 : 20;

      gsap.fromTo(
        row.querySelector("[data-horizon-image-panel]"),
        { opacity: 0, x: imageX, scale: 0.97, filter: "blur(8px)" },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        row.querySelectorAll("[data-horizon-text] > *"),
        { opacity: 0, y: 20, x: textX },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 76%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        row.querySelector("[data-horizon-rule]"),
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      if (imageWrapRef.current) {
        gsap.to(imageWrapRef.current, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, row);

    return () => ctx.revert();
  }, [article.id, reversed]);

  return (
    <article
      ref={rowRef}
      className={cn(
        "blog-horizon-row group relative scroll-mt-24",
        reversed ? "md:pl-4 lg:pl-8" : "md:pr-4 lg:pr-8"
      )}
    >
      {index > 0 && (
        <div className="mb-8 flex items-center gap-4 md:mb-12" aria-hidden>
          <span className="h-px w-12 bg-gradient-to-r from-copper-500/45 to-transparent sm:w-16" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-graphite-500">
            {label}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-graphite-950/[0.08] to-transparent" />
        </div>
      )}

      <Link
        href={`/news/${article.id}`}
        className={cn(
          "relative flex min-h-[min(62dvh,540px)] items-center gap-4 sm:min-h-[min(68dvh,580px)] sm:gap-6 md:gap-10 lg:gap-14",
          reversed ? "flex-row-reverse" : "flex-row"
        )}
        aria-label={`Read ${article.title}`}
      >
        <div
          data-horizon-image-panel
          data-horizon-part
          className="relative w-[34%] shrink-0 sm:w-[32%] md:w-[30%] lg:w-[28%] lg:max-w-[15rem]"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.15)] sm:rounded-2xl">
            <div ref={imageWrapRef} className="absolute inset-0 scale-105">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 34vw, (max-width: 1024px) 30vw, 240px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/45 via-transparent to-graphite-950/10" />
          </div>

          <span className="pointer-events-none absolute -left-1 -top-2 font-[family-name:var(--font-display)] text-4xl font-bold text-copper-500/12 sm:-left-2 sm:-top-4 sm:text-6xl md:text-7xl">
            {label}
          </span>

          {companyName && (
            <p className="mt-3 hidden font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-graphite-600 sm:mt-4 sm:block sm:text-[10px]">
              {companyName}
            </p>
          )}
        </div>

        <div
          data-horizon-rule
          className="hidden shrink-0 self-center sm:flex"
          aria-hidden
        >
          <span className="block h-20 w-px bg-gradient-to-b from-transparent via-copper-500/35 to-transparent md:h-28" />
        </div>

        <div
          data-horizon-text
          className={cn(
            "flex min-w-0 flex-1 flex-col justify-center py-2 sm:py-4",
            reversed ? "sm:pr-2 md:pr-6 lg:pr-10" : "sm:pl-2 md:pl-6 lg:pl-10"
          )}
        >
          <div data-horizon-part className="flex flex-wrap items-center gap-2 sm:gap-4">
            <time
              dateTime={article.publishDate}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite-600 sm:text-[11px] sm:tracking-[0.28em]"
            >
              {formatDate(article.publishDate)}
            </time>
            <span className="h-px w-6 bg-copper-500/30 sm:w-10" aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-graphite-500 sm:text-[10px] sm:tracking-[0.32em]">
              Archive
            </span>
          </div>

          <span
            data-horizon-part
            className="mt-4 block h-px w-12 bg-gradient-to-r from-copper-500/55 to-transparent sm:mt-6 sm:w-14"
            aria-hidden
          />

          <MineralTitle
            text={article.title}
            as="h2"
            className="mt-4 text-lg leading-snug transition duration-500 group-hover:text-copper-600 sm:mt-6 sm:text-2xl md:text-[1.75rem] lg:text-4xl lg:leading-tight"
          />

          <p
            data-horizon-part
            className="mt-3 line-clamp-4 text-sm leading-[1.75] text-graphite-600 sm:mt-5 sm:line-clamp-none sm:text-base sm:leading-[1.85] md:text-lg md:leading-[1.88]"
          >
            {article.excerpt}
          </p>

          {companyName && (
            <p
              data-horizon-part
              className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-graphite-600 sm:hidden"
            >
              {companyName}
            </p>
          )}

          <div data-horizon-part className="mt-5 flex items-center gap-3 sm:mt-8 sm:gap-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-copper-500 transition duration-500 group-hover:gap-3 group-hover:text-copper-600 sm:gap-2.5 sm:text-sm sm:tracking-[0.18em]">
              Read insight
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </span>
            <span className="h-px w-6 bg-graphite-950/10 sm:w-8" aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-graphite-500 sm:text-[10px] sm:tracking-[0.28em]">
              Field report
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
