"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { MiningScene } from "./MiningScene";
import type { MutableRefObject } from "react";

type CanvasLayerProps = {
  progressRef: MutableRefObject<number>;
};

export function CanvasLayer({ progressRef }: CanvasLayerProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 9], fov: 42, near: 0.1, far: 100 }}
        >
          <MiningScene progressRef={progressRef} />
        </Canvas>
      </Suspense>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030712]/92 via-[#030712]/35 via-50% to-[#030712]/95"
        aria-hidden
      />
    </div>
  );
}
