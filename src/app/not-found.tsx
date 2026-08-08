import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The page you requested could not be found on Durr & Zircon Consortium.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#030712] px-6 text-center text-[#e2e8f0]">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#d4af37]/90">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#f0f4f7] md:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[#94a3b8]">
        This route is not part of the Durr & Zircon Consortium site. Return to the homepage
        or explore our mining operators.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#d4af37] px-8 py-3 text-sm font-semibold text-[#0f172a] transition hover:brightness-110"
      >
        Back to home
      </Link>
    </main>
  );
}
