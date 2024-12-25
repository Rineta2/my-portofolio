"use client";

import React from "react";

import Image from "next/image";

import styles from "@/app/articles/Articles.module.scss";

import { formatDate } from "@/components/tools/formatDate";

import Link from "next/link";

import { ChevronLeft } from "lucide-react";

import ShareButton from "@/components/hooks/pages/articles/[slug]/ShareButton";

import CommentSection from "@/components/hooks/pages/articles/[slug]/comment/CommentSection";

export default function ArticleContentSlug({ article }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`;
  const shareTitle = article.title;
  const shareDescription = article.description;
  const shareImage = article.imageUrl;
  const shareCategory = article.categoryName;
  const tags = article.tagNames;

  return (
    <section className={styles.article__slug}>
      <div className={styles.article__container}>
        <div className={styles.top__heading}>
          <span>{article.categoryName}</span>

          <Link href="/articles">
            <ChevronLeft />
            Back to Articles
          </Link>
        </div>

        <div className={styles.heading__center}>
          <h1>{article.title}</h1>

          <div className={styles.author}>
            <Image
              src={article.authorPhoto}
              width={500}
              height={500}
              alt={article.authorName}
              quality={100}
            />

            <div className={styles.author__info}>
              <span>{article.authorName}</span>
              <span>{article.role}</span>
            </div>
          </div>

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
              shareTitle={shareTitle}
              shareDescription={shareDescription}
              shareCategory={shareCategory}
              shareImage={shareImage}
              tags={tags}
            />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="content__article"
        />

        <div className={styles.buttons__share}>
          <div className={styles.tags}>
            <h3>Tags :</h3>
            {article.tagNames.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <CommentSection articleId={article.slug} />
      </div>
    </section>
  );
}
