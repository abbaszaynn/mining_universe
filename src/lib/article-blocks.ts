/**
 * Article bodies in `data.ts` are plain strings split on blank lines. Two
 * pieces of markup are supported, both deliberately minimal:
 *
 *  - `[label](/path)` inside a paragraph renders as an internal link
 *    (handled in BlogArticleExperience).
 *  - A block starting with `## ` is a question heading.
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
export type ArticleBlock =
  | { kind: "question"; text: string }
  | { kind: "paragraph"; text: string };

const QUESTION_PREFIX = /^##\s+/;

export function parseArticle(content: string): ArticleBlock[] {
  return content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) =>
      QUESTION_PREFIX.test(block)
        ? { kind: "question" as const, text: block.replace(QUESTION_PREFIX, "").trim() }
        : { kind: "paragraph" as const, text: block }
    );
}

/** Reduces `[label](/path)` to its label, for plain-text uses like schema. */
export function stripInlineLinks(text: string) {
  return text.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1");
}

/**
 * Question and answer pairs for FAQPage schema. An answer is every paragraph
 * between one question and the next. Paragraphs before the first question are
 * the article's lead-in and belong to no question, so they are skipped.
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
    } else if (question) {
      parts.push(block.text);
    }
  }
  flush();

  return items;
}
