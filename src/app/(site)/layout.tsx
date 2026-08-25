import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      {/* The footer used to render only inside LandingPage, so every route
          in this group shipped without one. That put the legal links
          (privacy, terms, cookies) out of reach from anywhere but the
          homepage, and left /invest, /markets, /commodities and /faq
          linked from a single place on the entire site — thin internal
          linking, which is part of why pages sit in "Discovered, currently
          not indexed". The homepage lives outside this route group and
          keeps its own SiteFooter, so this does not double up. */}
      <SiteFooter />
    </>
  );
}
