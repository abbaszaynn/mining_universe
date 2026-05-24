import type { Metadata } from "next";
import { Cinzel_Decorative, Inter, Syne } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-got",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = createPageMetadata({
  title: "Game of Stones",
  description:
    "Game of Stones connects global investors with licensed mining operators across Gilgit Baltistan — copper, gold, lithium, nephrite, antimony, and polymetallic assets under full regulatory compliance.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationJsonLd()} />
        {process.env.NODE_ENV === "development" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var k="gos-chunk-reload";function hit(m){return m&&(m.indexOf("ChunkLoadError")!==-1||m.indexOf("Loading chunk")!==-1||m.indexOf("Failed to fetch dynamically imported module")!==-1);}function reload(){if(sessionStorage.getItem(k)==="1")return;sessionStorage.setItem(k,"1");location.reload();}window.addEventListener("error",function(e){if(hit(e.message||""))reload();});window.addEventListener("unhandledrejection",function(e){var r=e.reason&&(e.reason.message||String(e.reason))||"";if(hit(r))reload();});window.addEventListener("load",function(){sessionStorage.removeItem(k);});})();`,
            }}
          />
        )}
      </head>
      <body
        style={{ backgroundColor: "#030712" }}
        className={`${inter.variable} ${syne.variable} ${cinzelDecorative.variable} min-h-[100dvh] bg-[#030712] font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
