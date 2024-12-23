"use client";

import { useState, useEffect } from "react";

import { fetchArticles } from "@/utils/lib/articles/FetchArticles";

import styles from "@/app/articles/Articles.module.scss";

import Image from "next/image";

export default function ArticleContent() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => setArticles(data));
  }, []);

  return (
    <div className={styles.articleContainer}>
      {articles.map((item, index) => (
        <div key={index} className={styles.box}>
          <div className={styles.img}>
            <Image
              src={item.imageUrl}
              width={500}
              height={500}
              alt={item.title}
              quality={100}
            />
          </div>

          <h1>{item.title}</h1>
        </div>
      ))}
    </div>
  );
}
