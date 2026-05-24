"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const MIN_SCALE = 1;
const MAX_SCALE = 5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ scale: 1, x: 0, y: 0 });
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const panRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(
    null
  );

  const applyTransform = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const { scale, x, y } = stateRef.current;
    inner.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }, []);

  const resetIfNeeded = useCallback(() => {
    if (stateRef.current.scale <= MIN_SCALE) {
      stateRef.current.scale = MIN_SCALE;
      stateRef.current.x = 0;
      stateRef.current.y = 0;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const rect = container.getBoundingClientRect();
      const pointerX = event.clientX - rect.left - rect.width / 2;
      const pointerY = event.clientY - rect.top - rect.height / 2;

      const prevScale = stateRef.current.scale;
      const nextScale = clamp(
        prevScale * (1 - event.deltaY * 0.0018),
        MIN_SCALE,
        MAX_SCALE
      );
      const ratio = nextScale / prevScale;

      stateRef.current.scale = nextScale;
      stateRef.current.x = pointerX - ratio * (pointerX - stateRef.current.x);
      stateRef.current.y = pointerY - ratio * (pointerY - stateRef.current.y);

      resetIfNeeded();
      applyTransform();
    };

    const touchDistance = (touches: TouchList) => {
      if (touches.length < 2) return 0;
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.hypot(dx, dy);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();
        pinchRef.current = {
          distance: touchDistance(event.touches),
          scale: stateRef.current.scale,
        };
        panRef.current = null;
        return;
      }

      if (event.touches.length === 1 && stateRef.current.scale > MIN_SCALE) {
        event.preventDefault();
        panRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
          originX: stateRef.current.x,
          originY: stateRef.current.y,
        };
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && pinchRef.current) {
        event.preventDefault();
        const distance = touchDistance(event.touches);
        if (!distance) return;
        const nextScale = clamp(
          (pinchRef.current.scale * distance) / pinchRef.current.distance,
          MIN_SCALE,
          MAX_SCALE
        );
        stateRef.current.scale = nextScale;
        resetIfNeeded();
        applyTransform();
        return;
      }

      if (event.touches.length === 1 && panRef.current) {
        event.preventDefault();
        const deltaX = event.touches[0].clientX - panRef.current.x;
        const deltaY = event.touches[0].clientY - panRef.current.y;
        stateRef.current.x = panRef.current.originX + deltaX;
        stateRef.current.y = panRef.current.originY + deltaY;
        applyTransform();
      }
    };

    const onTouchEnd = () => {
      pinchRef.current = null;
      panRef.current = null;
      resetIfNeeded();
      applyTransform();
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("touchcancel", onTouchEnd);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [applyTransform, resetIfNeeded]);

  useEffect(() => {
    stateRef.current = { scale: 1, x: 0, y: 0 };
    applyTransform();
  }, [src, applyTransform]);

  return (
    <div
      ref={containerRef}
      className={
        className ??
        "relative flex h-full w-full touch-none items-center justify-center overflow-hidden"
      }
      data-lenis-prevent
    >
      <div
        ref={innerRef}
        className="relative will-change-transform"
        style={{ transform: "translate3d(0px, 0px, 0) scale(1)" }}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1440}
          className="max-h-[94vh] max-w-[96vw] select-none object-contain"
          draggable={false}
          priority
        />
      </div>
    </div>
  );
}
