import { cn } from "@/lib/utils";

type GosMarkProps = {
  className?: string;
  size?: number;
};

export function GosMark({ className, size = 36 }: GosMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="gos-mark-tile" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a1120" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>
        <linearGradient id="gos-mark-facet-top" x1="16" y1="4.5" x2="16" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f5e6a8" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8963a" />
        </linearGradient>
        <linearGradient id="gos-mark-facet-bottom" x1="16" y1="19" x2="16" y2="27.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8a7330" />
          <stop offset="100%" stopColor="#4a3e1a" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#gos-mark-tile)" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        fill="none"
        stroke="#d4af37"
        strokeOpacity="0.15"
      />
      <path d="M16 4.5 25.5 19 16 14.5 6.5 19Z" fill="url(#gos-mark-facet-top)" />
      <path d="M6.5 19h19L16 27.5Z" fill="url(#gos-mark-facet-bottom)" />
      <path
        d="M16 14.5 25.5 19 16 19 6.5 19Z"
        fill="#fff6dd"
        opacity="0.3"
      />
      <path
        d="M16 4.5 16 14.5 6.5 19Z"
        fill="#ffffff"
        opacity="0.08"
      />
      <circle cx="16" cy="13.5" r="1.35" fill="#fff6dd" />
    </svg>
  );
}
