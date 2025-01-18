"use client";

import React, { useEffect, useRef } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/dist/ScrollTrigger";

import Image from "next/image";

import styles from "@/app/articles/Articles.module.scss";

import { formatDate } from "@/components/helpers/formatDate";

import { useTheme } from "@/utils/theme/ThemeContext";

import ShareButton from "@/components/hooks/pages/articles/[slug]/ShareButton";

import CommentSection from "@/components/hooks/pages/articles/[slug]/comment/CommentSection";

import ArticleHeader from "@/components/hooks/pages/articles/[slug]/ArticleHeader";

import ArticleAuthor from "@/components/hooks/pages/articles/[slug]/ArticleAuthor";

import ArticleTags from "@/components/hooks/pages/articles/[slug]/ArticleTag";

import { createSlug } from "@/components/helpers/stringSlug";

import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ArticleContentSlug({ article, recentArticles }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/articles/${article.slug}`;

  const { isDarkMode } = useTheme();

  const asideRef = useRef(null);

  useEffect(() => {
    const aside = asideRef.current;
    let scrollTrigger;

    const handleResize = () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }

      if (window.innerWidth > 768) {
        scrollTrigger = ScrollTrigger.create({
          trigger: aside,
          start: "top 30px",
          endTrigger: "article",
          end: "bottom 25%",
          pin: true,
          pinSpacing: false,
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        </div>

        <div className={styles.content}>
          <aside ref={asideRef}>
            <div className={styles.table__of__contents}>
              <h2>Table of Contents</h2>
            </div>

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
          </aside>

          <article>
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className="content__article"
            />

            <ArticleTags tags={article.tagNames} />
          </article>
        </div>

        <CommentSection articleId={article.slug} />

        <div className={styles.related__articles}>
          <h2>Related Articles</h2>
          <div className={styles.content__related}>
            {recentArticles &&
              recentArticles.slice(0, 3).map((recentArticle) => (
                <Link
                  key={recentArticle.slug}
                  href={`/articles/${createSlug(
                    recentArticle.categoryName
                  )}/${createSlug(recentArticle.title)}`}
                >
                  <div className={styles.recent__article__image__content}>
                    <Image
                      src={recentArticle.imageUrl}
                      width={500}
                      height={500}
                      alt={recentArticle.title}
                      className={styles.recent__article__image}
                    />
                  </div>

                  <div className={styles.recent__article__info}>
                    <h3>{recentArticle.title}</h3>
                    <span>{formatDate(recentArticle.publishDate)}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
