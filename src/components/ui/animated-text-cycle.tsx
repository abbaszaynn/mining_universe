"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

/**
 * Cycles one word inside an otherwise static sentence, animating the
 * container width so the surrounding copy settles rather than snapping.
 *
 * Adapted from the 21st.dev animated-text-cycle study. Changes made for this
 * codebase: a "use client" directive (required for hooks under the App
 * Router), typed variants, prefers-reduced-motion support, re-measurement once
 * the webfont has loaded, and the hardcoded `font-bold` removed so the word
 * inherits this site's own type weight.
 */
interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  // Measure the active word. The measuring copy carries the *same* classes as
  // the visible one, otherwise the width it reports would not match what is
  // actually rendered.
  useEffect(() => {
    const measure = () => {
      const el = measureRef.current?.children[currentIndex];
      if (el) setWidth(`${el.getBoundingClientRect().width}px`);
    };

    measure();

    // Figtree loads with `display: swap`, so a width measured against the
    // fallback face would be wrong the moment the real font swaps in.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [currentIndex, className]);

  // A rescheduled timeout, not setInterval. A throttled or backgrounded tab can
  // coalesce interval callbacks and then fire them in a burst, which makes a
  // cycler suddenly race through its words; a timeout that reschedules itself
  // after each change cannot stack up that way.
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearTimeout(timer);
  }, [currentIndex, interval, words.length]);

  const containerVariants: Variants = {
    hidden: {
      y: reduceMotion ? 0 : -18,
      opacity: 0,
      filter: reduceMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: reduceMotion ? 0.15 : 0.45, ease: "easeOut" },
    },
    exit: {
      y: reduceMotion ? 0 : 18,
      opacity: 0,
      filter: reduceMotion ? "blur(0px)" : "blur(8px)",
      transition: { duration: reduceMotion ? 0.12 : 0.32, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* A <span>, not a <div>: this sits inside a heading or paragraph, and a
          block element there is invalid HTML. The browser hoists it out of the
          <p>, the server and client trees then disagree, and hydration fails. */}
      {/* Hidden measurement copy — same classes as the visible word. */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={className}>
            {word}
          </span>
        ))}
      </span>

      <motion.span
        className="relative inline-block align-bottom"
        animate={{ width }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 150, damping: 18, mass: 1.1 }
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
