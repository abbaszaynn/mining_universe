"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Particle spiral, adapted from the 21st.dev component.
 *
 * Changes from the original, all of which it needed to run here:
 * - Sizes to its container (ResizeObserver) instead of `window`, and never
 *   touches `window` during render — the original crashed on the server.
 * - Draws on a transparent canvas rather than painting itself black, so it can
 *   sit over the light hero.
 * - Uses a local seeded RNG. The original reassigned the global `Math.random`,
 *   and built its star field twice over — 10,000 particles where it intended
 *   5,000.
 * - Keeps the canvas backing store in the container's aspect ratio; the
 *   original forced a square buffer onto a non-square element, stretching it.
 * - Pauses off-screen and honours prefers-reduced-motion.
 */

type SpiralAnimationProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Particle colour. Defaults to near-black for light backgrounds. */
  color?: string;
  /** Spiral centre as a fraction of the container, 0–1. */
  centerX?: number;
  centerY?: number;
  /** Multiplier on the projected drawing, for fitting the available space. */
  scale?: number;
  particleCount?: number;
};

/** Deterministic RNG so the field is identical on every mount. */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const CAMERA_Z = -400;
const CAMERA_TRAVEL = 3400;
const START_DOT_Y_OFFSET = 28;
const VIEW_ZOOM = 100;
const TRAIL_LENGTH = 80;
const CHANGE_EVENT_TIME = 0.32;

const constrain = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const mapRange = (v: number, a1: number, b1: number, a2: number, b2: number) =>
  a2 + (b2 - a2) * ((v - a1) / (b1 - a1));
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const ease = (p: number, g: number) =>
  p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g);

function easeOutElastic(x: number) {
  const c4 = (2 * Math.PI) / 4.5;
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
}

function spiralPath(p: number) {
  const t = ease(constrain(1.2 * p, 0, 1), 1.8);
  const theta = 2 * Math.PI * 6 * Math.sqrt(t);
  const r = 170 * Math.sqrt(t);
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) + START_DOT_Y_OFFSET };
}

type Star = {
  dx: number;
  dy: number;
  spiralLocation: number;
  strokeWeightFactor: number;
  z: number;
  angle: number;
  distance: number;
  rotationDirection: number;
  expansionRate: number;
  finalScale: number;
};

function createStars(count: number, rnd: () => number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rnd() * Math.PI * 2;
    const distance = 30 * rnd() + 15;
    const spiralLocation = (1 - Math.pow(1 - rnd(), 3)) / 1.3;
    let z = CAMERA_Z * 0.5 + rnd() * (CAMERA_TRAVEL + CAMERA_Z - CAMERA_Z * 0.5);
    z = lerp(z, CAMERA_TRAVEL / 2, 0.3 * spiralLocation);

    stars.push({
      angle,
      distance,
      rotationDirection: rnd() > 0.5 ? 1 : -1,
      expansionRate: 1.2 + rnd() * 0.8,
      finalScale: 0.7 + rnd() * 0.6,
      dx: distance * Math.cos(angle),
      dy: distance * Math.sin(angle),
      spiralLocation,
      z,
      strokeWeightFactor: Math.pow(rnd(), 2),
    });
  }
  return stars;
}

