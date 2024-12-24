"use client";

import React from "react";

import styles from "@/app/articles/Articles.module.scss";

import Image from "next/image";

import { formatDate } from "@/components/tools/formatDate";

import Link from "next/link";

import { createSlug } from "@/components/tools/stringSlug";

import { ChevronRight, House } from "lucide-react";

import { usePathname } from "next/navigation";

export default function ArticleCategoryContent({ articles, categories }) {
  const pathname = usePathname();

  const sortedCategories = categories?.sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  return (
    <div className={`${styles.articles__container} ${styles.container}`}>
      <div className={styles.toolbar}>
        <div className={styles.heading}>
          <Link href="/">
            <House />
            Home
          </Link>
          <ChevronRight />
          <span>Articles</span>
        </div>

        <div className={styles.title}>
          <h1>What&apos;s new at My Article</h1>
        </div>

        <div className={styles.category}>
          <Link
            href="/articles"
            className={pathname === "/articles" ? styles.active : ""}
          >
            All
          </Link>
          {sortedCategories?.map((category) => {
            const categorySlug = createSlug(category.categoryName);
            const isActive = pathname === `/articles/${categorySlug}`;

            return (
              <Link
                href={`/articles/${categorySlug}`}
                key={category.id}
                className={isActive ? styles.active : ""}
              >
                {category.categoryName}
              </Link>
            );
          })}
        </div>
      </div>

      {articles.map((article) => (
        <div key={article.id}>
          <div className={styles.img}>
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={500}
              height={500}
              quality={100}
            />
          </div>

          <div className={styles.text}>
            <div className={styles.toolbar}>
              <span className={styles.category}>{article.categoryName}</span>
              <span className={styles.date}>
                {formatDate(article.createdAt)}
              </span>
            </div>

            <h1>{article.title}</h1>

            <Link
              href={`/articles/${createSlug(article.categoryName)}/${createSlug(
                article.slug
              )}`}
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
