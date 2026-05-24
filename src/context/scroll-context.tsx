"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerModalLenis, unregisterModalLenis } from "@/lib/modal-scroll";
import { LOADER_COMPLETE_EVENT, resetAppScroll } from "@/lib/scroll-reset";

type ScrollContextValue = {
  progressRef: MutableRefObject<number>;
  lenisRef: MutableRefObject<Lenis | null>;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const progressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const lenis = new Lenis({
      duration: reduceMotion ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;
    registerModalLenis(lenis);
    lenis.scrollTo(0, { immediate: true });

    lenis.on("scroll", ({ scroll, limit }) => {
      progressRef.current = limit > 0 ? scroll / limit : 0;
      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.refresh();

    const onLoaderComplete = () => {
      resetAppScroll();
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener(LOADER_COMPLETE_EVENT, onLoaderComplete);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener(LOADER_COMPLETE_EVENT, onLoaderComplete);
      gsap.ticker.remove(ticker);
      unregisterModalLenis(lenis);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.scrollerProxy(document.body, {});
    };
  }, []);

  const value = useMemo(
    () => ({ progressRef, lenisRef }),
    []
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useScrollState() {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScrollState must be used within ScrollProvider");
  }
  return ctx;
}
