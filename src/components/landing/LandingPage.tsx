"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "./HeroSection";
import { AboutStickySection } from "./AboutStickySection";
import { GlobeLoopSection } from "./GlobeLoopSection";
import { FeatureSection } from "./FeatureSection";
import { WhoWeAreSection } from "./WhoWeAreSection";
import { WhatWeDoSection } from "./WhatWeDoSection";
import { CommoditiesSection } from "./CommoditiesSection";
import { RegionsMapSection } from "./RegionsMapSection";
import { InsightsSection } from "./InsightsSection";
import { VideoSection } from "./VideoSection";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function LandingPage() {
  return (
    <div data-gos-page-root className="relative bg-bone-100 text-graphite-950">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutStickySection />
        <GlobeLoopSection />
        <FeatureSection />
        <WhoWeAreSection />
        <WhatWeDoSection />
        <CommoditiesSection />
        <RegionsMapSection />
        <InsightsSection />
        <VideoSection />
      </main>
      <SiteFooter />
    </div>
  );
}
