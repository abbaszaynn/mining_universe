import { notFound } from "next/navigation";
import { MarketDetail } from "@/components/markets/MarketDetail";
import { MARKETS, getMarket } from "@/lib/markets";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return MARKETS.map((m) => ({ country: m.slug }));
}

export function generateMetadata({ params }: { params: { country: string } }) {
  const market = getMarket(params.country);
  if (!market) {
    return createPageMetadata({
      title: "Market Not Found",
      description: "This market page could not be found.",
      path: `/markets/${params.country}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: market.metaTitle,
    description: market.metaDescription,
    path: `/markets/${market.slug}`,
  });
}

export default function MarketPage({ params }: { params: { country: string } }) {
  const market = getMarket(params.country);
  if (!market) notFound();

  return <MarketDetail market={market} />;
}
