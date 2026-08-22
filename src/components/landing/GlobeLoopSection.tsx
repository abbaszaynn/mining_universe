"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, EASES } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { SquareButton } from "@/components/ui/SquareButton";

export function GlobeLoopSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const content = contentRef.current;
    
    if (!section || !frame || !content) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1, // Very low scrub delay for instantaneous frame scaling
        },
      });

      // Normalised 0–1 timeline so the beats stay legible against the scrub.
      tl.fromTo(
        frame,
        { scale: 0.62, borderRadius: "10px" },
        { scale: 1, borderRadius: "0px", ease: "none", duration: 0.6 },
        0
      )
        .fromTo(marqueeRef.current, { opacity: 1 }, { opacity: 0, ease: "none", duration: 0.25 }, 0.08)
        .fromTo(
          content,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, ease: EASES.out, duration: 0.18 },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-sand-100">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <GridLines />

        {/* Marquee sits behind the frame and fades as the globe takes over */}
        <div
          ref={marqueeRef}
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
          aria-hidden
        >
          <div
            className="flex w-max whitespace-nowrap"
            style={{ animation: "marquee-scroll 30s linear infinite" }}
          >
            {[0, 1].map((rep) => (
              <span key={rep} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="mx-8 text-marquee uppercase tracking-[-0.03em] text-copper-700"
                  >
                    Licensed mining at the source.
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Growing globe frame */}
        <div className="absolute inset-0 flex items-center justify-center px-5 md:px-10">
          <div
            ref={frameRef}
            className="relative h-[62vh] w-full max-w-[105rem] overflow-hidden bg-graphite-950 will-change-transform md:h-[70vh]"
          >
            <video
              src="/Earth Zoom In Realistic Clouds With Alpha Matte.mp4"
              playsInline
              muted
              autoPlay
              loop
              className="h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/90 via-graphite-950/20 to-transparent z-10"
              aria-hidden
            />
          </div>
        </div>

        {/* Copy that lands once the descent finishes */}
        <div
          ref={contentRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-14 md:px-10 md:pb-20 z-20"
        >
          <div className="mx-auto grid max-w-[105rem] gap-8 md:grid-cols-2 md:items-end md:gap-16">
            <h2 className="text-display-lg tracking-[-0.03em] text-bone-50 drop-shadow-md">
              Licensed Mines
              <br />
              <span className="text-copper-400">in the North</span>
            </h2>
            <div className="pointer-events-auto">
              <p className="max-w-[38ch] text-lg leading-[1.4] text-bone-100/90 md:text-xl drop-shadow-md">
                Ten licensed concessions across Skardu, Gilgit and Ghizer,
                each with surveyed boundaries, government permits and
                coordinates you can verify before you travel.
              </p>
              <div className="mt-8">
                <SquareButton href="/map" tone="light">
                  Open the mine map
                </SquareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
