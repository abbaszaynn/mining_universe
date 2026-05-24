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

  const fullTitle =
    path === "" || path === "/"
      ? SITE.title
      : `${title} | ${SITE.name}`;

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
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? {
          verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          },
        }
      : {}),
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
        alternateName: SITE.name,
        url,
        logo: absoluteUrl("/icon.svg"),
        description: SITE.description,
        email: SITE.email,
        telephone: SITE.phone,
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
