/**
 * Animation engine boundary for this codebase:
 * - GSAP + ScrollTrigger (this file) is the house engine for anything scroll-driven
 *   or timeline-sequenced: section reveals, pinned/scrubbed scroll, the loader,
 *   blog scroll-progress/parallax, map camera moves.
 * - framer-motion is scoped narrowly to transient UI state where its declarative
 *   gesture/exit-animation model beats GSAP boilerplate: form field validation
 *   states, modal/lightbox mount-unmount, custom select/dropdown open-close.
 * Don't blur this line — if it scrolls, it's GSAP; if it enters/exits on user
 * interaction, it's framer-motion.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("gosOut", "0.23, 1, 0.32, 1");
CustomEase.create("gosDrawer", "0.32, 0.72, 0, 1");
CustomEase.create("gosInOut", "0.77, 0, 0.175, 1");

/** Canonical eases — mirrors the CSS vars in globals.css (--ease-out/--ease-drawer/--ease-in-out). */
export const EASES = {
  out: "gosOut",
  drawer: "gosDrawer",
  inOut: "gosInOut",
} as const;

export { gsap, ScrollTrigger };
