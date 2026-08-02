import Link from "next/link";
import { cn } from "@/lib/utils";

type SquareButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
  tone?: "light" | "accent" | "dark";
  className?: string;
};

/**
 * Sharp-cornered button with a small square bullet and crop-mark brackets that
 * register on hover — deliberately square (no radius), which is what keeps it
 * reading as engineered rather than generic-web-rounded.
 */
export function SquareButton({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  target,
  rel,
  tone = "light",
  className,
}: SquareButtonProps) {
  const bracket =
    "pointer-events-none absolute h-2 w-2 opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100";
  const bracketColor =
    tone === "accent" ? "border-copper-500" : "border-graphite-950/40";

  const innerContent = (
    <>
      <span
        className={cn(
          "inline-flex items-center gap-2.5 px-4 py-3.5 text-base leading-none transition-colors duration-base ease-out",
          tone === "light" && "bg-bone-50 text-graphite-950 hover:bg-white",
          tone === "accent" && "bg-copper-500 text-bone-50 hover:bg-copper-400",
          tone === "dark" && "bg-graphite-950 text-bone-50 hover:bg-graphite-900",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "h-2 w-2 shrink-0",
            tone === "light" ? "bg-copper-500" : "bg-bone-50"
          )}
          aria-hidden
        />
        {children}
      </span>

      {/* Registration marks — four L-shaped corners, revealed on hover. */}
      <span className={cn(bracket, bracketColor, "-left-1.5 -top-1.5 border-l border-t")} aria-hidden />
      <span className={cn(bracket, bracketColor, "-right-1.5 -top-1.5 border-r border-t")} aria-hidden />
      <span className={cn(bracket, bracketColor, "-bottom-1.5 -left-1.5 border-b border-l")} aria-hidden />
      <span className={cn(bracket, bracketColor, "-bottom-1.5 -right-1.5 border-b border-r")} aria-hidden />
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        target={target} 
        rel={rel} 
        className={cn("group relative inline-flex", className)}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("group relative inline-flex", className)}
    >
      {innerContent}
    </button>
  );
}

