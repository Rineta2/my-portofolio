"use client";

import React from "react";

import Image from "next/image";

import styles from "@/app/articles/Articles.module.scss";

import { formatDate } from "@/components/helpers/formatDate";

import { useTheme } from "@/utils/theme/ThemeContext";

import ShareButton from "@/components/hooks/pages/articles/[slug]/ShareButton";

import CommentSection from "@/components/hooks/pages/articles/[slug]/comment/CommentSection";

import ArticleHeader from "@/components/hooks/pages/articles/[slug]/ArticleHeader";

import ArticleAuthor from "@/components/hooks/pages/articles/[slug]/ArticleAuthor";

import ArticleTags from "@/components/hooks/pages/articles/[slug]/ArticleTag";

export default function ArticleContentSlug({ article }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`;
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.article__slug} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.article__container} container`}>
        <ArticleHeader categoryName={article.categoryName} />

        <div className={styles.heading__center}>
          <h1>{article.title}</h1>

          <ArticleAuthor
            authorPhoto={article.authorPhoto}
            authorName={article.authorName}
            role={article.role}
          />

          <Image
            src={article.imageUrl}
            width={500}
            height={500}
            alt={article.title}
            quality={100}
          />

          <div className={styles.share__date}>
            <span className={styles.date}>
              {formatDate(article.publishDate)}
            </span>

            <ShareButton
              shareUrl={shareUrl}
              shareTitle={article.title}
              shareDescription={article.description}
              shareCategory={article.categoryName}
              shareImage={article.imageUrl}
              tags={article.tagNames}
            />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="content__article"
        />

        <ArticleTags tags={article.tagNames} />

        <CommentSection articleId={article.slug} />
      </div>
    </section>
  );
}
