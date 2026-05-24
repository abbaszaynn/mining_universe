import "maplibre-gl/dist/maplibre-gl.css";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-[#030712]">
      <SiteHeader variant="overlay" />
      <div className="absolute inset-0 top-[4.75rem]">{children}</div>
    </div>
  );
}
