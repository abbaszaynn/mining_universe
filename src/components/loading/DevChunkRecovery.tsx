"use client";

import { useEffect } from "react";

const RELOAD_KEY = "gos-chunk-reload";

export function DevChunkRecovery() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const reloadOnce = () => {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => {
      const message = event.message ?? "";
      if (
        message.includes("ChunkLoadError") ||
        message.includes("Loading chunk") ||
        message.includes("Failed to fetch dynamically imported module")
      ) {
        reloadOnce();
      }
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = String(event.reason ?? "");
      if (
        reason.includes("ChunkLoadError") ||
        reason.includes("Loading chunk") ||
        reason.includes("Failed to fetch dynamically imported module")
      ) {
        reloadOnce();
      }
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    sessionStorage.removeItem(RELOAD_KEY);
  }, []);

  return null;
}
