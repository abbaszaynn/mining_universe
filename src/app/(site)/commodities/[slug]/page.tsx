import { notFound } from "next/navigation";
import { CommodityDetail } from "@/components/commodities/CommodityDetail";
import { COMMODITIES, getCommodity } from "@/lib/commodities";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return COMMODITIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const commodity = getCommodity(params.slug);
  if (!commodity) {
    return createPageMetadata({
      title: "Commodity Not Found",
      description: "This commodity page could not be found.",
      path: `/commodities/${params.slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: commodity.metaTitle,
    description: commodity.metaDescription,
    path: `/commodities/${commodity.slug}`,
  });
}

export default function CommodityPage({ params }: { params: { slug: string } }) {
  const commodity = getCommodity(params.slug);
  if (!commodity) notFound();

  return <CommodityDetail commodity={commodity} />;
}
