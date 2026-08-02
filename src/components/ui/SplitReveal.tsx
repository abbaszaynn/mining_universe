"use client";

import { ElementType, useLayoutEffect, useRef } from "react";
import { gsap, EASES } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type SplitRevealProps = {
  /** Explicit lines — authored, not measured, so the break points are deliberate. */
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** Play on scroll into view (default) or immediately on mount. */
  trigger?: "scroll" | "mount";
  delay?: number;
};

/**
 * Line-mask reveal: each line sits in an overflow-clipped mask and slides up
 * from fully below it, staggered. The whole string stays in one aria-label so
 * screen readers get continuous text rather than fragments.
 */
export function SplitReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  trigger = "scroll",
  delay = 0,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const inner = el.querySelectorAll("[data-line-inner]");
      gsap.fromTo(
        inner,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 0.9,
          delay,
          stagger: 0.075,
          ease: EASES.out,
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: el, start: "top 85%" } }
            : {}),
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <Tag ref={ref} className={cn(className)} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask" aria-hidden>
          <span data-line-inner className={cn("block", lineClassName)}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
