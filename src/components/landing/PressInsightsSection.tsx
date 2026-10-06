"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, EASES } from "@/lib/gsap";
import { formatDate, cn } from "@/lib/utils";
import { SquareButton } from "@/components/ui/SquareButton";

/** Just what the homepage needs; full article bodies never reach the client. */
export type PressArticle = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishDate: string;
  companyName?: string;
  /** Published in the last two weeks, decided on the server. */
  isNew: boolean;
};

/**
 * Press & Insights: the newest articles, lead story plus a numbered list,
 * in the editorial newsroom pattern (one dominant story, the rest scannable).
 *
 * The list is fed newest-first from the server, so a new article takes the
 * lead slot on its own the moment it is published. It also gives the
 * homepage, the site's strongest page, a direct crawl link to every fresh
 * article, which is what gets new pages discovered and indexed quickly.
 */
export function PressInsightsSection({ articles }: { articles: PressArticle[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>("[data-press-reveal]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASES.out,
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="press-insights-heading"
      className="relative border-t border-graphite-950/[0.08] bg-bone-50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[105rem] px-5 md:px-10">
        <header
          data-press-reveal
          className="flex flex-col gap-6 border-b border-graphite-950/10 pb-8 md:flex-row md:items-end md:justify-between md:pb-10"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-copper-600">
              Press &amp; Insights
            </p>
            <h2
              id="press-insights-heading"
              className="mt-4 text-display-lg tracking-[-0.03em] text-graphite-950"
            >
              Latest from the field
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-[40ch] text-sm leading-relaxed text-graphite-500 md:text-right md:text-base">
              Investor guides, market analysis and field reports on Gilgit
              Baltistan&apos;s minerals, written by the people who hold the
              licences.
            </p>
            <SquareButton href="/news" tone="accent">
              All articles
            </SquareButton>
          </div>
        </header>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Lead story */}
          <article data-press-reveal className="group lg:col-span-7">
            <Link href={`/news/${lead.id}`} className="block focus-visible:outline-none">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-graphite-950/5 ring-1 ring-graphite-950/10 transition group-focus-visible:ring-2 group-focus-visible:ring-copper-500">
                <Image
                  src={lead.imageUrl}
                  alt={lead.title}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                />
                {lead.isNew && (
                  <span className="absolute left-4 top-4 rounded-full bg-copper-600 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50">
                    New
                  </span>
                )}
              </div>
              <ArticleMeta article={lead} showNew={false} className="mt-6" />
              <h3 className="mt-3 max-w-[30ch] font-[family-name:var(--font-display)] text-2xl font-medium leading-[1.15] tracking-[-0.02em] text-graphite-950 decoration-copper-500/40 underline-offset-[6px] group-hover:underline md:text-[2.125rem]">
                {lead.title}
              </h3>
              <p className="mt-4 line-clamp-3 max-w-[62ch] text-base leading-relaxed text-graphite-500">
                {lead.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-copper-600">
                Read the article
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </article>

          {/* Next stories */}
          {rest.length > 0 && (
            <ol className="lg:col-span-5">
              {rest.map((article, i) => (
                <li
                  key={article.id}
                  data-press-reveal
                  className={cn(
                    "border-graphite-950/10",
                    i === 0 ? "border-y" : "border-b"
                  )}
                >
                  <article className="group">
                    <Link
                      href={`/news/${article.id}`}
                      className="flex gap-5 py-6 focus-visible:outline-none md:py-7"
                    >
                      <span
                        aria-hidden
                        className="w-7 shrink-0 pt-0.5 font-mono text-xs tabular-nums text-graphite-400"
                      >
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <ArticleMeta article={article} />
                        <h3 className="mt-2 line-clamp-3 font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-[-0.01em] text-graphite-950 decoration-copper-500/40 underline-offset-4 group-hover:underline group-focus-visible:underline">
                          {article.title}
                        </h3>
                      </div>
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-graphite-950/5 ring-1 ring-graphite-950/10 md:h-24 md:w-24">
                        <Image
                          src={article.imageUrl}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

function ArticleMeta({
  article,
  showNew = true,
  className,
}: {
  article: PressArticle;
  showNew?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-graphite-500",
        className
      )}
    >
      {showNew && article.isNew && <span className="text-copper-600">New</span>}
      <time dateTime={article.publishDate}>{formatDate(article.publishDate)}</time>
      {article.companyName && (
        <>
          <span aria-hidden className="h-1 w-1 rounded-full bg-graphite-950/20" />
          <span className="truncate">{article.companyName.split(" (")[0]}</span>
        </>
      )}
    </p>
  );
}
