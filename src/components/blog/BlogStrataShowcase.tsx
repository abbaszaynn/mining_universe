"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { LOADER_COMPLETE_EVENT } from "@/lib/scroll-reset";
import { formatDate, cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

type BlogStrataShowcaseProps = {
  articles: NewsArticle[];
  companyNames: Record<string, string>;
};

function MineralTitle({
  text,
  className,
  as: Tag = "h3",
}: {
  text: string;
  className?: string;
  as?: "span" | "h3";
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag
      className={cn(
        "mineral-title font-[family-name:var(--font-display)] font-semibold tracking-tight text-[#f0f4f7]",
        "text-balance leading-[1.35] [text-shadow:0_1px_0_rgba(212,175,55,0.28),0_4px_20px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="mineral-word mr-[0.28em] inline-block last:mr-0"
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}

function StrataCard({
  article,
  index,
  companyName,
  variant,
}: {
  article: NewsArticle;
  index: number;
  companyName?: string;
  variant: "featured" | "secondary";
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      if (variant !== "featured") return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py * -6, y: px * 8 });
    },
    [variant]
  );

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const isFeatured = variant === "featured";
  const label = String(index + 1).padStart(2, "0");

  return (
    <Link
      ref={cardRef}
      href={`/news/${article.id}`}
      data-strata-card
      data-strata-variant={variant}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group strata-card relative block overflow-hidden transition-[transform,box-shadow,border-color] duration-500 [transform-style:preserve-3d]",
        isFeatured
          ? "rounded-[1.75rem] border border-white/10 bg-[#0a0f1e] shadow-[0_40px_120px_rgba(0,0,0,0.55)] hover:border-[#d4af37]/35 hover:shadow-[0_48px_140px_rgba(212,175,55,0.16)] md:grid md:grid-cols-12 md:gap-0"
          : cn(
              "rounded-2xl border border-white/10 bg-[#0a0f1e]/90 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-md hover:border-[#d4af37]/30 hover:shadow-[0_32px_100px_rgba(212,175,55,0.14)]",
              index === 1
                ? "md:-rotate-[2.5deg] md:translate-y-2"
                : "md:rotate-[2deg] md:-translate-y-4"
            )
      )}
      style={
        isFeatured
          ? {
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }
          : undefined
      }
    >
      {/* Cut-corner mineral facet */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-20 h-16 w-16 bg-[#020617]"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-20 h-16 w-16 border-b border-l border-[#d4af37]/25"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden
      />

      <div
        className={cn(
          "strata-image-wrap relative overflow-hidden",
          isFeatured
            ? "md:col-span-7 h-64 sm:h-72 md:h-[26rem]"
            : "h-44 sm:h-48"
        )}
        style={{ overflow: "hidden", isolation: "isolate" }}
      >
        <Image
          src={article.imageUrl}
          alt=""
          fill
          className="strata-image object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 58vw"
              : "(max-width: 768px) 100vw, 28vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/25 to-[#d4af37]/[0.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_42%,rgba(212,175,55,0.07)_50%,transparent_58%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <span
          className={cn(
            "pointer-events-none absolute font-[family-name:var(--font-display)] font-bold leading-none text-transparent",
            isFeatured
              ? "bottom-4 left-4 text-[5.5rem] md:text-[7rem]"
              : "bottom-3 left-3 text-5xl"
          )}
          style={{
            WebkitTextStroke: "1px rgba(212,175,55,0.35)",
          }}
          aria-hidden
        >
          {label}
        </span>
      </div>

      <div
        className={cn(
          "relative flex flex-col justify-end",
          isFeatured ? "md:col-span-5 p-7 md:p-10" : "p-5 md:p-6"
        )}
      >
        <div
          className="pointer-events-none absolute -right-6 top-1/2 hidden h-px w-32 -translate-y-1/2 bg-gradient-to-r from-[#d4af37]/50 to-transparent md:block"
          aria-hidden
        />

        <div className="mb-4 flex flex-wrap items-center gap-2.5">
          <time
            dateTime={article.publishDate}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#64748b]"
          >
            {formatDate(article.publishDate)}
          </time>
          {companyName && (
            <span className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[#d4af37]">
              {companyName}
            </span>
          )}
        </div>

        <MineralTitle
          text={article.title}
          as="h3"
          className={cn(isFeatured ? "text-2xl md:text-3xl lg:text-[2rem]" : "text-lg md:text-xl")}
        />

        <p
          className={cn(
            "mt-3 line-clamp-2 leading-relaxed text-[#94a3b8]",
            isFeatured ? "text-sm md:text-base" : "text-sm"
          )}
        >
          {article.excerpt}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#d4af37]">
          <span className="h-px w-8 bg-[#d4af37]/60 transition-all group-hover:w-12" />
          Read insight
        </span>
      </div>
    </Link>
  );
}

export function BlogStrataShowcase({
  articles,
  companyNames,
}: BlogStrataShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const headerTween = gsap.fromTo(
      section.querySelectorAll("[data-strata-header]"),
      { opacity: 0, y: 40, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 84%" },
      }
    );

    const tweens: gsap.core.Tween[] = [headerTween];

    const featured = section.querySelector('[data-strata-variant="featured"]');
    if (featured) {
      tweens.push(
        gsap.fromTo(
          featured,
          { opacity: 0, y: 80, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: featured, start: "top 88%" },
          }
        )
      );

      const image = featured.querySelector(".strata-image");
      if (image && !reduceMotion) {
        gsap.set(image, { scale: 1 });
        tweens.push(
          gsap.fromTo(
            image,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: featured,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          )
        );
      }
    }

    const secondaryCards = section.querySelectorAll(
      '[data-strata-variant="secondary"]'
    );
    secondaryCards.forEach((card, i) => {
      tweens.push(
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotate: i === 0 ? -8 : 8,
            x: i === 0 ? -40 : 40,
          },
          {
            opacity: 1,
            y: 0,
            rotate: i === 0 ? -2.5 : 2,
            x: 0,
            duration: 1,
            delay: 0.15 + i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        )
      );
    });

    section.querySelectorAll("[data-strata-card]").forEach((card) => {
      if (reduceMotion) return;
      const words = card.querySelectorAll(".mineral-word");
      if (!words.length) return;

      tweens.push(
        gsap.fromTo(
          words,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.035,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          }
        )
      );
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [articles]);

  useEffect(() => {
    const onLoaderComplete = () => {
      gsap.set(sectionRef.current?.querySelectorAll(".strata-image") ?? [], {
        clearProps: "transform",
      });
      ScrollTrigger.refresh();
    };

    window.addEventListener(LOADER_COMPLETE_EVENT, onLoaderComplete);
    return () => window.removeEventListener(LOADER_COMPLETE_EVENT, onLoaderComplete);
  }, []);

  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-[#020617] px-6 py-28 md:px-12 md:py-36"
    >
      {/* Strata background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(165deg, transparent 38%, rgba(212,175,55,0.04) 38.5%, transparent 39%),
            linear-gradient(155deg, transparent 62%, rgba(212,175,55,0.03) 62.5%, transparent 63%),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#d4af37]/[0.04] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#284c7d]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div data-strata-header>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
              Geological dispatch
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[#f0f4f7] md:text-5xl">
              Strata of insight from the field.
            </h2>
          </div>
          <Link
            href="/news"
            data-strata-header
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-[#e2e8f0] backdrop-blur-sm transition hover:border-[#d4af37]/40 hover:text-[#d4af37]"
          >
            All field notes
            <span aria-hidden>→</span>
          </Link>
        </div>

        <StrataCard
          article={featured}
          index={0}
          companyName={
            featured.companyId
              ? companyNames[featured.companyId]
              : undefined
          }
          variant="featured"
        />

        {rest.length > 0 && (
          <div className="relative mt-10 md:mt-14">
            <svg
              className="pointer-events-none absolute -top-6 left-1/2 hidden h-12 w-[88%] -translate-x-1/2 text-[#d4af37]/20 md:block"
              viewBox="0 0 800 48"
              fill="none"
              aria-hidden
            >
              <path
                d="M0 40 C200 8, 600 8, 800 40"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </svg>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {rest.slice(0, 2).map((article, i) => (
                <StrataCard
                  key={article.id}
                  article={article}
                  index={i + 1}
                  companyName={
                    article.companyId
                      ? companyNames[article.companyId]
                      : undefined
                  }
                  variant="secondary"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
