import Link from "next/link";
import { news } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { articlesLinkingTo } from "@/lib/related-articles";

/**
 * "Related reading" for concession and commodity pages: the articles that
 * already link to this page, linked back. Gives each article inbound links
 * from the deep pages it discusses (see lib/related-articles). Renders
 * nothing when no article mentions the page.
 */
export function RelatedReading({ path, subject }: { path: string; subject: string }) {
  const articles = articlesLinkingTo(path, news);
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-reading-heading" className="bg-bone-50 py-14 md:py-20">
      <div className="mx-auto max-w-[105rem] px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-copper-600">Related reading</p>
        <h2 id="related-reading-heading" className="mt-3 text-display-md tracking-[-0.03em] text-graphite-950">
          Articles on {subject}
        </h2>
        <ul className="mt-8 divide-y divide-graphite-950/10 border-y border-graphite-950/10">
          {articles.map((a) => (
            <li key={a.id}>
              <Link href={`/news/${a.id}`} className="group flex flex-col gap-1 py-5 md:flex-row md:items-baseline md:gap-8">
                <time dateTime={a.publishDate} className="shrink-0 text-sm text-graphite-500 md:w-40">
                  {formatDate(a.publishDate)}
                </time>
                <span className="text-lg text-graphite-950 decoration-copper-500/40 underline-offset-4 group-hover:underline">
                  {a.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
