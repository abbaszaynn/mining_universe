/**
 * Minimal consent-gate for analytics cookies. No third-party CMP: the only
 * non-essential cookie this site sets is GA4's, so a single granted/denied
 * flag is enough. If a marketing/ads pixel is ever added, this needs to
 * become per-category rather than a single toggle.
 */
export type ConsentStatus = "granted" | "denied";

const STORAGE_KEY = "gos-cookie-consent";
export const CONSENT_CHANGE_EVENT = "gos-cookie-consent-change";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setStoredConsent(status: ConsentStatus) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: status })
  );
}
