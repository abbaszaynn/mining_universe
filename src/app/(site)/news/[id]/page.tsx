import { notFound } from "next/navigation";
import { getNewsById, getCompanies, getNews } from "@/lib/data";
import { BlogArticleExperience } from "@/components/blog/BlogArticleExperience";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";
import { articleFaqItems } from "@/lib/article-blocks";

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

  // Q&A articles (question headings, see lib/article-blocks) also get FAQPage
  // schema: it is how answer engines pick up the question and answer pairs.
  // One stray question is not a FAQ, so it takes two or more.
  const faqItems = articleFaqItems(article.content);

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
      <JsonLd
        data={
          faqItems.length >= 2
            ? [articleJsonLd(article), faqJsonLd(faqItems)]
            : articleJsonLd(article)
        }
      />
      <BlogArticleExperience
        article={article}
        companyName={companyName}
        relatedArticles={relatedArticles}
        companyNames={companyNames}
      />
    </>
  );
}
