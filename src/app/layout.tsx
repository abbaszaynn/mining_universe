import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Script from "next/script";
import { AppProviders } from "@/components/providers/AppProviders";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, organizationJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

/** Set in GA4 → Admin → Data Streams → gbmines (web). Not a secret — every
 *  GA4 tag ships this ID in plain view on every page it's installed on.
 *  Override via env if the property ever changes. */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-K6L3FJSZ9F";

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
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
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
