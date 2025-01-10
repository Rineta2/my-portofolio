"use client";

import React from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

import CategoryToolbar from "@/components/hooks/admin/project/category/CategoryToolbar";

import CategoryModal from "@/components/hooks/admin/project/category/CategoryModal";

import CategoryList from "@/components/hooks/admin/project/category/CategoryList";

import Pagination from "@/components/hooks/admin/project/category/Pagination";

import { useCategory } from "@/components/hooks/admin/project/category/utils/useCategory";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function CategoryContent({ categories: initialCategories }) {
  const {
    categories,
    newCategory,
    searchTerm,
    editingCategory,
    currentPage,
    isModalOpen,
    editedCategoryName,
    itemsPerPage,
    setSearchTerm,
    setIsModalOpen,
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handlePageChange,
    setEditingCategory,
    setEditedCategoryName,
    setNewCategory,
  } = useCategory(initialCategories);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.project__category} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.category__container} container`}>
        <CategoryToolbar
          categories={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
        />

        <CategoryModal
          isModalOpen={isModalOpen}
          editingCategory={editingCategory}
          editedCategoryName={editedCategoryName}
          newCategory={newCategory}
          setEditedCategoryName={setEditedCategoryName}
          setNewCategory={setNewCategory}
          handleAddCategory={handleAddCategory}
          handleUpdateCategory={handleUpdateCategory}
          setIsModalOpen={setIsModalOpen}
          setEditingCategory={setEditingCategory}
        />

        <CategoryList
          currentItems={currentItems}
          setEditingCategory={setEditingCategory}
          setEditedCategoryName={setEditedCategoryName}
          setIsModalOpen={setIsModalOpen}
          handleDeleteCategory={handleDeleteCategory}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
