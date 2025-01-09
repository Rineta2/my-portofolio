import React from "react";

import ArticleContent from "@/components/hooks/admin/article/ArticleContent";

import { getArticles } from "@/components/hooks/admin/article/form/utils/ArticleService";

export async function generateMetadata() {
  return {
    title: `Article Management`,
    description: `Manage article section content and settings`,
  };
}

export default async function Article() {
  const articles = await getArticles();

  return <ArticleContent articles={articles} />;
}
