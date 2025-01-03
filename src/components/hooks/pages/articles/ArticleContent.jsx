"use client";

import styles from "@/app/articles/Articles.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

import ArticleToolbar from "@/components/hooks/pages/articles/ArticleTollbar";

import TopArticles from "@/components/hooks/pages/articles/TopArticle";

import SearchToolbar from "@/components/hooks/pages/articles/SearchTollbar";

import SearchModal from "@/components/hooks/pages/articles/SearchModal";

import ArticleGrid from "@/components/hooks/pages/articles/ArticleGrid";

import { useState, useRef } from "react";

import { motion, useInView } from "framer-motion";

import { fadeInUpAnimation } from "@/components/hooks/animation/article/pages/useArticleAnimations";

export default function ArticleContent({ articles, categories }) {
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isDarkMode } = useTheme();

  const topArticles = articles
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const remainingArticles = articles?.filter(
    (article) =>
      !topArticles?.find((topArticle) => topArticle.id === article.id)
  );

  const toolbarRef = useRef(null);
  const topArticlesRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);

  const isToolbarInView = useInView(toolbarRef, { once: true, amount: 0.3 });
  const isTopArticlesInView = useInView(topArticlesRef, {
    once: true,
    amount: 0.3,
  });
  const isSearchInView = useInView(searchRef, { once: true, amount: 0.3 });
  const isGridInView = useInView(gridRef, { once: true, amount: 0.3 });

  return (
    <div
      className={`${styles.articles__container} ${
        isDarkMode ? styles.dark : styles.light
      } container`}
    >
      <motion.div
        ref={toolbarRef}
        {...fadeInUpAnimation}
        animate={
          isToolbarInView ? fadeInUpAnimation.animate : fadeInUpAnimation.exit
        }
      >
        <ArticleToolbar categories={categories} />
      </motion.div>

      <motion.div
        ref={topArticlesRef}
        {...fadeInUpAnimation}
        animate={
          isTopArticlesInView
            ? fadeInUpAnimation.animate
            : fadeInUpAnimation.exit
        }
      >
        <TopArticles articles={topArticles} />
      </motion.div>

      <motion.div
        ref={searchRef}
        {...fadeInUpAnimation}
        animate={
          isSearchInView ? fadeInUpAnimation.animate : fadeInUpAnimation.exit
        }
      >
        <SearchToolbar setIsModalOpen={setIsModalOpen} />
      </motion.div>

      <SearchModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        articles={articles}
      />

      <motion.div
        ref={gridRef}
        {...fadeInUpAnimation}
        animate={
          isGridInView ? fadeInUpAnimation.animate : fadeInUpAnimation.exit
        }
      >
        <ArticleGrid articles={remainingArticles} />
      </motion.div>
    </div>
  );
}
