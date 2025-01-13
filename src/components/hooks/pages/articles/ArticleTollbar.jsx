import styles from "@/app/articles/Articles.module.scss";

import Link from "next/link";

import { ChevronRight, House } from "lucide-react";

import { usePathname } from "next/navigation";

import { createSlug } from "@/components/helpers/stringSlug";

import { motion } from "framer-motion";

import {
  toolbarAnimation,
  headingAnimation,
  titleAnimation,
  categoryContainerAnimation,
  categoryItemAnimation,
} from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function ArticleToolbar({ categories }) {
  const pathname = usePathname();

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
    <motion.div className={styles.toolbar} {...toolbarAnimation}>
      <motion.div className={styles.heading} {...headingAnimation}>
        <Link href="/">
          <House />
          Home
        </Link>
        <ChevronRight />
        <span>Articles</span>
      </motion.div>

      <motion.div className={styles.title} {...titleAnimation}>
        <h1>What&apos;s new at My Article</h1>
      </motion.div>

      <motion.div className={styles.category} {...categoryContainerAnimation}>
        <Link
          href="/articles"
          className={pathname === "/articles" ? styles.active : ""}
        >
          All
        </Link>
        {sortedCategories?.map((category, index) => {
          const categorySlug = createSlug(category.categoryName);
          const isActive = pathname === `/articles/${categorySlug}`;

          return (
            <motion.div
              key={category.id}
              {...categoryItemAnimation}
              transition={{
                ...categoryItemAnimation.transition,
                delay: 0.5 + index * 0.1,
              }}
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
