"use client";

import React from "react";
import Image from "next/image";
import styles from "@/app/articles/Articles.module.scss";
import { formatDate } from "@/components/tools/formatDate";

export default function ArticleContentSlug({ article }) {
  return (
    <div className={styles.articleContainer}>
      <div className={styles.img}>
        <Image
          src={article.imageUrl}
          width={500}
          height={500}
          alt={article.title}
          quality={100}
        />
      </div>

      <div className={styles.text}>
        <div className={styles.toolbar}>
          <span className={styles.category}>{article.categoryName}</span>
          <span className={styles.date}>{formatDate(article.publishDate)}</span>
        </div>

        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
}
