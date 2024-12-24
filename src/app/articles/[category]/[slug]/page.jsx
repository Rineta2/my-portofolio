export const revalidate = 60;

import React from "react";

import { fetchArticleBySlug } from "@/utils/lib/articles/FetchArticles";

import ArticleContentSlug from "@/components/hooks/pages/articles/[slug]/ArticleContentSlug";

export const generateMetadata = async ({ params }) => {
  try {
    const article = await fetchArticleBySlug(params.slug);

    return {
      title: `Article - ${article.title}`,
      description: article.description || "Article Content",
      openGraph: {
        title: `Article - ${article.title}`,
        description: article.description,
        images: article.thumbnail ? [{ url: article.thumbnail }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Error",
      description: "An error occurred while loading the article.",
      robots: { index: false },
    };
  }
};

export default async function ArticleDetails({ params }) {
  try {
    const article = await fetchArticleBySlug(params.slug);

    if (!article) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <p>The requested article could not be found.</p>
        </div>
      );
    }

    return <ArticleContentSlug article={article} />;
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>An error occurred while loading the article.</p>
      </div>
    );
  }
}
