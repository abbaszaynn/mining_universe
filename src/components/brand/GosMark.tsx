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
      <rect width="32" height="32" rx="7" fill="#030712" />
      <path d="M16 4.5 25.5 19 16 14.5 6.5 19Z" fill="#d4af37" />
      <path d="M6.5 19h19L16 27.5Z" fill="#8a7330" />
      <path
        d="M16 14.5 25.5 19 16 19 6.5 19Z"
        fill="#f0e6c8"
        opacity="0.35"
      />
      <circle cx="16" cy="13.5" r="1.35" fill="#f5ecd4" />
    </svg>
  );
}
