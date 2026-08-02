import { cn } from "@/lib/utils";

type GridLinesProps = {
  /** "light" draws dark hairlines (for pale sections), "dark" draws light ones. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * The vertical column rules that run the full height of every section and give
 * the page its drafting-table structure. Five 2px lines, edge-to-edge, with the
 * inner three hidden on small screens so mobile keeps just the outer frame.
 */
export function GridLines({ tone = "light", className }: GridLinesProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex justify-between",
        className
      )}
      aria-hidden
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-full w-[2px]",
            tone === "light" ? "bg-graphite-950/[0.07]" : "bg-white/[0.14]",
            i > 0 && i < 4 && "hidden md:block"
          )}
        />
      ))}
    </div>
  );
}
