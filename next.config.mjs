/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // /companies was live and crawlable before the rename. Without a 301 it
      // 404s, throwing away any indexing and inbound links it had earned.
      { source: "/companies", destination: "/about", permanent: true },
      { source: "/companies/:slug", destination: "/about", permanent: true },

      // Six early articles retired in Sept 2026. They were indexed, and one
      // (the copper article) held position 5 in Search Console, so deleting
      // them outright would have turned earned rankings into 404s. Each 301s
      // to the page that now answers the same question best.
      {
        source: "/news/untapped-potential-copper-mining-gilgit-baltistan",
        destination: "/news/mines-of-gilgit-baltistan-pakistan-minerals-guide",
        permanent: true,
      },
      {
        source: "/news/sustainable-gemstone-mining-northern-pakistan",
        destination: "/concessions/bagicha-skardu-gemstones-and-minerals",
        permanent: true,
      },
      {
        source: "/news/strategic-importance-silica-quartz-iron-ore",
        destination: "/commodities/quartz-silica",
        permanent: true,
      },
      {
        source: "/news/resurgence-placer-gold-panning-gilgit-baltistan",
        destination: "/news/placer-gold-mining-pakistan-gilgit-baltistan",
        permanent: true,
      },
      {
        source: "/news/geology-shigar-copper-gold",
        destination: "/concessions/shigar-copper-deposit",
        permanent: true,
      },
      {
        source: "/news/geological-importance-hilal-abad",
        destination: "/concessions/hilal-abad-polymetallic-complex",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.output.chunkLoadTimeout = 120000;
    }
    return config;
  },
};

export default nextConfig;
