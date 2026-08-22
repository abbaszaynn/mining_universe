"use client";

import { useEffect, useState } from "react";
import {
  getStoredConsent,
  setStoredConsent,
  type ConsentStatus,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

export function CookieSettingsControl() {
  const [consent, setConsent] = useState<ConsentStatus | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setHydrated(true);
  }, []);

  const choose = (status: ConsentStatus) => {
    setStoredConsent(status);
    setConsent(status);
  };

  return (
    <div className="not-prose mt-6 rounded-lg border border-graphite-950/10 bg-bone-100 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-graphite-950">Analytics cookies</p>
          <p className="mt-1 text-sm leading-[1.5] text-graphite-500">
            Google Analytics (GA4). Helps us understand which pages get used;
            does not identify you personally.
          </p>
        </div>
        <span
          className={cn(
            "shrink-0 px-3 py-1 text-xs font-medium uppercase tracking-wide",
            consent === "granted" && "bg-copper-600/10 text-copper-700",
            consent === "denied" && "bg-graphite-950/8 text-graphite-500",
            consent === null && "bg-graphite-950/8 text-graphite-400"
          )}
        >
          {!hydrated
            ? "…"
            : consent === "granted"
              ? "Allowed"
              : consent === "denied"
                ? "Blocked"
                : "Not decided"}
        </span>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          disabled={!hydrated}
          className={cn(
            "px-4 py-2.5 text-sm transition-colors disabled:opacity-50",
            consent === "denied"
              ? "bg-graphite-950 text-bone-50"
              : "bg-bone-50 text-graphite-700 hover:bg-bone-200"
          )}
        >
          Block analytics cookies
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          disabled={!hydrated}
          className={cn(
            "px-4 py-2.5 text-sm transition-colors disabled:opacity-50",
            consent === "granted"
              ? "bg-copper-600 text-bone-50"
              : "bg-bone-50 text-graphite-700 hover:bg-bone-200"
          )}
        >
          Allow analytics cookies
        </button>
      </div>

      <p className="mt-4 text-xs leading-[1.5] text-graphite-400">
        Changing this takes effect immediately on this device and browser.
        Blocking analytics after previously allowing it stops new data from
        being collected; it does not delete data already recorded.
      </p>
    </div>
  );
}
