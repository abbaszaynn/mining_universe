"use client";

import Image from "next/image";
import { useCallback, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

export type GalleryTileVariant = "square" | "hero" | "tall" | "wide" | "masonry";

type GallerySpecimenTileProps = {
  image: GalleryImage;
  index: number;
  onClick: () => void;
  variant?: GalleryTileVariant;
  className?: string;
};

export function GallerySpecimenTile({
  image,
  index,
  onClick,
  variant = "square",
  className,
}: GallerySpecimenTileProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const label = String(index + 1).padStart(2, "0");

  const onMove = useCallback((event: PointerEvent<HTMLButtonElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -4, y: px * 5 });
  }, []);

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <button
      type="button"
      data-gal-tile
      data-gal-variant={variant}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1e] text-left",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[transform,box-shadow,border-color] duration-500",
        "hover:border-[#d4af37]/35 hover:shadow-[0_28px_90px_rgba(212,175,55,0.16)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]/50",
        "[transform-style:preserve-3d]",
        variant === "square" && "aspect-square",
        variant === "hero" && "aspect-[4/5] min-h-[22rem] sm:aspect-[3/4] md:min-h-[26rem]",
        variant === "tall" && "aspect-[3/4] sm:aspect-[2/3]",
        variant === "wide" && "aspect-[16/10] sm:aspect-[2/1]",
        variant === "masonry" && "mb-4 break-inside-avoid",
        className
      )}
      style={
        variant === "masonry"
          ? undefined
          : {
              transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }
      }
    >
      <div className="gal-tile-image relative h-full w-full overflow-hidden">
        <Image
          src={image.url}
          alt={image.title}
          fill
          className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.08]"
          sizes={
            variant === "hero"
              ? "(max-width: 1024px) 100vw, 50vw"
              : variant === "wide"
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/20 to-[#d4af37]/[0.03] opacity-80 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(212,175,55,0.08)_50%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-12 bg-[#030712]/80"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-12 border-b border-l border-[#d4af37]/20"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden
      />

      <span
        className="pointer-events-none absolute left-3 top-3 font-[family-name:var(--font-display)] text-xl font-bold text-[#d4af37]/25 transition group-hover:text-[#d4af37]/45 md:text-2xl"
        aria-hidden
      >
        {label}
      </span>

      <span className="pointer-events-none absolute inset-3 rounded-xl border border-white/0 transition duration-500 group-hover:border-[#d4af37]/25" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-3 md:p-4">
        {image.mineral && (
          <span className="inline-block rounded-full border border-[#d4af37]/25 bg-[#030712]/60 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur-sm md:text-[10px]">
            {image.mineral}
          </span>
        )}
        <p className="mt-2 line-clamp-2 font-[family-name:var(--font-display)] text-xs font-medium leading-snug text-[#f0f4f7] md:text-sm">
          {image.title}
        </p>
      </div>

      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#030712]/70 text-sm text-[#d4af37] opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
        ↗
      </span>
    </button>
  );
}
