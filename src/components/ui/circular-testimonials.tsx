"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Stacked, rotating profile carousel — adapted from the 21st.dev
 * circular-testimonials study.
 *
 * Changes made for this codebase:
 * - lucide-react for the arrows, since react-icons is not a dependency here
 *   and adding one for two glyphs is not worth it.
 * - Tailwind instead of the original styled-jsx block, so it uses the same
 *   bone/graphite/copper tokens as every other component rather than a
 *   parallel set of hardcoded hex values.
 * - next/image, so these photos get the same optimisation as the rest of the
 *   site.
 * - Autoplay is a rescheduled timeout, not setInterval. The original cleared
 *   its interval on every arrow click and never restarted it, so autoplay
 *   died permanently after the first interaction.
 * - Arrow-key navigation only listens while the carousel is hovered or holds
 *   focus. The original bound it to `window` unconditionally, which hijacked
 *   the arrow keys for the entire page.
 */

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  intervalMs = 6000,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  intervalMs?: number;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  // True while the pointer is over the carousel or focus sits inside it.
  // Pauses autoplay (nobody wants the card swapped out mid-read) and is the
  // gate for arrow-key navigation.
  const [engaged, setEngaged] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const total = testimonials.length;
  const active = testimonials[activeIndex];

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    const measure = () => {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!autoplay || engaged) return;
    const timer = setTimeout(next, intervalMs);
    return () => clearTimeout(timer);
  }, [autoplay, engaged, activeIndex, intervalMs, next]);

  useEffect(() => {
    if (!engaged) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [engaged, prev, next]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + total) % total === index;
    const isRight = (activeIndex + 1) % total === index;
    const transition = "all 0.8s cubic-bezier(.4,2,.3,1)";

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition,
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition,
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition,
      };
    }
    return { zIndex: 1, opacity: 0, transition };
  }

  return (
    <div
      className={cn("w-full max-w-[56rem]", className)}
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={() => setEngaged(false)}
    >
      <div className="grid gap-14 md:grid-cols-[1.15fr_1fr] md:gap-16 lg:gap-24">
        <div
          ref={imageContainerRef}
          className="relative h-[22rem] [perspective:1000px] sm:h-[26rem] lg:h-[29rem]"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.src}
              style={getImageStyle(i)}
              className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              aria-hidden={i !== activeIndex}
            >
              <Image
                src={t.src}
                alt={t.name}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex max-w-sm flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className="text-2xl leading-tight tracking-[-0.02em] text-graphite-950 md:text-[2rem]">
                {active.name}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-copper-600">
                {active.designation}
              </p>
              <p className="mt-6 min-h-[7.5rem] text-base leading-[1.75] text-graphite-600 md:min-h-[6rem] md:text-lg">
                {active.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={`${activeIndex}-${i}`}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut", delay: 0.02 * i }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-graphite-950 text-bone-50 transition-colors duration-base ease-out hover:bg-copper-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-graphite-950 text-bone-50 transition-colors duration-base ease-out hover:bg-copper-500"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CircularTestimonials;
