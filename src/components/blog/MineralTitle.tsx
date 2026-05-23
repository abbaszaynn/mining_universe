import { cn } from "@/lib/utils";

type MineralTitleProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
};

export function MineralTitle({
  text,
  className,
  as: Tag = "h1",
}: MineralTitleProps) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-display)] font-semibold tracking-tight text-[#f0f4f7]",
        "text-balance leading-[1.12] [text-shadow:0_1px_0_rgba(212,175,55,0.28),0_4px_24px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="blog-title-word mr-[0.28em] inline-block last:mr-0"
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
