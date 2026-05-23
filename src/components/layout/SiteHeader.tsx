"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "Companies" },
  { href: "/map", label: "Map" },
  { href: "/news", label: "Blogs" },
  { href: "/documents", label: "Documents" },
  { href: "/contact", label: "Contact" },
] as const;

type SiteHeaderProps = {
  variant?: "overlay" | "solid";
};

export function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isOverlay = variant === "overlay";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const showBar = !isOverlay || scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          showBar
            ? "border-b border-white/[0.06] bg-[#030712]/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-6 md:h-[4.75rem] md:px-10">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label="GOS home"
          >
            <span
              className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 shadow-[0_0_24px_rgba(212,175,55,0.18)] transition group-hover:border-[#d4af37]/60 group-hover:shadow-[0_0_32px_rgba(212,175,55,0.28)]"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[#f0f4f7] md:text-lg">
                GOS
              </span>
              <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.28em] text-[#64748b] sm:block">
                Game of Stones
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1.5 backdrop-blur-md lg:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    active
                      ? "text-[#f0f4f7]"
                      : "text-[#94a3b8] hover:text-[#e2e8f0]"
                  )}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      aria-hidden
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/investor-desk"
              className="hidden rounded-full bg-[#d4af37] px-5 py-2 text-sm font-semibold text-[#0f172a] shadow-[0_0_28px_rgba(212,175,55,0.22)] transition hover:brightness-110 md:inline-flex"
            >
              Investor desk
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#e2e8f0] transition hover:border-[#d4af37]/35 lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative h-3.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300",
                    menuOpen ? "top-[6px] rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[6px] h-0.5 w-full rounded-full bg-current transition-opacity duration-300",
                    menuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300",
                    menuOpen ? "top-[6px] -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 bg-[#030712]/90 backdrop-blur-xl transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <nav
          className="flex h-full flex-col justify-center px-8 pt-20"
          aria-label="Mobile navigation"
        >
          <ul className="space-y-2">
            {NAV_ITEMS.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li
                  key={item.href}
                  className="translate-y-0 opacity-100 transition-all duration-500"
                  style={{
                    transitionDelay: menuOpen ? `${index * 45}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-2xl border px-5 py-4 text-lg font-medium transition",
                      active
                        ? "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#f0f4f7]"
                        : "border-white/10 bg-white/[0.03] text-[#94a3b8] hover:border-[#d4af37]/20 hover:text-[#e2e8f0]"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37]">
                        Active
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/investor-desk"
            className="mt-8 inline-flex justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0f172a]"
          >
            Investor desk
          </Link>
        </nav>
      </div>
    </>
  );
}
