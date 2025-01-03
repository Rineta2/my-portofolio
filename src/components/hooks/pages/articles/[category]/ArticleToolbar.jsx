import React from "react";

import Link from "next/link";

import { ChevronRight, House } from "lucide-react";

import { createSlug } from "@/components/tools/stringSlug";

import styles from "@/app/articles/Articles.module.scss";

import { motion } from "framer-motion";

import {
  toolbarAnimationCategory,
  toolbarHeadingAnimationCategory,
  toolbarTitleAnimationCategory,
  toolbarCategoryAnimationCategory,
  categoryItemAnimationCategory,
  categoryButtonAnimationCategory,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function ArticleToolbar({ pathname, categories, articles }) {
  const uniqueCategories = categories?.reduce((acc, current) => {
    const isDuplicate = acc.find(
      (item) => item.categoryName === current.categoryName
    );
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  const sortedCategories = uniqueCategories?.sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  return (
    <motion.div className={styles.toolbar} {...toolbarAnimationCategory}>
      <motion.div
        className={styles.heading}
        {...toolbarHeadingAnimationCategory}
      >
        <Link href="/">
          <House />
          Home
        </Link>
        <ChevronRight />
        <span>Articles</span>
        <ChevronRight />
        <span>
          {
            articles?.find((article) => article.id === articles[0].id)
              ?.categoryName
          }
        </span>
      </motion.div>

      <motion.div className={styles.title} {...toolbarTitleAnimationCategory}>
        <h1>What&apos;s new at My Article</h1>
      </motion.div>

      <motion.div
        className={styles.category}
        {...toolbarCategoryAnimationCategory}
      >
        <motion.div {...categoryButtonAnimationCategory}>
          <Link
            href="/articles"
            className={pathname === "/articles" ? styles.active : ""}
          >
            All
          </Link>
        </motion.div>
        {sortedCategories?.map((category, index) => {
          const categorySlug = createSlug(category.categoryName);
          const isActive = pathname === `/articles/${categorySlug}`;

          return (
            <motion.div
              key={category.id}
              {...categoryItemAnimationCategory(index)}
            >
              <Link
                href={`/articles/${categorySlug}`}
                className={isActive ? styles.active : ""}
              >
                {category.categoryName}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
