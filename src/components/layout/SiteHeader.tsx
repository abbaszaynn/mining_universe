"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SquareButton } from "@/components/ui/SquareButton";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/concessions", label: "Concessions" },
  { href: "/commodities", label: "Commodities" },
  { href: "/map", label: "Map" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "Press" },
  { href: "/documents", label: "Documents" },
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
            : "bg-bone-50/70 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
        )}
      >
        <div className="mx-auto flex max-w-[105rem] items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-5">
          <Link
            href="/"
            aria-label="Durr & Zircon Consortium home"
            className="transition-opacity duration-base ease-out hover:opacity-80"
          >
            <img src="/images/gbmines-logo.png" alt="GBMINES Logo" className="h-8 md:h-12 lg:h-14 w-auto" />
          </Link>

          {/* Centred segmented nav — plain white plate, square corners */}
          <nav
            className="hidden items-center bg-white px-1.5 py-1.5 lg:flex shadow-sm rounded-sm"
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
                    "inline-flex items-center gap-2 px-3.5 py-2 text-[0.9375rem] leading-none transition-colors duration-base ease-out",
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

          <div className="flex items-center gap-3">
            <SquareButton href="/investor-desk" tone="accent" className="hidden md:inline-flex">
              Speak with us
            </SquareButton>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center bg-white text-graphite-950 shadow-sm lg:hidden rounded-sm"
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
            className="fixed inset-0 z-40 bg-copper-500 lg:hidden pt-24"
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
