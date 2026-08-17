import { MarketsIndex } from "@/components/markets/MarketsIndex";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Mining Investment Markets: China, US, Gulf & Asia",
  description:
    "Mining and mineral investment opportunities in Gilgit Baltistan, Pakistan for investors in China, the United States, Saudi Arabia, the UAE, Thailand, and Pakistan.",
  path: "/markets",
});

export default function MarketsPage() {
  return <MarketsIndex />;
}
