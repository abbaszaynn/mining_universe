import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function registerModalLenis(lenis: Lenis) {
  activeLenis = lenis;
}

export function unregisterModalLenis(lenis: Lenis) {
  if (activeLenis === lenis) activeLenis = null;
}

export function stopModalLenis() {
  activeLenis?.stop();
}

export function startModalLenis() {
  activeLenis?.start();
}
