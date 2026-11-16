import Image from "next/image";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Row of official social profile links. Each brand icon sits on a cream
 * disc so the full-colour marks read cleanly on both the copper footer and
 * the cream contact page.
 */
export function SocialLinks({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-9 w-9 p-1.5" : "h-11 w-11 p-2";
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)} aria-label="Durr & Zircon on social media">
      {SITE.social.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`${s.name} (opens in a new tab)`}
            title={s.name}
            className={cn(
              "flex items-center justify-center rounded-full bg-bone-50 shadow-sm ring-1 ring-graphite-950/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-500",
              box
            )}
          >
            <Image src={s.icon} alt="" width={64} height={64} className="h-full w-full object-contain" />
          </a>
        </li>
      ))}
    </ul>
  );
}
