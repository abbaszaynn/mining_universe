"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { clearRouteReady, clearCanvasReady, waitForRouteReady } from "@/lib/app-ready";
import {
  disableScrollRestoration,
  notifyLoaderComplete,
  resetAppScroll,
} from "@/lib/scroll-reset";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { GosLoaderScreen } from "./GosLoaderScreen";
import { AppReadyMarker } from "./AppReadyMarker";

type LoaderMode = "initial" | "route";

type LoadingContextValue = {
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextValue>({ isLoading: false });

export function useLoadingState() {
  return useContext(LoadingContext);
}

function isInternalNavigation(href: string, pathname: string) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return false;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === pathname && !url.search) return false;
    return true;
  } catch {
    return false;
  }
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<LoaderMode>("initial");
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const initialDoneRef = useRef(false);
  const exitStartedRef = useRef(false);
  const pathnameRef = useRef(pathname);
  const bootPathRef = useRef(pathname);
  const routeTokenRef = useRef(0);

  const initialLocked = visible && mode === "initial" && !exiting;
  useScrollLock(initialLocked);

  const beginExit = useCallback(() => {
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;
    resetAppScroll();
    ScrollTrigger.refresh();
    setExiting(true);
  }, []);

  const showLoader = useCallback((nextMode: LoaderMode) => {
    exitStartedRef.current = false;
    setMode(nextMode);
    setVisible(true);
    setExiting(false);
  }, []);

  const handleExitComplete = useCallback(() => {
    setVisible(false);
    setExiting(false);
    resetAppScroll();
    notifyLoaderComplete();
  }, []);

  const finishWhenReady = useCallback(
    async (token: number, loaderMode: LoaderMode) => {
      const minDelay = new Promise<void>((resolve) => {
        const ms =
          loaderMode === "initial"
            ? process.env.NODE_ENV === "production"
              ? 900
              : 1200
            : process.env.NODE_ENV === "production"
              ? 280
              : 350;
        window.setTimeout(resolve, ms);
      });

      await Promise.all([minDelay, waitForRouteReady(loaderMode === "initial" ? 30000 : 12000)]);
      if (routeTokenRef.current !== token) return;

      resetAppScroll();
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      beginExit();
    },
    [beginExit]
  );

  const finishWhenReadyRef = useRef(finishWhenReady);
  finishWhenReadyRef.current = finishWhenReady;

  useEffect(() => {
    disableScrollRestoration();
    resetAppScroll();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const token = ++routeTokenRef.current;

    const boot = async () => {
      resetAppScroll();
      clearRouteReady();
      clearCanvasReady();

      if (window.location.pathname === "/") {
        void import("@/components/canvas/CanvasLayer");
      }

      await new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      });

      if (cancelled) return;

      try {
        await document.fonts?.ready;
      } catch {
        // Ignore font loading errors and continue.
      }

      if (cancelled) return;

      await finishWhenReadyRef.current(token, "initial");
      if (cancelled) return;

      initialDoneRef.current = true;
    };

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    pathnameRef.current = pathname;

    if (!initialDoneRef.current) return;
    if (pathname === bootPathRef.current) return;

    bootPathRef.current = pathname;
    const token = ++routeTokenRef.current;

    clearRouteReady();
    clearCanvasReady();
    showLoader("route");
    finishWhenReady(token, "route");
  }, [pathname, finishWhenReady, showLoader]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!initialDoneRef.current) return;
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      if (!isInternalNavigation(href, pathnameRef.current)) return;

      clearRouteReady();
      showLoader("route");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [showLoader]);

  return (
    <LoadingContext.Provider value={{ isLoading: visible && !exiting }}>
      <AppReadyMarker />
      <div
        aria-hidden={initialLocked}
        className={cn(
          initialLocked && "pointer-events-none opacity-0"
        )}
      >
        {children}
      </div>
      {visible && (
        <GosLoaderScreen
          mode={mode}
          exiting={exiting}
          onExitComplete={handleExitComplete}
        />
      )}
    </LoadingContext.Provider>
  );
}
