"use client";

import { GridLines } from "@/components/ui/GridLines";
import { CircularTestimonials, type Testimonial } from "@/components/ui/circular-testimonials";
import { DIRECTORS } from "@/lib/directors";

/**
 * Leadership profiles, ahead of the third-party reviews in InsightsSection —
 * the people who hold the licences first, then what the market says about them.
 *
 * The body text is each director's first-person `statement` from
 * lib/directors.ts, not their `bio` — that stays reserved for Person schema
 * and the About page, both of which need third person. These are real named
 * individuals on an investment-facing page, so nothing here is written for
 * them that they have not supplied themselves.
 *
 * Layout mirrors WhoWeAreSection's 12-column split (intro left, content
 * right) so the two leadership sections read as one family rather than the
 * carousel floating as an independently centred block under a full-width
 * heading.
 */
const PROFILES: Testimonial[] = DIRECTORS.map((d) => ({
  quote: `“${d.statement ?? d.bio}”`,
  name: d.name,
  designation: d.role,
  src: d.photo,
}));

export function DirectorsSection() {
  return (
    <section className="relative overflow-hidden bg-bone-100 py-24 md:py-32">
      <GridLines />

      <div className="relative z-10 mx-auto grid max-w-[105rem] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-3">
          <h2 className="text-display-lg tracking-[-0.03em] text-graphite-950">
            Leadership
          </h2>
          <p className="mt-6 max-w-[42ch] text-base leading-[1.5] text-graphite-500 md:text-lg">
            Durr &amp; Zircon Consortium is run by directors from Gilgit
            Baltistan itself. Every concession, permit and community
            agreement sits with the people below.
          </p>
        </div>

        <div className="lg:col-span-9">
          <CircularTestimonials
            testimonials={PROFILES}
            autoplay
            intervalMs={6000}
            className="mx-auto max-w-[60rem]"
          />
        </div>
      </div>
    </section>
  );
}
