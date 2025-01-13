"use client";
import React, { useState, useRef } from "react";

import styles from "@/app/articles/Articles.module.scss";

import { usePathname } from "next/navigation";

import { useTheme } from "@/utils/theme/ThemeContext";

import { useSearchModalAnimation } from "@/components/hooks/animation/article/useSearchModalAnimation";

import useModalEffects from "@/components/helpers/useModalEffect";

import ArticleToolbar from "@/components/hooks/pages/articles/[category]/ArticleToolbar";

import TopArticles from "@/components/hooks/pages/articles/[category]/TopArticles";

import SearchToolbar from "@/components/hooks/pages/articles/[category]/SearchToolbar";

import SearchModal from "@/components/hooks/pages/articles/[category]/SearchModal";

import RemainingArticles from "@/components/hooks/pages/articles/[category]/RemainingArticles";

export default function ArticleCategoryContent({ articles, categories }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);
  const { isDarkMode } = useTheme();

  useSearchModalAnimation(isModalOpen, modalRef, modalContentRef);

  useModalEffects({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
  });

  const searchResults = articles?.filter((article) => {
    if (!searchQuery) return false;
    const searchTerm = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.categoryName.toLowerCase().includes(searchTerm)
    );
  });

  const topArticles = articles
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const remainingArticles = articles?.filter(
    (article) =>
      !topArticles?.find((topArticle) => topArticle.id === article.id)
  );

  return (
    <section className={styles.articles}>
      <div
        className={`${styles.articles__container} ${
          isDarkMode ? styles.dark : styles.light
        } container`}
      >
        <ArticleToolbar
          pathname={pathname}
          categories={categories}
          articles={articles}
        />
        <TopArticles articles={topArticles} />

        <SearchToolbar setIsModalOpen={setIsModalOpen} />

        <SearchModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          modalRef={modalRef}
          modalContentRef={modalContentRef}
        />

        <RemainingArticles articles={remainingArticles} />
      </div>
    </section>
  );
}
