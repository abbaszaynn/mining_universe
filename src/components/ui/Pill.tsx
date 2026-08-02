import { cn } from "@/lib/utils";

type PillProps = {
  children: React.ReactNode;
  tone?: "sand" | "outline" | "onDark";
  className?: string;
};

/** Small uppercase eyebrow capsule that labels a section. */
export function Pill({ children, tone = "sand", className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3.5 py-2.5 text-xs uppercase leading-none tracking-[-0.02em]",
        tone === "sand" && "bg-sand-100 text-copper-700",
        tone === "outline" && "border border-graphite-950/15 text-graphite-500",
        tone === "onDark" && "bg-white/10 text-bone-100",
        className
      )}
    >
      {children}
    </span>
  );
}
