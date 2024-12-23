import React from "react";

import ArticleContent from "@/components/hooks/pages/articles/ArticleContent";

import styles from "@/app/articles/Articles.module.scss"

export async function generateMetadata() {
  return {
    title: `Articles - Rizki Ramadhan`,
    description: `Articles Content`,
  };
}

export default async function Articles() {
  return (
    <section className={styles.articles}>
      <ArticleContent />
    </section>
  );
}
