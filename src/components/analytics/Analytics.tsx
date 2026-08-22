"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  type ConsentStatus,
} from "@/lib/cookie-consent";

/** Set in GA4 → Admin → Data Streams → gbmines (web). Not a secret — every
 *  GA4 tag ships this ID in plain view on every page it's installed on. */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-K6L3FJSZ9F";

/**
 * Loads GA4 only once the visitor has granted analytics consent, and only
 * in production. Nothing is injected before that — no script tag, no
 * cookie — rather than loading GA4 unconditionally and trying to suppress
 * it after the fact.
 */
export function Analytics() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    const onChange = (e: Event) => {
      setConsent((e as CustomEvent<ConsentStatus>).detail);
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (process.env.NODE_ENV !== "production" || consent !== "granted") {
    return null;
  }

  return (
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
  );
}
