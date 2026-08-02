"use client";

import Image from "next/image";
import * as React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export type StackSlide = {
  image: string;
  title: string;
  badge: string;
};

type StackConfig = {
  yMultiplier: number;
  xMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
};

/** Adapted from the 21st.dev stacked carousel: the fan runs down the Y axis
 *  here rather than across X, and position is owned by scroll rather than drag. */
function getStackConfig(width: number): StackConfig {
  if (width < 640) {
    return { yMultiplier: 30, xMultiplier: 8, rotationMultiplier: 3.5, scaleReduction: 0.1 };
  }
  if (width < 1024) {
    return { yMultiplier: 104, xMultiplier: 18, rotationMultiplier: 5.5, scaleReduction: 0.11 };
  }
  return { yMultiplier: 132, xMultiplier: 24, rotationMultiplier: 6.5, scaleReduction: 0.12 };
}

export function VerticalCardStack({
  slides,
  progress,
  className,
}: {
  slides: StackSlide[];
  /** 0 … slides.length-1 — driven by the section's scroll progress. */
  progress: MotionValue<number>;
  className?: string;
}) {
  const [width, setWidth] = React.useState(1280);

  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const config = React.useMemo(() => getStackConfig(width), [width]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none",
        className
      )}
    >
      {slides.map((slide, i) => (
        <StackCard
          key={slide.image}
          slide={slide}
          index={i}
          progress={progress}
          config={config}
        />
      ))}
    </div>
  );
}

function StackCard({
  slide,
  index,
  progress,
  config,
}: {
  slide: StackSlide;
  index: number;
  progress: MotionValue<number>;
  config: StackConfig;
}) {
  const [loaded, setLoaded] = React.useState(false);

  // No wrapping — this is a finite four-step process, so the last card must
  // not fold back round to the first.
  const offset = useTransform(progress, (p) => index - p);

  const y = useTransform(offset, (o) => o * config.yMultiplier);
  const x = useTransform(offset, (o) => Math.abs(o) * config.xMultiplier);
  const rotate = useTransform(offset, (o) =>
    Math.abs(o) < 0.04 ? 0 : o * config.rotationMultiplier
  );
  const scale = useTransform(offset, (o) =>
    Math.max(0.6, 1 - Math.abs(o) * config.scaleReduction)
  );
  const opacity = useTransform(offset, [-2.4, -1.9, 0, 1.9, 2.4], [0, 1, 1, 1, 0]);
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10));
  const dim = useTransform(offset, [-1.5, -0.4, 0, 0.4, 1.5], [0.55, 0.3, 0, 0.3, 0.55]);
  const captionOpacity = useTransform(offset, [-0.45, 0, 0.45], [0, 1, 0]);

  return (
    <motion.figure
      style={{ x, y, rotate, scale, opacity, zIndex }}
      className={cn(
        "absolute overflow-hidden rounded-2xl bg-bone-200 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.45)]",
        "h-56 w-44 sm:h-72 sm:w-56 lg:h-[22rem] lg:w-[17rem]"
      )}
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 34vw, 20vw"
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-[opacity,transform] duration-[900ms] ease-out",
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        )}
      />

      {/* Depth wash — cards further from the active step sit back in shadow. */}
      <motion.span style={{ opacity: dim }} className="absolute inset-0 bg-graphite-950" aria-hidden />
      <span
        className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-graphite-950/15 to-transparent"
        aria-hidden
      />

      <span className="absolute right-3 top-3 rounded-full bg-bone-50/95 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-graphite-950 backdrop-blur-md lg:right-4 lg:top-4">
        {slide.badge}
      </span>

      <motion.figcaption
        style={{ opacity: captionOpacity }}
        className="absolute inset-x-4 bottom-4 text-bone-50 lg:inset-x-5 lg:bottom-5"
      >
        <span className="block text-base font-medium leading-tight drop-shadow-md lg:text-lg">
          {slide.title}
        </span>
      </motion.figcaption>
    </motion.figure>
  );
}
