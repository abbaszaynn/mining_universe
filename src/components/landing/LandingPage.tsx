"use client";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "./HeroSection";
import { AboutStickySection } from "./AboutStickySection";
import { GlobeLoopSection } from "./GlobeLoopSection";
import { FeatureSection } from "./FeatureSection";
import { WhatWeDoSection } from "./WhatWeDoSection";
import { CommoditiesSection } from "./CommoditiesSection";
import { RegionsMapSection } from "./RegionsMapSection";
import { DirectorsSection } from "./DirectorsSection";
import { PressInsightsSection, type PressArticle } from "./PressInsightsSection";
import { InsightsSection } from "./InsightsSection";
import { VideoSection } from "./VideoSection";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function LandingPage({ latestArticles = [] }: { latestArticles?: PressArticle[] }) {
  return (
    <div data-gos-page-root className="relative bg-bone-100 text-graphite-950">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutStickySection />
        <GlobeLoopSection />
        <FeatureSection />
        <WhatWeDoSection />
        <CommoditiesSection />
        <RegionsMapSection />
        <DirectorsSection />
        <PressInsightsSection articles={latestArticles} />
        <InsightsSection />
        <VideoSection />
      </main>
      <SiteFooter />
    </div>
  );
}
