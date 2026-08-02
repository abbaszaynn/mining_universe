"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ZoomableImage } from "@/components/shared/ZoomableImage";
import { useScrollLock } from "@/hooks/useScrollLock";
import { gsap } from "@/lib/gsap";
import type { GalleryImage } from "@/lib/types";

type GalleryMediaLightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

function fileNameFromUrl(url: string, title: string) {
  const ext = url.split(".").pop()?.split("?")[0] ?? "jpg";
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "image"}.${ext}`;
}

function IconButton({
  label,
  onClick,
  href,
  download,
  children,
  accent,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  children: ReactNode;
  accent?: boolean;
}) {
  const className =
    "flex h-9 w-9 items-center justify-center rounded-full text-graphite-500 transition hover:bg-graphite-950/[0.06] hover:text-graphite-950 " +
    (accent ? "hover:text-copper-500" : "");

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={label}
        title={label}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3v12M7 10l5 5 5-5M5 21h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GalleryMediaLightbox({
  images,
  initialIndex,
  onClose,
}: GalleryMediaLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [fullscreen, setFullscreen] = useState(false);
  const imageStageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const image = images[index];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useScrollLock(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (fullscreen) setFullscreen(false);
        else onClose();
      }
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen, go, onClose]);

  useEffect(() => {
    gsap.fromTo(
      "[data-lightbox-backdrop]",
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      "[data-lightbox-shell]",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const stage = imageStageRef.current;
    if (!stage) return;
    gsap.fromTo(
      stage,
      { opacity: 0.6 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [index]);

  const onTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const onTouchEnd = (clientX: number) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null || images.length < 2) return;
    const delta = clientX - start;
    if (Math.abs(delta) < 48) return;
    go(delta > 0 ? -1 : 1);
  };

  if (!image) return null;

  const downloadName = fileNameFromUrl(image.url, image.title);
  const hasMultiple = images.length > 1;

  if (fullscreen) {
    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex touch-none items-center justify-center overflow-hidden overscroll-none bg-black/92 p-4 backdrop-blur-md"
        onClick={() => setFullscreen(false)}
        role="dialog"
        aria-modal
        aria-label="Full screen image"
        data-lenis-prevent
      >
        <button
          type="button"
          onClick={() => setFullscreen(false)}
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-2xl font-light leading-none text-graphite-400 transition hover:text-bone-50 md:right-8 md:top-8"
          aria-label="Close full screen"
        >
          ✕
        </button>

        <div
          className="relative h-full w-full max-h-[94vh] max-w-[96vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <ZoomableImage key={image.url} src={image.url} alt={image.title} />
        </div>
      </div>,
      document.body
    );
  }

  const meta: { label: string; value: string }[] = [
    { label: "Company", value: image.companyName },
    ...(image.mineral ? [{ label: "Mineral", value: image.mineral }] : []),
    ...(image.properties
      ? [{ label: "Properties", value: image.properties }]
      : []),
  ];

  return (
    <div
      data-lightbox-backdrop
      data-lenis-prevent
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-bone-50/90 p-4 backdrop-blur-sm overscroll-none sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-labelledby="lightbox-title"
    >
      <div
        data-lightbox-shell
        className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_32px_100px_rgba(0,0,0,0.15)] md:flex-row md:max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full text-graphite-500 transition hover:bg-graphite-950/[0.06] hover:text-graphite-950"
          aria-label="Close preview"
        >
          ✕
        </button>

        <div className="relative flex flex-col bg-bone-50/50 md:w-[58%]">
          <div
            ref={imageStageRef}
            className="relative min-h-[40vh] flex-1 touch-pan-y md:min-h-[26rem]"
            onTouchStart={(e) => onTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
          >
            <Image
              src={image.url}
              alt={image.title}
              fill
              className="object-contain p-6 pb-14 md:p-10 md:pb-16"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-graphite-950 backdrop-blur-sm shadow-sm transition hover:bg-white hover:text-copper-500"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-graphite-950 backdrop-blur-sm shadow-sm transition hover:bg-white hover:text-copper-500"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}

            <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-4 md:bottom-4 md:px-5">
              {hasMultiple ? (
                <p className="font-mono text-[11px] text-graphite-500">
                  {index + 1} / {images.length}
                </p>
              ) : (
                <span />
              )}
              <div className="flex gap-1">
                <IconButton label="Full screen" onClick={() => setFullscreen(true)}>
                  <ExpandIcon />
                </IconButton>
                <IconButton
                  label="Download image"
                  href={image.url}
                  download={downloadName}
                  accent
                >
                  <DownloadIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        <aside className="flex max-h-[42vh] flex-col overflow-y-auto border-t border-graphite-950/[0.06] p-6 sm:p-8 md:max-h-none md:w-[42%] md:border-l md:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-copper-500/80">
            Image details
          </p>
          <h2
            id="lightbox-title"
            className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-graphite-950 md:text-2xl"
          >
            {image.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-graphite-600 md:text-[15px] md:leading-[1.75]">
            {image.description}
          </p>

          <dl className="mt-8 divide-y divide-graphite-950/[0.06]">
            {meta.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5 first:pt-0"
              >
                <dt className="text-xs font-medium text-graphite-500">{row.label}</dt>
                <dd className="text-sm text-graphite-950">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
