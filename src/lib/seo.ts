import type { Metadata } from "next";
import { getSiteUrl, SITE } from "@/lib/site";

type PageSeoOptions = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "") {
  const base = getSiteUrl();
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage = SITE.defaultOgImage,
  ogType = "website",
  publishedTime,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  // Short suffix so page titles stay inside Google's ~60-character display.
  const fullTitle =
    path === "" || path === "/"
      ? SITE.title
      : `${title} | ${SITE.shortName}`;

  return {
    title: fullTitle,
    description,
    keywords: [...SITE.keywords],
    authors: [{ name: SITE.legalName }],
    creator: SITE.legalName,
    publisher: SITE.legalName,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: SITE.locale,
      url,
      siteName: SITE.legalName,
      title: fullTitle,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE.legalName} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      ...(SITE.twitterHandle ? { site: SITE.twitterHandle } : {}),
    },
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
        ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
        : {}),
      other: {
        "msvalidate.01": "8F561EC85D8BAAF60781535BFBB7D6DF",
      },
    },
  };
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: SITE.legalName,
        // Feeds entity resolution: tells Google the brand flourish and the two
        // predecessor companies all refer to this same registered entity.
        alternateName: [SITE.brandName, ...SITE.formerNames],
        url,
        logo: absoluteUrl("/icon.svg"),
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: SITE.region,
        },
        knowsAbout: [
          "Mining investment",
          "Copper mining",
          "Gold mining",
          "Mineral exploration",
          "Gilgit Baltistan",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE.legalName,
        description: SITE.description,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

/**
 * BreadcrumbList for detail pages. Pass the trail without the trailing
 * current-page URL duplicated: the last item is the page itself and, per
 * Google's guidance, carries a name but no link.
 *
 * Only use this where a real hierarchy exists and the page renders a
 * matching visible trail. Inventing an intermediate level that has no
 * index route (e.g. a /guides listing that doesn't exist) would point
 * crawlers at a 404.
 */
export function breadcrumbJsonLd(
  trail: { name: string; path?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.path ? { item: absoluteUrl(crumb.path) } : {}),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string;
  imageUrl: string;
  publishDate: string;
  id: string;
}) {
  const url = absoluteUrl(`/news/${article.id}`);
  const image = article.imageUrl.startsWith("http")
    ? article.imageUrl
    : absoluteUrl(article.imageUrl);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image,
    datePublished: article.publishDate,
    author: {
      "@type": "Organization",
      name: SITE.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.svg"),
      },
    },
    mainEntityOfPage: url,
  };
}
