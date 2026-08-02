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
  phase?: number;
  mirror?: boolean;
};

type FeatherSpec = {
  nx: number;
  ny: number;
  lengthRatio: number;
  widthRatio: number;
  baseAngle: number;
  curveA: number;
  curveB: number;
  curveC: number;
  alpha: number;
  barbSpread: number;
  animOffset: number;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function buildFeathers(stripPhase: number, height: number): FeatherSpec[] {
  const count = Math.max(5, Math.min(12, Math.floor(height / 70)));
  return Array.from({ length: count }, (_, i) => {
    const s = stripPhase * 137.5 + i * 23.17 + 1;
    return {
      nx: 0.12 + seededRandom(s) * 0.76,
      ny: seededRandom(s + 1.3) * 0.78,
      lengthRatio: 0.28 + seededRandom(s + 2.1) * 0.52,
      widthRatio: 0.45 + seededRandom(s + 3.7) * 0.65,
      baseAngle: (seededRandom(s + 4.2) - 0.5) * 0.42,
      curveA: 0.28 + seededRandom(s + 5.1) * 0.38,
      curveB: 0.55 + seededRandom(s + 6.4) * 0.35,
      curveC: 0.12 + seededRandom(s + 7.2) * 0.22,
      alpha: 0.58 + seededRandom(s + 8.5) * 0.38,
      barbSpread: 0.18 + seededRandom(s + 9.1) * 0.22,
      animOffset: seededRandom(s + 10.7) * Math.PI * 2,
    };
  });
}

function drawFeatherVane(
  ctx: CanvasRenderingContext2D,
  length: number,
  width: number,
  hover: number,
  spec: FeatherSpec
) {
  const gradient = ctx.createLinearGradient(-width / 2, 0, width / 2, 0);
  gradient.addColorStop(0, "#ffffff");
  gradient.addColorStop(0.22, "#fafaf9");
  gradient.addColorStop(0.46, `rgba(240, 240, 235, ${0.8 + hover * 0.1})`);
  gradient.addColorStop(0.54, `rgba(245, 245, 240, ${0.75 + hover * 0.1})`);
  gradient.addColorStop(0.78, "#f0f0ee");
  gradient.addColorStop(1, "#e8e8e5");

  const a = spec.curveA;
  const b = spec.curveB;
  const c = spec.curveC;

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(width * a, length * b, width * c, length * 0.68);
  ctx.quadraticCurveTo(width * (c * 0.7), length * 0.92, 0, length);
  ctx.quadraticCurveTo(-width * (c * 0.85), length * 0.9, -width * (a * 0.95), length * 0.62);
  ctx.quadraticCurveTo(-width * (a * 1.1), length * (b * 0.55), 0, 0);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = `rgba(200, 200, 195, ${0.8 + hover * 0.1})`;
  ctx.lineWidth = Math.max(0.8, width * 0.055);
  ctx.beginPath();
  ctx.moveTo(0, length * 0.03);
  ctx.lineTo(0, length * 0.97);
  ctx.stroke();

  const barbCount = Math.max(4, Math.floor(length / (8 + spec.barbSpread * 6)));
  for (let bIdx = 0; bIdx < barbCount; bIdx += 1) {
    const by = length * 0.1 + (bIdx / barbCount) * length * 0.82;
    const spread = width * (spec.barbSpread + (bIdx % 4) * 0.025);
    ctx.strokeStyle = `rgba(210, 210, 205, ${0.3 + hover * 0.1})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, by);
    ctx.lineTo(spread, by + 1.8 + (bIdx % 2));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, by);
    ctx.lineTo(-spread * 0.92, by + 2.2 - (bIdx % 2) * 0.5);
    ctx.stroke();
  }
}

export function GalleryLiquidStrip({
  onClick,
  ariaLabel = "Navigate gallery",
  className,
  phase = 0,
  mirror = false,
}: GalleryLiquidStripProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(0);
  const targetHoverRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const reduceMotionRef = useRef(false);
  const phaseRef = useRef(phase);
  const mirrorRef = useRef(mirror);
  const feathersRef = useRef<FeatherSpec[]>([]);

  phaseRef.current = phase;
  mirrorRef.current = mirror;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const hover = hoverRef.current;
      const mirrored = mirrorRef.current ? -1 : 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Always-on slow drift; hover adds a modest boost only
      const idleSpeed = 0.000045;
      const hoverSpeed = hover * 0.000028;
      const time = t * (idleSpeed + hoverSpeed);

      ctx.fillStyle = "#f8f8f7"; // bone-50 equivalent
      ctx.fillRect(0, 0, w, h);

      const feathers = feathersRef.current;

      for (const spec of feathers) {
        const sway =
          Math.sin(time * 1.15 + spec.animOffset) * 0.035 +
          Math.sin(time * 0.72 + spec.animOffset * 1.6) * 0.022;
        const breathe = Math.sin(time * 0.55 + spec.animOffset * 0.8) * h * 0.006;

        const hoverSway = hover * 0.025 * Math.sin(time * 1.8 + spec.animOffset);
        const mouseAngle = (mx - 0.5) * 0.035 * hover;
        const angle =
          spec.baseAngle * mirrored + mirrored * (sway + hoverSway) + mouseAngle;

        const driftX =
          Math.sin(time * 0.85 + spec.animOffset) * w * 0.014 +
          (mx - 0.5) * w * 0.018 * hover;
        const driftY =
          Math.cos(time * 0.62 + spec.animOffset * 1.2) * h * 0.01 + breathe;

        const cx = w * spec.nx + driftX;
        const cy = h * spec.ny + driftY;
        const length = h * spec.lengthRatio;
        const width = w * spec.widthRatio;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.globalAlpha = spec.alpha;
        drawFeatherVane(ctx, length, width, hover, spec);
        ctx.restore();
      }

      if (hover > 0.04) {
        const sheen = ctx.createRadialGradient(
          mx * w,
          my * h,
          0,
          mx * w,
          my * h,
          h * 0.4
        );
        sheen.addColorStop(0, `rgba(255, 255, 255, ${0.4 * hover})`);
        sheen.addColorStop(1, "rgba(248, 248, 247, 0)");
        ctx.fillStyle = sheen;
        ctx.fillRect(0, 0, w, h);
      }

      const edge = ctx.createLinearGradient(
        mirrored > 0 ? w : 0,
        0,
        mirrored > 0 ? 0 : w,
        0
      );
      edge.addColorStop(0, "rgba(248, 248, 247, 0)");
      edge.addColorStop(1, "rgba(235, 235, 230, 0.6)");
      ctx.fillStyle = edge;
      ctx.fillRect(0, 0, w, h);
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
      feathersRef.current = buildFeathers(phaseRef.current, rect.height);
      if (reduceMotionRef.current) {
        draw(ctx, canvas.clientWidth, canvas.clientHeight, 0);
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let raf = 0;
    const loop = (now: number) => {
      hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.025;
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
        "group relative min-h-0 overflow-hidden bg-bone-50 transition-opacity duration-700",
        "hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-500/35",
        className
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </button>
  );
}
