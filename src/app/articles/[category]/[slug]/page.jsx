export const revalidate = 60;

import React from "react";

import {
  fetchArticleBySlug,
  fetchRecentArticles,
} from "@/utils/lib/articles/FetchArticles";

import ArticleContentSlug from "@/components/hooks/pages/articles/[slug]/ArticleContentSlug";

import { Toaster } from "react-hot-toast";

import NotFoundArticle from "@/components/hooks/pages/articles/[slug]/params/NotFoundArticle";

import ErrorArticle from "@/components/hooks/pages/articles/[slug]/params/ErrorArticle";

export { generateMetadata } from "@/components/hooks/pages/articles/[slug]/params/utils/metadata";

export default async function ArticleDetails({ params }) {
  try {
    const article = await fetchArticleBySlug(params.slug);
    if (!article) {
      return <NotFoundArticle />;
    }

    const recentArticles = await fetchRecentArticles(params.slug);

    return (
      <>
        <Toaster />
        <ArticleContentSlug article={article} recentArticles={recentArticles} />
      </>
    );
  } catch (error) {
    return <ErrorArticle />;
  }
}
