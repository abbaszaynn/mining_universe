/** Lightweight route list for sitemap/robots — avoids importing heavy data modules. */

export const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  // Was /companies — that route no longer exists and returned 404 to every
  // crawler that followed the sitemap. Keep this list in step with src/app.
  { path: "/about", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/services", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/invest", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/map", changeFrequency: "monthly" as const, priority: 0.85 },
  { path: "/gallery", changeFrequency: "weekly" as const, priority: 0.85 },
  { path: "/news", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/documents", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.85 },
  {
    path: "/guides/mining-licence-gilgit-baltistan",
    changeFrequency: "monthly" as const,
    priority: 0.75,
  },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.75 },
  { path: "/investor-desk", changeFrequency: "monthly" as const, priority: 0.9 },
];

export const NEWS_ROUTES = [
  {
    id: "untapped-potential-copper-mining-gilgit-baltistan",
    publishDate: "2026-01-20T12:00:00Z",
  },
  {
    id: "sustainable-gemstone-mining-northern-pakistan",
    publishDate: "2026-01-27T09:00:00Z",
  },
  {
    id: "strategic-importance-silica-quartz-iron-ore",
    publishDate: "2026-02-03T14:00:00Z",
  },
  {
    id: "resurgence-placer-gold-panning-gilgit-baltistan",
    publishDate: "2026-02-10T10:00:00Z",
  },
  {
    id: "geology-shigar-copper-gold",
    publishDate: "2026-04-10T10:00:00Z",
  },
  {
    id: "geological-importance-hilal-abad",
    publishDate: "2026-04-12T10:00:00Z",
  },
];
