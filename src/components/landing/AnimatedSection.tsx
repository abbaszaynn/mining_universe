"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, EASES } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type RevealVariant = "cascade" | "split-reveal" | "mask-reveal";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

/**
 * Shared scroll-reveal primitive. Choreography varies by `variant` so sections
 * don't all fade in identically — pick the variant that matches the section's
 * role rather than defaulting everything to "cascade".
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  variant = "cascade",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tween: gsap.core.Tween;

    if (variant === "mask-reveal") {
      tween = gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)", opacity: 0, scale: 1.015 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          scale: 1,
          duration: 1.1,
          delay,
          ease: EASES.out,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else if (variant === "split-reveal") {
      tween = gsap.fromTo(
        el,
        { opacity: 0, x: -32, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.95,
          delay,
          ease: EASES.out,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y: 72, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          delay,
          ease: EASES.out,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, variant]);

  return (
    <section ref={ref} className={cn(className)}>
      {children}
    </section>
  );
}
