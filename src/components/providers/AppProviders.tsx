"use client";

import type { ReactNode } from "react";
import { ScrollProvider } from "@/context/scroll-context";
import { DevChunkRecovery } from "@/components/loading/DevChunkRecovery";
import { LoadingProvider } from "@/components/loading/LoadingProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <ScrollProvider>
        <DevChunkRecovery />
        {children}
      </ScrollProvider>
    </LoadingProvider>
  );
}
