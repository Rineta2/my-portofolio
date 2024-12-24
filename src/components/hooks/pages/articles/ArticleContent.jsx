"use client";

import styles from "@/app/articles/Articles.module.scss";

import Image from "next/image";

import { formatDate } from "@/components/tools/formatDate";

import Link from "next/link";

import { createSlug } from "@/components/tools/stringSlug";

import { ChevronRight, House, Search } from "lucide-react";

import { usePathname } from "next/navigation";

import { useState, useRef } from "react";

import useModalEffects from "@/components/tools/useModalEffect";

import { useSearchModalAnimation } from "@/components/hooks/animation/article/useSearchModalAnimation";

export default function ArticleContent({ articles, categories }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedCategories = categories?.sort((a, b) =>
    a.categoryName.localeCompare(b.categoryName)
  );

  const topArticles = articles
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const remainingArticles = articles?.filter(
    (article) =>
      !topArticles?.find((topArticle) => topArticle.id === article.id)
  );

  const searchResults = articles?.filter((article) => {
    if (!searchQuery) return false;
    const searchTerm = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchTerm) ||
      article.categoryName.toLowerCase().includes(searchTerm)
    );
  });

  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useSearchModalAnimation(isModalOpen, modalRef, modalContentRef);

  useModalEffects({
    isOpen: isModalOpen,
    onClose: () => setIsModalOpen(false),
  });

  return (
    <div className={`${styles.articles__container} ${styles.container}`}>
      <div className={styles.toolbar}>
        <div className={styles.heading}>
          <Link href="/">
            <House />
            Home
          </Link>
          <ChevronRight />
          <span>Articles</span>
        </div>

        <div className={styles.title}>
          <h1>What&apos;s new at My Article</h1>
        </div>

        <div className={styles.category}>
          <Link
            href="/articles"
            className={pathname === "/articles" ? styles.active : ""}
          >
            All
          </Link>
          {sortedCategories?.map((category) => {
            const categorySlug = createSlug(category.categoryName);
            const isActive = pathname === `/articles/${categorySlug}`;

            return (
              <Link
                href={`/articles/${categorySlug}`}
                key={category.id}
                className={isActive ? styles.active : ""}
              >
                {category.categoryName}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.topArticles}>
        {topArticles?.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${createSlug(article.categoryName)}/${createSlug(
              article.slug
            )}`}
            className={styles.box}
          >
            <div className={styles.img}>
              <Image
                src={article.imageUrl}
                width={500}
                height={500}
                alt={article.title}
                quality={100}
              />

              <div className={styles.date}>
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>

            <div className={styles.text}>
              <div className={styles.category}>
                <span>{article.categoryName}</span>
              </div>

              <h1>{article.title}</h1>

              <p>
                {article.description.length > 200
                  ? `${article.description.substring(0, 200)}...`
                  : article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.tollbarBottom}>
        <h1>Explore all news updates</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Articles..."
            readOnly
            onClick={() => setIsModalOpen(true)}
          />
          <Search />
        </div>
      </div>

      {isModalOpen && (
        <div
          ref={modalRef}
          className={styles.searchModal}
          onClick={(e) => {
            if (e.target.classList.contains(styles.searchModal)) {
              setIsModalOpen(false);
              setSearchQuery("");
            }
          }}
        >
          <div ref={modalContentRef} className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <Search size={24} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            <div className={styles.modalResults}>
              {searchResults.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${createSlug(
                    article.categoryName
                  )}/${createSlug(article.slug)}`}
                  onClick={() => setIsModalOpen(false)}
                >
                  <div className={styles.searchResultItem}>
                    <h3>{article.title}</h3>
                    <p>
                      {article.description.length > 89
                        ? `${article.description.substring(0, 89)}...`
                        : article.description}
                    </p>
                  </div>
                </Link>
              ))}
              {searchQuery && searchResults.length === 0 && (
                <div className={styles.noResults}>No results found</div>
              )}
            </div>
          </div>
        </div>
      )}

      {remainingArticles?.map((article) => (
        <div key={article.id}>
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

              <span className={styles.date}>
                {formatDate(article.createdAt)}
              </span>
            </div>

            <h1>{article.title}</h1>

            <Link
              href={`/articles/${createSlug(article.categoryName)}/${createSlug(
                article.slug
              )}`}
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
