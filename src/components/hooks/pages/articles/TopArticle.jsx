import React from "react";

import styles from "@/app/articles/Articles.module.scss";

import Link from "next/link";

import Image from "next/image";

import { createSlug } from "@/components/tools/stringSlug";

import { formatDate } from "@/components/tools/formatDate";

import { motion, useInView } from "framer-motion";

import {
  containerAnimation,
  articleCardAnimation,
  textContainerAnimation,
  titleAnimationTopArticle,
  descriptionAnimation,
  categoryAnimationTopArticle,
  authorAnimation,
  imageAnimation,
  dateAnimation,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function TopArticles({ articles }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={styles.topArticles}
      initial={containerAnimation.initial}
      animate={
        isInView ? containerAnimation.animate : containerAnimation.initial
      }
      transition={containerAnimation.transition}
    >
      {articles?.map((article, index) => (
        <motion.div
          key={article.id}
          initial={articleCardAnimation(index).initial}
          animate={
            isInView
              ? articleCardAnimation(index).animate
              : articleCardAnimation(index).initial
          }
          transition={articleCardAnimation(index).transition}
        >
          <Link
            href={`/articles/${createSlug(article.categoryName)}/${createSlug(
              article.slug
            )}`}
            className={styles.box}
          >
            <motion.div
              className={styles.img}
              whileHover={imageAnimation.whileHover}
              transition={imageAnimation.transition}
            >
              <Image
                src={article.imageUrl}
                width={500}
                height={500}
                alt={article.title}
                quality={100}
              />
              <motion.div
                className={styles.date}
                initial={dateAnimation(index).initial}
                animate={
                  isInView
                    ? dateAnimation(index).animate
                    : dateAnimation(index).initial
                }
                transition={dateAnimation(index).transition}
              >
                <span>{formatDate(article.createdAt)}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.text}
              initial={textContainerAnimation(index).initial}
              animate={
                isInView
                  ? textContainerAnimation(index).animate
                  : textContainerAnimation(index).initial
              }
              transition={textContainerAnimation(index).transition}
            >
              <div className={styles.profile}>
                <motion.div
                  className={styles.category}
                  initial={categoryAnimationTopArticle(index).initial}
                  animate={
                    isInView
                      ? categoryAnimationTopArticle(index).animate
                      : categoryAnimationTopArticle(index).initial
                  }
                  transition={categoryAnimationTopArticle(index).transition}
                >
                  <span>{article.categoryName}</span>
                </motion.div>

                <motion.div
                  className={styles.author}
                  initial={authorAnimation(index).initial}
                  animate={
                    isInView
                      ? authorAnimation(index).animate
                      : authorAnimation(index).initial
                  }
                  transition={authorAnimation(index).transition}
                >
                  <Image
                    src={article.authorPhoto}
                    width={500}
                    height={500}
                    quality={100}
                    alt={article.authorName}
                  />
                  <div className={styles.authorText}>
                    <h3>{article.authorName}</h3>
                    <span>{article.role}</span>
                  </div>
                </motion.div>
              </div>

              <motion.h1
                initial={titleAnimationTopArticle(index).initial}
                animate={
                  isInView
                    ? titleAnimationTopArticle(index).animate
                    : titleAnimationTopArticle(index).initial
                }
                transition={titleAnimationTopArticle(index).transition}
              >
                {article.title}
              </motion.h1>
              <motion.p
                initial={descriptionAnimation(index).initial}
                animate={
                  isInView
                    ? descriptionAnimation(index).animate
                    : descriptionAnimation(index).initial
                }
                transition={descriptionAnimation(index).transition}
              >
                {article.description.length > 150
                  ? `${article.description.substring(0, 150)}...`
                  : article.description}
              </motion.p>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
