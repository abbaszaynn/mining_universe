"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { markCanvasReady } from "@/lib/app-ready";

export function SceneReadyMarker() {
  const frames = useRef(0);
  const marked = useRef(false);

  useFrame(() => {
    if (marked.current) return;
    frames.current += 1;
    if (frames.current >= 2) {
      marked.current = true;
      markCanvasReady();
    }
  });

  return null;
}
