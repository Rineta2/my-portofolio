export const revalidate = 60;

import React from "react";

import { fetchArticleBySlug } from "@/utils/lib/articles/FetchArticles";

import ArticleContentSlug from "@/components/hooks/pages/articles/[slug]/ArticleContentSlug";

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
    console.error("Error loading article:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Error</h1>
        <p>An error occurred while loading the article.</p>
      </div>
    );
  }
}
