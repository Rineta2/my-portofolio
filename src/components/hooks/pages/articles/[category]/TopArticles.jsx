import React, { useRef } from "react";

import Link from "next/link";

import Image from "next/image";

import { motion, useInView } from "framer-motion";

import { createSlug } from "@/components/tools/stringSlug";

import { formatDate } from "@/components/tools/formatDate";

import styles from "@/app/articles/Articles.module.scss";

import {
  containerAnimationCategory,
  articleCardAnimationCategory,
  imageAnimationCategory,
  dateAnimationCategory,
  textAnimationCategory,
  categoryAnimationCategory,
  authorAnimationCategory,
  authorTextAnimationCategory,
  authorNameAnimationCategory,
  authorRoleAnimationCategory,
  titleAnimationCategory,
  descriptionAnimationCategory,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function TopArticles({ articles }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={styles.topArticles}
      {...containerAnimationCategory}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {articles?.map((article, index) => (
        <motion.div
          key={article.id}
          {...articleCardAnimationCategory(index)}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
        >
          <Link
            href={`/articles/${createSlug(article.categoryName)}/${createSlug(
              article.slug
            )}`}
            className={styles.box}
          >
            <motion.div className={styles.img} {...imageAnimationCategory}>
              <Image
                src={article.imageUrl}
                width={500}
                height={500}
                alt={article.title}
                quality={100}
              />
              <motion.div
                className={styles.date}
                {...dateAnimationCategory(index)}
              >
                <span>{formatDate(article.createdAt)}</span>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.text}
              {...textAnimationCategory(index)}
            >
              <div className={styles.profile}>
                <motion.div
                  className={styles.category}
                  {...categoryAnimationCategory(index)}
                >
                  <span>{article.categoryName}</span>
                </motion.div>

                <motion.div
                  className={styles.author}
                  {...authorAnimationCategory(index)}
                >
                  <Image
                    src={article.authorPhoto}
                    width={500}
                    height={500}
                    quality={100}
                    alt={article.authorName}
                  />

                  <motion.div
                    className={styles.authorText}
                    {...authorTextAnimationCategory(index)}
                  >
                    <motion.h3 {...authorNameAnimationCategory(index)}>
                      {article.authorName}
                    </motion.h3>
                    <motion.span {...authorRoleAnimationCategory(index)}>
                      {article.role}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>

              <motion.h1 {...titleAnimationCategory(index)}>
                {article.title}
              </motion.h1>
              <motion.p {...descriptionAnimationCategory(index)}>
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
