"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { GridLines } from "@/components/ui/GridLines";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { SquareButton } from "@/components/ui/SquareButton";

export function AboutExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const band = bandRef.current;
    if (!section || !band) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        band,
        { yPercent: 6, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div data-gos-page-root className="relative bg-bone-100 text-graphite-950 min-h-[100dvh]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bone-100 text-graphite-950 pt-32 pb-20 md:pt-48 md:pb-32">
        <GridLines tone="light" />
        
        {/* Decorative ambient gradients */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,122,60,0.15),transparent_100%)]" aria-hidden />

        <div className="relative z-20 mx-auto max-w-[105rem] px-5 md:px-10">
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-copper-500 mb-8 mt-12 md:mt-0">
            Our Legacy
          </p>
          <SplitReveal
            as="h1"
            trigger="mount"
            delay={0.15}
            lines={["Durr & Zircon", "Mines Consortium"]}
            className="max-w-[20ch] text-display-xl tracking-[-0.035em] text-graphite-950 mb-10"
          />
          <p className="max-w-2xl text-lg leading-relaxed text-graphite-600 md:text-xl">
            A unified force in resource extraction across Gilgit Baltistan. Through strategic consolidation, we harness unparalleled geological expertise to bring the most sought-after minerals to the global market, prioritizing sustainability and localized growth.
          </p>
        </div>
      </section>

      {/* Vision, Story & Future Section */}
      <section ref={sectionRef} className="relative py-24 md:py-32 bg-bone-100">
        <GridLines />
        <div className="mx-auto max-w-[105rem] px-5 md:px-10 relative z-10 flex flex-col gap-24 md:gap-32">
          
          {/* Our Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-last lg:order-first">
              <img 
                src="/images/about/vision.jpeg" 
                alt="Our Vision" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                Our Vision
              </h2>
              <p className="text-lg text-graphite-500 leading-relaxed">
                To stand as the premier, sustainable mining consortium in Northern Pakistan, redefining industry standards by integrating advanced exploration technology with uncompromising environmental stewardship. We envision a future where mineral wealth directly empowers the region while serving vital global industrial needs.
              </p>
            </div>
          </div>

          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                Our Story
              </h2>
              <p className="text-lg text-graphite-500 leading-relaxed mb-6">
                Born from the strategic merger of Durr Mines and Zircon Mines, our consortium was built on a shared ambition to streamline operations and magnify scale. By unifying decades of local expertise, we have unlocked a diverse portfolio ranging from high-grade copper and gold to strategic silica quartz.
              </p>
              <SquareButton href="/map" tone="accent">
                Explore Operations
              </SquareButton>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/about/our%20story.jpeg" 
                alt="Our Story" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* The Future With Us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-last lg:order-first">
              <img 
                src="/images/about/the%20future.jpeg" 
                alt="The Future With Us" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                The Future With Us
              </h2>
              <p className="text-lg text-graphite-500 leading-relaxed">
                As we look ahead, our focus shifts towards deep-tech integration and green mining practices. The future with us promises transparent supply chains, localized infrastructure development, and an unyielding commitment to leaving a positive multi-generational legacy in Gilgit Baltistan.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Copper Band Highlight */}
      <section ref={bandRef} className="relative bg-copper-500 text-bone-50 overflow-hidden">
        <GridLines tone="dark" />
        <div className="relative z-20 mx-auto max-w-[105rem] px-5 py-24 md:px-10 md:py-32">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-10">
              Unearthing Tomorrow, Safely Today
            </h2>
            <p className="text-xl leading-relaxed text-bone-100 md:text-2xl">
              We operate exclusively in licensed zones under full regulatory compliance. Our closed-loop extraction methods and rigorous community-first policies ensure that every ounce we mine contributes positively to the economy and respects the fragile ecosystem of Gilgit Baltistan.
            </p>
            <div className="mt-12">
              <SquareButton href="/investor-desk" tone="light">
                Partner With Us
              </SquareButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
