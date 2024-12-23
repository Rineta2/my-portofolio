export const revalidate = 60;

import React from "react";

import ArticleContent from "@/components/hooks/pages/articles/ArticleContent";

import styles from "@/app/articles/Articles.module.scss";

import { fetchArticles } from "@/utils/lib/articles/FetchArticles";

export async function generateMetadata() {
  return {
    title: `Articles - Rizki Ramadhan`,
    description: `Articles Content`,
  };
}

export default async function Articles() {
  const articles = await fetchArticles();

  return (
    <section className={styles.articles}>
      <ArticleContent articles={articles} />
    </section>
  );
}
