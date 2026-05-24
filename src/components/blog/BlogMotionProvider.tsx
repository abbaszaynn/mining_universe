"use client";

import type { ReactNode } from "react";

/** @deprecated Smooth scroll is initialized once in root ScrollProvider. */
export function BlogMotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
