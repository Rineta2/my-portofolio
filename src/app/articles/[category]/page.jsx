import React from "react";

import { fetchArticles } from "@/utils/lib/articles/FetchArticles";

import { createSlug } from "@/components/tools/stringSlug";

import ArticleCategoryContent from "@/components/hooks/pages/articles/[category]/ArticleCategoryContent";

export const generateMetadata = async ({ params }) => {
  try {
    const articles = await fetchArticles();

    const categoryArticles = articles.filter(
      (article) => createSlug(article.categoryName) === params.category
    );

    const category = categoryArticles[0];

    return {
      title: `Article - ${category?.categoryName || "Category Not Found"}`,
      description: category?.description || "Article Content",
      openGraph: {
        title: `Article - ${category?.categoryName || "Category Not Found"}`,
        description: category?.description,
        images: category?.thumbnail ? [{ url: category.thumbnail }] : [],
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

export default async function CategoryPage({ params }) {
  const articles = await fetchArticles();
  const categories = await fetchArticles();

  const categoryArticles = articles.filter(
    (article) => createSlug(article.categoryName) === params.category
  );

  return (
    <ArticleCategoryContent
      articles={categoryArticles}
      categories={categories}
    />
  );
}
