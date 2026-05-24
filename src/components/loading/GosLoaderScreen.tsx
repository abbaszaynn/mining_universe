"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type GosLoaderScreenProps = {
  mode: "initial" | "route";
  exiting?: boolean;
  onExitComplete?: () => void;
};

export function GosLoaderScreen({
  mode,
  exiting = false,
  onExitComplete,
}: GosLoaderScreenProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const theRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const line = lineRef.current;
    const the = theRef.current;
    const title = titleRef.current;
    const tag = tagRef.current;
    if (!shell || !line || !the || !title) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      gsap.set([the, title, line, tag].filter(Boolean), { opacity: 1 });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
        the,
        { opacity: 0, y: 12, letterSpacing: "0.65em" },
        { opacity: 1, y: 0, letterSpacing: "0.45em", duration: 0.7, ease: "power3.out" },
        0.08
      )
      .fromTo(
        title,
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" },
        0.18
      );

    if (tag) {
      tl.fromTo(
        tag,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        0.42
      );
    }

    tl.fromTo(
      line,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.65, ease: "power3.inOut" },
      tag ? 0.5 : 0.35
    );

    gsap.to(line, {
      backgroundPosition: "200% 0",
      duration: mode === "initial" ? 2.4 : 1.4,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(line);
    };
  }, [mode]);

  useEffect(() => {
    if (!exiting) return;

    const shell = shellRef.current;
    const title = titleRef.current;
    if (!shell || !title) {
      onExitComplete?.();
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    if (reduceMotion) {
      onExitComplete?.();
      return;
    }

    const tl = gsap.timeline({ onComplete: onExitComplete });
    tl.to(title, {
      opacity: 0,
      y: -16,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.in",
    }).to(
      shell,
      { opacity: 0, duration: 0.4, ease: "power2.inOut" },
      0.12
    );

    return () => {
      tl.kill();
    };
  }, [exiting, onExitComplete]);

  return (
    <div
      ref={shellRef}
      style={{ backgroundColor: "#030712", color: "#e2e8f0" }}
      className={cn(
        "fixed inset-0 z-[99999] flex items-center justify-center",
        "pointer-events-auto touch-none select-none overscroll-none"
      )}
      aria-live="polite"
      aria-busy={!exiting}
      role="status"
      aria-label="Loading The Game of Stones"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden
      />

      <div className="relative z-10 px-8 text-center">
        <p
          ref={theRef}
          style={{ color: "rgba(232,228,220,0.9)", letterSpacing: "0.45em" }}
          className="font-mono text-[10px] uppercase md:text-xs"
        >
          The
        </p>
        <h1
          ref={titleRef}
          style={{ color: "#d4af37", letterSpacing: "0.12em" }}
          className="mt-3 font-[family-name:var(--font-got)] text-[clamp(1.75rem,6vw,3.25rem)] font-bold uppercase leading-[0.95]"
        >
          Game of Stones
        </h1>
        {mode === "initial" && (
          <p
            ref={tagRef}
            style={{ color: "#64748b", letterSpacing: "0.32em" }}
            className="mt-4 font-mono text-[9px] uppercase md:text-[10px]"
          >
            Gilgit Baltistan · Mining operators
          </p>
        )}

        <div className="mx-auto mt-8 h-px w-40 overflow-hidden rounded-full bg-white/[0.06] md:mt-10 md:w-52">
          <div
            ref={lineRef}
            className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,transparent,#d4af37,#f0e6c8,#d4af37,transparent)] bg-[length:200%_100%]"
          />
        </div>
      </div>
    </div>
  );
}
