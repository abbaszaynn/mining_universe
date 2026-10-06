import "maplibre-gl/dist/maplibre-gl.css";
import { SiteHeader } from "@/components/layout/SiteHeader";

/**
 * The map fills the first screen below the header; the page then scrolls to
 * a server-rendered index of the licensed sites (see page.tsx). This used to
 * be a fixed, overflow-hidden viewport holding only the client-side map, so
 * crawlers saw about 35 words and no H1 on /map.
 */
export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#030712]">
      <SiteHeader />
      <div className="pt-[4.75rem]">{children}</div>
    </div>
  );
}
