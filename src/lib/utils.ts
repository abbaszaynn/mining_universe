import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to be told about our custom font-size keys, otherwise it
 * reads `text-display-xl` as a text *colour* and silently drops it whenever a
 * real colour like `text-graphite-950` appears in the same className.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-xl", "display-lg", "display-md", "marquee"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * First sentence of a longer string, including its own terminal punctuation.
 * `text.split(". ")[0] + "."` looks equivalent but doubles the period
 * whenever the text is a single sentence with no ". " to split on (the
 * split then returns the whole string, period included, and the template
 * appends a second one) — this matches the actual sentence boundary
 * instead of assuming there's a second sentence to cut off.
 */
export function firstSentence(text: string) {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

/**
 * Spells a small count as a word, so headline copy can be derived from the
 * data instead of hardcoded. "Seven commodities" and "ten concessions" were
 * both written by hand and both went stale the moment the underlying arrays
 * changed: the eighth commodity shipped while three pages still said seven.
 * Falls back to digits above twenty, where prose would read worse anyway.
 */
export function spellOutCount(n: number) {
  return NUMBER_WORDS[n] ?? String(n);
}

/** Same, capitalised, for the start of a sentence or heading. */
export function spellOutCountCapitalised(n: number) {
  const word = spellOutCount(n);
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
