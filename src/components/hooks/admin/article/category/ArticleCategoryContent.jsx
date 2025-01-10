"use client";
import { useState } from "react";

import CategoryToolbar from "@/components/hooks/admin/article/category/CategoryToolbar";

import CategoryModal from "@/components/hooks/admin/article/category/CategoryModal";

import CategoryTable from "@/components/hooks/admin/article/category/CategoryTable";

import CategoryPagination from "@/components/hooks/admin/article/category/CategoryPagination";

import { useCategory } from "@/components/hooks/admin/article/category/utils/useCategory";

import styles from "@/components/hooks/admin/article/article.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function ArticleCategoryContent({
  categories: initialCategories,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState(null);
  const itemsPerPage = 5;

  const {
    filteredCategories,
    searchQuery,
    setSearchQuery,
    isLoading,
    addCategory,
    deleteCategory,
    updateCategory,
  } = useCategory(initialCategories);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleModalSubmit = async (categoryName) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, categoryName);
    } else {
      await addCategory(categoryName);
    }
    handleModalClose();
  };

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.article__category} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.article__category__container} container`}>
        <div className={styles.category__container}>
          <CategoryToolbar
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            setIsModalOpen={setIsModalOpen}
          />

          <CategoryModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            setIsModalOpen={setIsModalOpen}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            onSubmit={handleModalSubmit}
            isLoading={isLoading}
          />

          <CategoryTable
            currentItems={currentItems}
            setEditingCategory={setEditingCategory}
            setIsModalOpen={setIsModalOpen}
            handleDeleteCategory={deleteCategory}
            isLoading={isLoading}
          />

          <CategoryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
