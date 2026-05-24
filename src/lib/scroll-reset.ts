import { ScrollTrigger } from "@/lib/gsap";

export const LOADER_COMPLETE_EVENT = "gos:loader-complete";

export function disableScrollRestoration() {
  if (typeof window === "undefined") return;
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

export function resetAppScroll() {
  if (typeof window === "undefined") return;

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function notifyLoaderComplete() {
  if (typeof window === "undefined") return;
  resetAppScroll();
  ScrollTrigger.clearScrollMemory?.();
  ScrollTrigger.refresh();
  window.dispatchEvent(new Event(LOADER_COMPLETE_EVENT));
}
