/**
 * Article bodies in `data.ts` are plain strings split on blank lines. Two
 * pieces of markup are supported, both deliberately minimal:
 *
 *  - `[label](/path)` inside a paragraph renders as an internal link
 *    (handled in BlogArticleExperience).
 *  - A block starting with `## ` is a question heading.
 *  - A block whose every line is `![caption](/path)` is a figure: one image
 *    renders full width, two or three render as a row. The caption doubles
 *    as the alt text. Only site-relative paths are accepted.
 *  - A block whose first line is `::facts` is a key-figures strip; each
 *    following line is `value | label`.
 *
 * Question headings exist for answer engines. The queries investors type are
 * questions ("can a foreigner own a mine in Pakistan"), and Google AI
 * Overviews, Gemini and Perplexity lift answers far more readily from a page
 * where the question is an actual heading with the answer directly under it
 * than from the same text buried mid-paragraph. The same pairs are emitted as
 * FAQPage structured data on the article page, via `articleFaqItems`.
 *
 * Shared by the server page (schema) and the client component (rendering), so
 * the two can never disagree about what counts as a question.
 */
export type ArticleFigureImage = { src: string; caption: string };
export type ArticleFact = { value: string; label: string };

export type ArticleBlock =
  | { kind: "question"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "figure"; images: ArticleFigureImage[] }
  | { kind: "facts"; items: ArticleFact[] };

const QUESTION_PREFIX = /^##\s+/;
const FIGURE_LINE = /^!\[([^\]]*)\]\((\/[^)\s]+)\)$/;
const FACTS_MARKER = "::facts";

function parseBlock(block: string): ArticleBlock {
  if (QUESTION_PREFIX.test(block)) {
    return { kind: "question", text: block.replace(QUESTION_PREFIX, "").trim() };
  }

  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);

  if (lines.length > 0 && lines.every((line) => FIGURE_LINE.test(line))) {
    return {
      kind: "figure",
      images: lines.map((line) => {
        const [, caption, src] = line.match(FIGURE_LINE)!;
        return { src, caption };
      }),
    };
  }

  if (lines[0] === FACTS_MARKER) {
    return {
      kind: "facts",
      items: lines.slice(1).map((line) => {
        const [value, ...rest] = line.split("|");
        return { value: value.trim(), label: rest.join("|").trim() };
      }),
    };
  }

  return { kind: "paragraph", text: block };
}

export function parseArticle(content: string): ArticleBlock[] {
  return content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map(parseBlock);
}

/** Reduces `[label](/path)` to its label, for plain-text uses like schema. */
export function stripInlineLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1");
}

/**
 * Question and answer pairs for FAQPage schema. An answer is every paragraph
 * between one question and the next. Paragraphs before the first question are
 * the article's lead-in and belong to no question, so they are skipped, and
 * figures and fact strips are never part of an answer.
 */
export function articleFaqItems(content: string) {
  const items: { question: string; answer: string }[] = [];
  let question: string | null = null;
  let parts: string[] = [];

  const flush = () => {
    if (question && parts.length) {
      items.push({ question, answer: stripInlineLinks(parts.join(" ")) });
    }
  };

  for (const block of parseArticle(content)) {
    if (block.kind === "question") {
      flush();
      question = block.text;
      parts = [];
    } else if (question && block.kind === "paragraph") {
      parts.push(block.text);
    }
  }
  flush();

  return items;
}
