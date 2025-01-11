import React from "react";

import Link from "next/link";

import { Search } from "lucide-react";

import { createSlug } from "@/components/tools/stringSlug";

import styles from "@/app/articles/Articles.module.scss";

export default function SearchModal({
  isModalOpen,
  setIsModalOpen,
  searchQuery,
  setSearchQuery,
  searchResults,
  modalRef,
  modalContentRef,
}) {
  if (!isModalOpen) return null;

  return (
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
              href={`/articles/${createSlug(article.categoryName)}/${createSlug(
                article.slug
              )}`}
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
  );
}
