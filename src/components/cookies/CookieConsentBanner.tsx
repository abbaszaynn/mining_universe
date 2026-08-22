"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  const decide = (granted: boolean) => {
    setStoredConsent(granted ? "granted" : "denied");
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9998] border-t border-graphite-950/10 bg-bone-50/97 px-5 py-5 backdrop-blur md:px-10"
    >
      <div className="mx-auto flex max-w-[105rem] flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-[1.5] text-graphite-600 md:max-w-[60ch]">
          We use analytics cookies to understand how this site is used. They
          only run if you allow them. See our{" "}
          <Link href="/cookies" className="text-copper-600 underline underline-offset-4">
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="bg-bone-100 px-4 py-2.5 text-sm text-graphite-700 transition-colors hover:bg-bone-200"
          >
            Necessary only
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="bg-copper-600 px-4 py-2.5 text-sm text-bone-50 transition-colors hover:bg-copper-700"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
