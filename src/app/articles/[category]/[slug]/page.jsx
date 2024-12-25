export const revalidate = 60;

import React from "react";

import { fetchArticleBySlug } from "@/utils/lib/articles/FetchArticles";

import ArticleContentSlug from "@/components/hooks/pages/articles/[slug]/ArticleContentSlug";

import { Toaster } from "react-hot-toast";

import styles from "@/app/articles/Articles.module.scss";

import notfound from "@/components/assets/priview/notfound.gif";

import Image from "next/image";

import Link from "next/link";

export const generateMetadata = async ({ params }) => {
  try {
    const article = await fetchArticleBySlug(params.slug);

    return {
      title: `Article - ${article.title}`,
      description: article.description || "Article Content",
      openGraph: {
        title: `Article - ${article.title}`,
        description: article.description,
        images: article.thumbnail ? [{ url: article.thumbnail }] : [],
      },
    };
  } catch (error) {
    return {
      title: "Articles not found",
      description: "Articles not found",
      robots: { index: false },
    };
  }
};

export default async function ArticleDetails({ params }) {
  try {
    const article = await fetchArticleBySlug(params.slug);

    if (!article) {
      return (
        <section className={styles.article__notfound}>
          <div className={`${styles.article__container} ${styles.container}`}>
            <div className={styles.content}>
              <div className={styles.img}>
                <Image src={notfound} alt="Article not found" />
              </div>
              <div className={styles.text}>
                <h1 className={styles.article__title}>
                  Artikel tidak ditemukan
                </h1>

                <p>Artikel yang Anda cari tidak ditemukan.</p>

                <Link href="/articles" className={styles.button}>
                  Kembali ke artikel
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
        <Toaster />
        <ArticleContentSlug article={article} />
      </>
    );
  } catch (error) {
    return (
      <section>
        <div className={`${styles.article__container} ${styles.container}`}>
          <h1 className={styles.article__title}>Error</h1>
          <p>An error occurred while loading the article.</p>
        </div>
      </section>
    );
  }
}
