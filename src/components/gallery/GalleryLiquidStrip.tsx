"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

type GalleryLiquidStripProps = {
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
  /** Phase offset so each strip feels unique */
  phase?: number;
};

export function GalleryLiquidStrip({
  onClick,
  ariaLabel = "Navigate gallery",
  className,
  phase = 0,
}: GalleryLiquidStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(0);
  const targetHoverRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const reduceMotionRef = useRef(false);
  const phaseRef = useRef(phase);

  phaseRef.current = phase;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const hover = hoverRef.current;
      const p = phaseRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Slow boutique drift — no fast blob motion
      const speed = 0.00011 + hover * 0.00014;
      const drift = t * speed + p * 1.3;

      ctx.fillStyle = "#060608";
      ctx.fillRect(0, 0, w, h);

      // Vertical marble veins — soft grey bands
      const veinCount = 5;
      for (let i = 0; i < veinCount; i += 1) {
        const wave =
          Math.sin(drift * 0.9 + i * 1.45) * 0.5 +
          Math.sin(drift * 0.55 + i * 2.1 + p) * 0.3;
        const cx = w * (0.5 + wave * 0.42 + (mx - 0.5) * 0.12 * hover);
        const band = ctx.createLinearGradient(cx - w * 0.9, 0, cx + w * 0.9, 0);
        const peak = 0.1 + hover * 0.06 + i * 0.015;
        band.addColorStop(0, "rgba(6,6,8,0)");
        band.addColorStop(0.32, `rgba(28,28,32,${peak * 0.55})`);
        band.addColorStop(0.5, `rgba(48,48,54,${peak})`);
        band.addColorStop(0.68, `rgba(26,26,30,${peak * 0.5})`);
        band.addColorStop(1, "rgba(6,6,8,0)");
        ctx.fillStyle = band;
        ctx.fillRect(0, 0, w, h);
      }

      // Slow vertical flow — smoke columns
      const flowY = ((drift * 0.35) % 1) * h;
      for (let layer = 0; layer < 3; layer += 1) {
        const ly = flowY + layer * (h / 3) - h * 0.15;
        const flow = ctx.createLinearGradient(0, ly, 0, ly + h * 0.55);
        const a = 0.08 + hover * 0.05 + layer * 0.02;
        flow.addColorStop(0, "rgba(8,8,10,0)");
        flow.addColorStop(0.35, `rgba(36,36,40,${a})`);
        flow.addColorStop(0.55, `rgba(58,58,64,${a * 1.15})`);
        flow.addColorStop(0.75, `rgba(32,32,36,${a * 0.7})`);
        flow.addColorStop(1, "rgba(8,8,10,0)");
        ctx.fillStyle = flow;
        ctx.fillRect(0, 0, w, h);
      }

      // Hover: gentle pull toward cursor — marble swirl, not molecules
      if (hover > 0.04) {
        const hx = mx * w;
        const hy = my * h;
        const pull = ctx.createRadialGradient(hx, hy, 0, hx, hy, h * 0.55);
        pull.addColorStop(0, `rgba(72,72,78,${0.14 * hover})`);
        pull.addColorStop(0.45, `rgba(40,40,46,${0.08 * hover})`);
        pull.addColorStop(1, "rgba(6,6,8,0)");
        ctx.fillStyle = pull;
        ctx.fillRect(0, 0, w, h);
      }

      // Fine grain overlay
      ctx.globalAlpha = 0.04 + hover * 0.02;
      const grain = ctx.createLinearGradient(0, 0, w, h);
      grain.addColorStop(0, "#1a1a1e");
      grain.addColorStop(0.5, "#0c0c0e");
      grain.addColorStop(1, "#242428");
      ctx.fillStyle = grain;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
    },
    []
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
      targetHoverRef.current = 1;
    },
    []
  );

  const onPointerEnter = useCallback(() => {
    targetHoverRef.current = 1;
  }, []);

  const onPointerLeave = useCallback(() => {
    targetHoverRef.current = 0;
    mouseRef.current = { x: 0.5, y: 0.5 };
  }, []);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduceMotionRef.current) {
        draw(ctx, canvas.clientWidth, canvas.clientHeight, 0);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let raf = 0;
    const loop = (now: number) => {
      hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.04;
      if (!reduceMotionRef.current) {
        draw(ctx, canvas.clientWidth, canvas.clientHeight, now);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative shrink-0 overflow-hidden bg-[#060608] transition-opacity duration-700",
        "hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/40",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        aria-hidden
      />
    </button>
  );
}
