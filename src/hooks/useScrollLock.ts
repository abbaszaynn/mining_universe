"use client";

import { useEffect } from "react";
import { startModalLenis, stopModalLenis } from "@/lib/modal-scroll";

export function useScrollLock(active = true) {
  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    stopModalLenis();

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      startModalLenis();
    };
  }, [active]);
}
