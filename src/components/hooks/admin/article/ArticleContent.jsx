"use client";

import React, { useState } from "react";

import ReactPaginate from "react-paginate";

import toast from "react-hot-toast";

import styles from "@/components/hooks/admin/article/article.module.scss";

import Link from "next/link";

import { deleteArticle } from "@/components/hooks/admin/article/form/utils/ArticleService";

import Image from "next/image";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function ArticleContent({ articles }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      try {
        await deleteArticle(id);
        toast.success("Artikel berhasil dihapus");
      } catch (error) {
        toast.error("Gagal menghapus artikel");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredArticles = React.useMemo(() => {
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const { currentArticles, pageCount } = React.useMemo(() => {
    const pageCount = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentArticles = filteredArticles.slice(
      offset,
      offset + ITEMS_PER_PAGE
    );
    return { currentArticles, pageCount };
  }, [filteredArticles, currentPage]);

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.article} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={`${styles.article__container} container`}>
        <div className={styles.toolbar}>
          <h1>Article</h1>
          <Link href="/admins/dashboard/article/form" className={styles.button}>
            Add Article
          </Link>
        </div>

        <div className={styles.search__container}>
          <input
            type="text"
            placeholder="Search article by title or description"
            className={styles.search__input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Publish Date</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((article) => (
                <tr key={article.id}>
                  <td>
                    {article.imageUrl && (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={500}
                        height={500}
                      />
                    )}
                  </td>
                  <td>{article.title}</td>
                  <td>{article.category?.name || "Uncategorized"}</td>
                  <td>{formatDate(article.publishDate)}</td>
                  <td>
                    {article.tags && (
                      <>
                        {article.tags.slice(0, 5).map((tag) => (
                          <span key={tag.id} className={styles.tag}>
                            {tag.name}
                          </span>
                        ))}
                        {article.tags.length > 5 && (
                          <span className={styles.tag}>...</span>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    <div className={styles.table_actions}>
                      <Link
                        href={`/admins/dashboard/article/form?id=${article.id}`}
                        className={styles.btn__edit}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(article.id)}
                        className={styles.btn__delete}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          previousClassName={styles.previous}
          nextClassName={styles.next}
          pageClassName={styles.page}
          breakClassName={styles.break}
          disabledClassName={styles.disabled}
        />
      </div>
    </section>
  );
}
