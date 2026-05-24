"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  clearCanvasReady,
  clearRouteReady,
  isPageReady,
  markRouteReady,
} from "@/lib/app-ready";

export function AppReadyMarker() {
  const pathname = usePathname();

  useEffect(() => {
    clearRouteReady();
    clearCanvasReady();

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let fallbackId = 0;

    const tryMark = () => {
      if (cancelled || !isPageReady()) return;

      observer?.disconnect();
      window.clearTimeout(fallbackId);
      markRouteReady();
    };

    observer = new MutationObserver(tryMark);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-gos-canvas-ready"],
    });

    const onCanvasReady = () => tryMark();
    window.addEventListener("gos:canvas-ready", onCanvasReady);

    requestAnimationFrame(() => {
      requestAnimationFrame(tryMark);
    });

    fallbackId = window.setTimeout(() => {
      if (!cancelled && isPageReady()) markRouteReady();
    }, 25000);

    return () => {
      cancelled = true;
      observer?.disconnect();
      window.removeEventListener("gos:canvas-ready", onCanvasReady);
      window.clearTimeout(fallbackId);
      clearRouteReady();
      clearCanvasReady();
    };
  }, [pathname]);

  return null;
}
