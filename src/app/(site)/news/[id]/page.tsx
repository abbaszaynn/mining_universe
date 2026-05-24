import { notFound } from "next/navigation";
import { getNewsById, getCompanies, getNews } from "@/lib/data";
import { BlogArticleExperience } from "@/components/blog/BlogArticleExperience";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  const articles = await getNews();
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const article = await getNewsById(params.id);
  if (!article) return { title: "Article Not Found" };

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.id}`,
    ogImage: article.imageUrl,
    ogType: "article",
    publishedTime: article.publishDate,
  });
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
    <>
      <JsonLd data={articleJsonLd(article)} />
      <BlogArticleExperience
        article={article}
        companyName={companyName}
        relatedArticles={relatedArticles}
        companyNames={companyNames}
      />
    </>
  );
}
