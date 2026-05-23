import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsById, getCompanies, getNews } from "@/lib/data";
import { BlogArticleExperience } from "@/components/blog/BlogArticleExperience";

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const article = await getNewsById(params.id);
  if (!article) return { title: "Blog Not Found" };

  return {
    title: `${article.title} | GOS`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishDate,
      images: [{ url: article.imageUrl, alt: article.title }],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const [article, companies, allArticles] = await Promise.all([
    getNewsById(params.id),
    getCompanies(),
    getNews(),
  ]);

  if (!article) {
    notFound();
  }

  const companyName = article.companyId
    ? companies.find((c) => c.id === article.companyId)?.name
    : undefined;

  const companyNames = Object.fromEntries(
    companies.map((company) => [company.id, company.name])
  );

  const relatedArticles = allArticles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <BlogArticleExperience
      article={article}
      companyName={companyName}
      relatedArticles={relatedArticles}
      companyNames={companyNames}
    />
  );
}
