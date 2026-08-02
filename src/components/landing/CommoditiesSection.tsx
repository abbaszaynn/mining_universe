"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GridLines } from "@/components/ui/GridLines";
import { SquareButton } from "@/components/ui/SquareButton";
import { cn } from "@/lib/utils";

/** Reuse the already-optimised asset for the CSS mask so we never pull the
 *  multi-megabyte PNG source down a second time. */
const optimised = (src: string) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75`;

const COMMODITIES = [
  {
    name: "Gold",
    src: "/images/commodities/gold.png",
    body: "A rare, universally traded store of value. Demand spans central banks, technology manufacturers and jewellery markets worldwide — and our Kharmang and Shigar structures carry gold as a strong indication alongside copper.",
  },
  {
    name: "Copper",
    src: "/images/commodities/copper.png",
    body: "A highly conductive metal essential to electrical wiring, renewable energy infrastructure, construction and electronics. Demand is growing rapidly due to its critical role in EV batteries and solar energy systems.",
  },
  {
    name: "Nephrite Jade",
    src: "/images/commodities/nephrite.png",
    body: "Dense, fine-grained jade lifted from the Ghizer valleys. Prized across East Asian markets for carving and ornamental work, and among the most culturally valued stones we bring out of the ground.",
  },
  {
    name: "Lead",
    src: "/images/commodities/lead.png",
    body: "Extracted at Gultari and Jutial Nala alongside silver and mineralised copper veins. Still central to battery manufacture, radiation shielding and industrial alloys.",
  },
  {
    name: "Granite",
    src: "/images/commodities/granite.png",
    body: "Dimension stone quarried at Gupis in Ghizer, alongside premium marble. Cut for construction, architectural cladding and monumental work across domestic and export markets.",
  },
];

/** Directional slide for the specimen hand-off. */
const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 90, scale: 0.88 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -90, scale: 0.88 }),
};

export function CommoditiesSection() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);

  const paginate = useCallback((step: number) => {
    setState(([i]) => {
      const total = COMMODITIES.length;
      return [(i + step + total) % total, step];
    });
  }, []);

  /** Written straight to the DOM rather than through state — a re-render per
   *  pointer sample would be far too costly for a cursor-tracked overlay. */
  const trackPointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const host = crosshairRef.current;
    if (!host || !vRef.current || !hRef.current) return;
    const r = host.getBoundingClientRect();
    vRef.current.style.transform = `translate3d(${e.clientX - r.left}px,0,0)`;
    hRef.current.style.transform = `translate3d(0,${e.clientY - r.top}px,0)`;
    // Reveal from the move itself rather than relying on pointerenter, which
    // never fires when the cursor is already parked over the specimen as the
    // page scrolls beneath it or a slide swaps in.
    host.style.opacity = "1";
  }, []);

  const hideCrosshair = useCallback(() => {
    if (crosshairRef.current) crosshairRef.current.style.opacity = "0";
  }, []);

  const active = COMMODITIES[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bone-50 via-graphite-300 to-graphite-700">
      <GridLines tone="dark" />

      {/* Stage */}
      <div className="relative flex min-h-[100dvh] flex-col">
        <div className="relative z-20 mx-auto w-full max-w-[105rem] px-5 pt-8 md:px-10 md:pt-20">
          <h2 className="text-[clamp(2.5rem,5.5vw,6rem)] leading-[0.95] font-medium tracking-[-0.035em] text-graphite-700">
            Our Commodities
          </h2>
        </div>

        {/* Specimen — on mobile flows in the layout; on desktop absolutely centred */}
        {/* Desktop: absolute overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center md:flex">
          <div
            className="pointer-events-auto relative aspect-square w-[50%] max-w-[40rem]"
            onPointerMove={trackPointer}
            onPointerLeave={hideCrosshair}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={active.src + "-desktop"}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 220, damping: 30 },
                  opacity: { duration: 0.45 },
                  scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
                }}
                className="absolute inset-0"
              >
                <div
                  className="relative h-full w-full"
                  style={{ animation: "specimen-float 9s ease-in-out infinite" }}
                >
                  <div
                    className="absolute inset-0 scale-[1.04]"
                    style={{
                      filter: "blur(26px) brightness(1.75) saturate(1.5)",
                      animation: "neon-pulse 5.5s ease-in-out infinite",
                    }}
                    aria-hidden
                  >
                    <Image
                      src={active.src}
                      alt=""
                      fill
                      sizes="50vw"
                      className="object-contain"
                    />
                  </div>
                  <Image
                    src={active.src}
                    alt={active.name}
                    fill
                    sizes="50vw"
                    priority={index === 0}
                    className="relative object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Cursor crosshair */}
            <div
              ref={crosshairRef}
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 ease-out"
              style={{
                maskImage: `url("${optimised(active.src)}")`,
                WebkitMaskImage: `url("${optimised(active.src)}")`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
              aria-hidden
            >
              <div
                ref={vRef}
                className="absolute inset-y-0 left-0 w-px bg-white will-change-transform"
                style={{ boxShadow: "0 0 10px 1.5px rgba(255,255,255,0.95), 0 0 26px 5px rgba(160,220,255,0.7)" }}
              />
              <div
                ref={hRef}
                className="absolute inset-x-0 top-0 h-px bg-white will-change-transform"
                style={{ boxShadow: "0 0 10px 1.5px rgba(255,255,255,0.95), 0 0 26px 5px rgba(160,220,255,0.7)" }}
              />
            </div>
          </div>
        </div>

        {/* Mobile: flows in layout between heading and caption */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-8 md:hidden">
          <div className="relative aspect-square w-[65%] max-w-[20rem]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={active.src + "-mobile"}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 220, damping: 30 },
                  opacity: { duration: 0.45 },
                  scale: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
                }}
                className="absolute inset-0"
              >
                <div
                  className="relative h-full w-full"
                  style={{ animation: "specimen-float 9s ease-in-out infinite" }}
                >
                  <div
                    className="absolute inset-0 scale-[1.04]"
                    style={{
                      filter: "blur(20px) brightness(1.75) saturate(1.5)",
                      animation: "neon-pulse 5.5s ease-in-out infinite",
                    }}
                    aria-hidden
                  >
                    <Image
                      src={active.src}
                      alt=""
                      fill
                      sizes="65vw"
                      className="object-contain"
                    />
                  </div>
                  <Image
                    src={active.src}
                    alt={active.name}
                    fill
                    sizes="65vw"
                    priority={index === 0}
                    className="relative object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Caption + controls */}
        <div className="relative z-20 mt-auto w-full px-5 pb-10 md:px-10">
          <div className="mx-auto flex max-w-[105rem] flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="max-w-[46ch]"
              >
                <h3 className="text-display-md tracking-[-0.03em] text-bone-50">
                  {active.name}
                </h3>
                <p className="mt-4 text-sm leading-[1.5] text-bone-100/85 md:text-base">
                  {active.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex shrink-0 items-center gap-3">
              <span className="mr-2 text-sm tabular-nums text-bone-100/70">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(COMMODITIES.length).padStart(2, "0")}
              </span>
              {[
                { step: -1, label: "Previous commodity", d: "M13 4 L7 10 L13 16" },
                { step: 1, label: "Next commodity", d: "M7 4 L13 10 L7 16" },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => paginate(btn.step)}
                  aria-label={btn.label}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center border border-white/30 text-bone-50",
                    "transition-colors duration-base ease-out hover:bg-white/10"
                  )}
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
                    <path
                      d={btn.d}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider + products link, as on the reference stage */}
        <div className="relative z-20 border-t border-white/20">
          <div className="mx-auto max-w-[105rem] px-5 py-6 md:px-10 md:py-8">
            <SquareButton
              href="/gallery"
              tone="light"
            >
              View Our Products
            </SquareButton>
          </div>
        </div>
      </div>
    </section>
  );
}
