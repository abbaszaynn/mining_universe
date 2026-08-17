"use client";

import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { SquareButton } from "@/components/ui/SquareButton";

export function InsightsSection() {
  return (
    <section className="relative overflow-hidden bg-bone-100 py-16 md:py-24">
      {/* Title */}
      <div className="relative z-20 mx-auto w-full max-w-[105rem] px-5 md:px-10">
        <h2 className="max-w-4xl text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] font-medium tracking-[-0.035em] text-graphite-950">
          Progress, partnerships, and industry recognition
        </h2>
      </div>

      {/* Testimonials */}
      <div className="relative mt-12 w-full md:mt-20">
        <StaggerTestimonials />
      </div>

      {/* Footer Link */}
      <div className="relative z-20 mx-auto max-w-[105rem] px-5 pt-12 md:px-10 md:pt-16">
        <SquareButton
          href="/news"
          tone="accent"
        >
          See all insights
        </SquareButton>
      </div>
    </section>
  );
}
