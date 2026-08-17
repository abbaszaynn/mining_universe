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
  const titleRef = useRef<HTMLParagraphElement>(null);
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

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onExitComplete?.();
    };

    const tl = gsap.timeline({ onComplete: finish });
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

    // GSAP is driven by requestAnimationFrame, which browsers suspend in
    // background tabs — without this the timeline never completes and the
    // loader would hold the page hostage (scroll locked) until refocus.
    const failSafe = window.setTimeout(finish, 1200);

    return () => {
      window.clearTimeout(failSafe);
      tl.kill();
    };
  }, [exiting, onExitComplete]);

  return (
    <div
      ref={shellRef}
      className={cn(
        "fixed inset-0 z-[99999] flex items-center justify-center bg-bone-50 text-graphite-950",
        "pointer-events-auto touch-none select-none overscroll-none"
      )}
      aria-live="polite"
      aria-busy={!exiting}
      role="status"
      aria-label="Loading The Game of Stones"
    >
      <div className="relative z-10 px-8 text-center">
        <p
          ref={theRef}
          style={{ letterSpacing: "0.45em" }}
          className="text-[10px] uppercase text-graphite-400 md:text-xs"
        >
          The
        </p>
        <p
          ref={titleRef}
          className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-graphite-950"
        >
          Game of Stones
        </p>
        {mode === "initial" && (
          <p
            ref={tagRef}
            style={{ letterSpacing: "0.3em" }}
            className="mt-4 text-[9px] uppercase text-graphite-400 md:text-[10px]"
          >
            Gilgit Baltistan · Licensed mining operators
          </p>
        )}

        <div className="mx-auto mt-8 h-px w-40 overflow-hidden bg-graphite-950/10 md:mt-10 md:w-52">
          <div
            ref={lineRef}
            className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,transparent,#b05b29,#e0a87c,#b05b29,transparent)] bg-[length:200%_100%]"
          />
        </div>
      </div>
    </div>
  );
}
