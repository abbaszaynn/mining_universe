import Link from "next/link";
import Image from "next/image";
import { formatDate, cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

type BlogCardProps = {
  article: NewsArticle;
  companyName?: string;
  className?: string;
};

export function BlogCard({ article, companyName, className }: BlogCardProps) {
  return (
    <Link
      href={`/news/${article.id}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-graphite-950/10 bg-white transition duration-500 hover:-translate-y-1 hover:border-copper-500/35 hover:shadow-[0_24px_80px_rgba(0,0,0,0.08)]",
        className
      )}
      aria-label={`Read ${article.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-graphite-950/20 to-transparent transition duration-500 group-hover:from-graphite-950/90" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        {companyName && (
          <span className="absolute left-4 top-4 rounded-full border border-copper-500/30 bg-bone-50/80 px-3 py-1 text-xs font-medium text-copper-500 backdrop-blur-sm">
            {companyName}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time
          dateTime={article.publishDate}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-graphite-600"
        >
          {formatDate(article.publishDate)}
        </time>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-graphite-950 transition group-hover:text-copper-500 md:text-2xl">
          {article.title}
        </h2>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-graphite-600 md:text-base">
          {article.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-copper-500">
          Read insight
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
