import React, { useRef } from "react";

import Link from "next/link";

import Image from "next/image";

import { motion, useInView } from "framer-motion";

import { createSlug } from "@/components/helpers/stringSlug";

import { formatDate } from "@/components/helpers/formatDate";

import styles from "@/app/articles/Articles.module.scss";

import {
  remainingArticleAnimationCategory,
  remainingImageAnimationCategory,
  remainingTextAnimationCategory,
  remainingToolbarAnimationCategory,
  remainingCategoryAnimationCategory,
  remainingDateAnimationCategory,
  remainingTitleAnimationCategory,
  remainingLinkAnimationCategory,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function RemainingArticles({ articles }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {articles?.map((article, index) => (
        <motion.div
          ref={ref}
          key={article.id}
          {...remainingArticleAnimationCategory(index)}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        >
          <div className={styles.img}>
            <motion.div
              {...remainingImageAnimationCategory(index)}
              animate={
                isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
              }
            >
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={500}
                height={500}
                quality={100}
              />
            </motion.div>
          </div>

          <motion.div
            className={styles.text}
            {...remainingTextAnimationCategory(index)}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          >
            <motion.div
              className={styles.toolbar}
              {...remainingToolbarAnimationCategory(index)}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            >
              <motion.span
                className={styles.category}
                {...remainingCategoryAnimationCategory}
              >
                {article.categoryName}
              </motion.span>
              <motion.span
                className={styles.date}
                {...remainingDateAnimationCategory}
              >
                {formatDate(article.createdAt)}
              </motion.span>
            </motion.div>

            <motion.h1 {...remainingTitleAnimationCategory(index)}>
              {article.title}
            </motion.h1>

            <motion.div {...remainingLinkAnimationCategory(index)}>
              <Link
                href={`/articles/${createSlug(
                  article.categoryName
                )}/${createSlug(article.slug)}`}
              >
                Read More
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
