"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SquareButton } from "@/components/ui/SquareButton";

/** Ordered roughly by commercial intent: what we do, how to buy in, what we
 *  hold, then supporting material. /invest sits high deliberately — it's the
 *  highest-value page on the site and was previously reachable only from the
 *  footer. */
const NAV_ITEMS = [
  // No "Home" entry: the logo already links to it, and at 11 items the nav
  // outgrew the header bar at 1280px. Dropping the one item that duplicated
  // an existing link was cheaper than shrinking the logo or the CTA.
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/invest", label: "Invest" },
  { href: "/concessions", label: "Concessions" },
  { href: "/commodities", label: "Commodities" },
  { href: "/map", label: "Map" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "Press" },
  { href: "/documents", label: "Documents" },
  { href: "/faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || menuOpen 
            ? "bg-bone-50/95 backdrop-blur-md shadow-sm" 
            : "bg-bone-50/70 backdrop-blur-sm xl:bg-transparent xl:backdrop-blur-none"
        )}
      >
        <div className="mx-auto flex max-w-[105rem] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            aria-label="Durr & Zircon Consortium home"
            className="shrink-0 transition-opacity duration-base ease-out hover:opacity-80"
          >
            <img src="/images/gbmines-logo.png" alt="GBMINES Logo" className="h-8 md:h-12 lg:h-14 w-auto" />
          </Link>

          {/* Centred segmented nav — plain white plate, square corners.
              Shown from xl, not lg: at 11 items the nav needs ~912px, which
              at 1024px leaves nothing for the logo and CTA and visibly
              crushes both. Between 1024 and 1279 the hamburger handles it. */}
          <nav
            className="hidden items-center bg-white px-1.5 py-1.5 xl:flex shadow-sm rounded-sm"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              // Match on a path-segment boundary, not a bare prefix. A plain
              // startsWith lights up "Invest" on /investor-desk, since
              // "/investor-desk".startsWith("/invest") is true. The prefix
              // form is still needed so /concessions/[slug] activates
              // Concessions. No "/" special case: the logo handles home, so
              // NAV_ITEMS has no root entry to compare against.
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    // px-3 rather than px-3.5: at 11 items the extra 4px per
                    // item is what tipped the header bar past its container
                    // width at 1280, a very common laptop size.
                    "inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-[0.9375rem] leading-none transition-colors duration-base ease-out",
                    active
                      ? "text-graphite-950 font-medium"
                      : "text-graphite-500 hover:text-graphite-950"
                  )}
                >
                  {active && (
                    <span className="h-2 w-2 bg-copper-500" aria-hidden />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <SquareButton
              href="/investor-desk"
              tone="accent"
              className="whitespace-nowrap"
            >
              Speak with us
            </SquareButton>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center bg-white text-graphite-950 shadow-sm xl:hidden rounded-sm"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="relative h-3.5 w-4">
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-full bg-current transition-all duration-base ease-out",
                    menuOpen ? "top-[6px] rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[6px] h-0.5 w-full bg-current transition-opacity duration-base ease-out",
                    menuOpen ? "opacity-0" : "opacity-100"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-0.5 w-full bg-current transition-all duration-base ease-out",
                    menuOpen ? "top-[6px] -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-copper-500 xl:hidden pt-24"
          >
            <nav
              className="flex h-full flex-col px-6 overflow-y-auto pb-10"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 + index * 0.03,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/20 py-3.5 text-xl font-medium tracking-[-0.02em] text-bone-50 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
