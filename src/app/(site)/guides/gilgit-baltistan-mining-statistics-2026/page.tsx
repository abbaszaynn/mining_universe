import { MiningStatisticsPage } from "@/components/guides/MiningStatisticsPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Gilgit Baltistan Mining Statistics 2026",
  description:
    "Verified mining statistics for Gilgit Baltistan, Pakistan: 43,494 km² of mining area with only 6.3% under licence, mineral profile, sector economics, 2025 to 2026 investment agreements, and the licensing framework. Every figure sourced and dated.",
  path: "/guides/gilgit-baltistan-mining-statistics-2026",
});

export default function GilgitBaltistanMiningStatisticsPage() {
  return <MiningStatisticsPage />;
}
