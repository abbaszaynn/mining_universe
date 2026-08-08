import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

/** One family across the whole site — body and display both draw from Figtree,
 *  with weight/leading (not a second typeface) carrying the hierarchy. */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = createPageMetadata({
  title: SITE.name,
  description: SITE.description,
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
        // globals.css already sets `body { background: var(--background) }` —
        // no inline style needed (one was here before and caused a dev-only
        // hydration warning from the browser normalizing the color string).
        className={`${figtree.variable} min-h-[100dvh] bg-background font-sans antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