export function SpiralAnimation({
  className,
  style,
  color = "rgba(28,25,22,0.85)",
  centerX = 0.5,
  centerY = 0.5,
  scale = 1,
  particleCount = 2600,
}: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.innerWidth < 768 ? Math.round(particleCount * 0.45) : particleCount;
    const stars = createStars(count, seededRandom(1234));

    const state = { t: reduceMotion ? 0.62 : 0 };
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const projectDot = (
      px: number,
      py: number,
      pz: number,
      sizeFactor: number,
      newCameraZ: number
    ) => {
      if (pz <= newCameraZ) return;
      const depth = pz - newCameraZ;
      const x = (VIEW_ZOOM * px) / depth;
      const y = (VIEW_ZOOM * py) / depth;
      const r = (400 * sizeFactor) / depth;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(r * 0.06, 0.35), 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      if (!w || !h) return;
      const time = state.t;

      // Transparent, not black — the hero shows through.
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w * centerX, h * centerY);
      ctx.scale(scale, scale);

      const t1 = constrain(mapRange(time, 0, CHANGE_EVENT_TIME + 0.25, 0, 1), 0, 1);
      const t2 = constrain(mapRange(time, CHANGE_EVENT_TIME, 1, 0, 1), 0, 1);
      const newCameraZ = CAMERA_Z + ease(Math.pow(t2, 1.2), 1.8) * CAMERA_TRAVEL;

      ctx.rotate(-Math.PI * ease(t2, 2.7));
      ctx.fillStyle = color;

      // Leading trail
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const f = mapRange(i, 0, TRAIL_LENGTH, 1.1, 0.1);
        const sw = (1.3 * (1 - t1) + 3 * Math.sin(Math.PI * t1)) * f;
        const pos = spiralPath(t1 - 0.00015 * i);
        const bounce = Math.sin(time * Math.PI * 2) * 0.02;
        ctx.beginPath();
        ctx.arc(pos.x * (1 + bounce), pos.y * (1 + bounce), Math.max(sw / 2, 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      // Star field
      for (const s of stars) {
        const q = t1 - s.spiralLocation;
        if (q <= 0) continue;

        const sp = spiralPath(s.spiralLocation);
        const p = constrain(4 * q, 0, 1);

        let sx: number;
        let sy: number;
        if (p < 0.3) {
          const e = lerp(p, Math.pow(p, 2), p / 0.3) / 0.3;
          sx = lerp(sp.x, sp.x + s.dx * 0.3, e);
          sy = lerp(sp.y, sp.y + s.dy * 0.3, e);
        } else if (p < 0.7) {
          const m = (p - 0.3) / 0.4;
          const curve = Math.sin(m * Math.PI) * s.rotationDirection * 1.5;
          sx = lerp(sp.x + s.dx * 0.3, sp.x + s.dx * 0.7, m) + -s.dy * 0.4 * curve * m;
          sy = lerp(sp.y + s.dy * 0.3, sp.y + s.dy * 0.7, m) + s.dx * 0.4 * curve * m;
        } else {
          const f = (p - 0.7) / 0.3;
          const dist = s.distance * s.expansionRate * 1.5;
          const a = s.angle + 1.2 * s.rotationDirection * f * Math.PI;
          sx = lerp(sp.x + s.dx * 0.7, sp.x + dist * Math.cos(a), easeOutElastic(f));
          sy = lerp(sp.y + s.dy * 0.7, sp.y + dist * Math.sin(a), easeOutElastic(f));
        }

        const sizeMul = p < 0.6 ? 1 + p * 0.2 : lerp(1.2, s.finalScale, (p - 0.6) / 0.4);
        projectDot(
          ((s.z - CAMERA_Z) * sx) / VIEW_ZOOM,
          ((s.z - CAMERA_Z) * sy) / VIEW_ZOOM,
          s.z,
          8.5 * s.strokeWeightFactor * sizeMul,
          newCameraZ
        );
      }

      // Origin marker
      if (time > CHANGE_EVENT_TIME) {
        projectDot(0, (CAMERA_Z * START_DOT_Y_OFFSET) / VIEW_ZOOM, CAMERA_TRAVEL, 2.5, newCameraZ);
      }

      ctx.restore();
    };

    resize();
    render();

    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(wrap);

    if (reduceMotion) {
      return () => ro.disconnect();
    }

    const tween = gsap.to(state, {
      t: 1,
      duration: 15,
      repeat: -1,
      ease: "none",
      onUpdate: render,
    });

    // Don't burn frames once the hero has scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? tween.play() : tween.pause()),
      { threshold: 0 }
    );
    io.observe(wrap);

    return () => {
      ro.disconnect();
      io.disconnect();
      tween.kill();
    };
  }, [color, centerX, centerY, scale, particleCount]);

  return (
    <div ref={wrapRef} className={cn("relative", className)} style={style}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
