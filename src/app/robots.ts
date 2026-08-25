import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /cdn-cgi/ is Cloudflare's own path prefix (the site is proxied
      // through it), not an app route — most visibly its email-obfuscation
      // rewrite of mailto: links, which GSC flagged as a 404 once Google
      // tried to crawl it directly. Nothing under /cdn-cgi/ is a real page.
      disallow: ["/api/", "/cdn-cgi/"],
    },
    // Only the XML sitemap belongs here. The Sitemap: directive expects a
    // sitemap format, and llms.txt is markdown prose — listing it made Google
    // try to parse it as a sitemap and report an unreadable-format error.
    // llms.txt is found by convention at its well-known path instead.
    //
    // GPTBot, ClaudeBot, PerplexityBot and Google-Extended are all covered by
    // the wildcard allow above. Leave them permitted — blocking them removes
    // answer-engine visibility entirely.
    sitemap: `${base}/sitemap.xml`,
  };
}
