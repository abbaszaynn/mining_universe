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
  /** Topic pills, from lib/article-tags. */
  tags: string[];
  /** Published in the last two weeks, decided on the server. */
  isNew: boolean;
};

/**
 * Press & Insights: newest article as a large feature card on the left, the
 * next three as stacked image-and-text rows on the right. A clean editorial
 * grid (source and date line, title, two-line summary, topic pills) chosen
 * over denser magazine layouts because it reads as considered and calm,
 * which suits investors scanning for substance.
 *
 * Fed newest-first from the server, so a new article takes the feature slot
 * on its own. It also gives the homepage, the site's strongest page, a
 * direct crawl link to every fresh article.
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
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-copper-600">
              Press &amp; Insights
            </p>
            <h2
              id="press-insights-heading"
              className="mt-4 text-display-lg tracking-[-0.03em] text-graphite-950"
            >
              Recent articles
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-graphite-500">
              Investor guides, market analysis and field reports on Gilgit
              Baltistan&apos;s minerals, from the people who hold the licences.
            </p>
          </div>
          <SquareButton href="/news" tone="accent" className="shrink-0 self-start md:self-end">
            View all articles
          </SquareButton>
        </header>

        <div className="mt-12 grid gap-10 md:mt-14 lg:grid-cols-2 lg:gap-12">
          {/* Feature card */}
          <article data-press-reveal className="group relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-sm bg-graphite-950/5">
              <Image
                src={lead.imageUrl}
                alt={lead.title}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              />
              {lead.isNew && (
                <span className="absolute left-4 top-4 rounded-full bg-copper-600 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-50">
                  New
                </span>
              )}
            </div>
            <Byline article={lead} className="mt-6" />
            <h3 className="mt-3 flex items-start justify-between gap-6">
              <Link
                href={`/news/${lead.id}`}
                className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug tracking-[-0.02em] text-graphite-950 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-copper-700 md:text-[1.75rem]"
              >
                {lead.title}
              </Link>
              <ArrowUpRight className="mt-1.5 h-6 w-6 shrink-0 text-graphite-950 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper-600" />
            </h3>
            <p className="mt-3 line-clamp-3 max-w-[64ch] text-base leading-relaxed text-graphite-500">
              {lead.excerpt}
            </p>
            <Tags tags={lead.tags} className="mt-5" />
          </article>

          {/* Stacked rows */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-8 lg:gap-7">
              {rest.map((article) => (
                <article
                  key={article.id}
                  data-press-reveal
                  className="group relative grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:gap-6"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-graphite-950/5 sm:aspect-[4/3]">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(min-width: 640px) 240px, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0">
                    <Byline article={article} />
                    <h3 className="mt-2">
                      <Link
                        href={`/news/${article.id}`}
                        className="line-clamp-2 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug tracking-[-0.01em] text-graphite-950 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-copper-700"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-graphite-500">
                      {article.excerpt}
                    </p>
                    <Tags tags={article.tags} className="mt-3" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** "Durr & Zircon Mines Consortium" -> "Durr & Zircon"; drops "(PVT) LTD". Zircon
 * Mines is merged into the consortium (companies-data), so its articles
 * have no company of their own and fall back to the consortium too. */
function shortCompany(name?: string) {
  if (!name) return "Durr & Zircon";
  return name.split(" (")[0].replace(/ Mines Consortium$/, "");
}

function Byline({ article, className }: { article: PressArticle; className?: string }) {
  return (
    <p className={cn("text-sm font-medium text-copper-700", className)}>
      {shortCompany(article.companyName)}
      <span aria-hidden className="mx-1.5 text-graphite-400">
        •
      </span>
      <time dateTime={article.publishDate} className="text-graphite-500">
        {formatDate(article.publishDate)}
      </time>
    </p>
  );
}

function Tags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={cn("relative z-10 flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-graphite-950/25 px-3 py-0.5 text-xs font-medium text-graphite-700"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}
