"use client";

import React from "react";

import styles from "@/app/admins/layout.module.scss";

import CategoryToolbar from "@/components/hooks/admin/project/category/CategoryToolbar";

import CategoryModal from "@/components/hooks/admin/project/category/CategoryModal";

import CategoryList from "@/components/hooks/admin/project/category/CategoryList";

import Pagination from "@/components/hooks/admin/project/category/Pagination";

import { useCategory } from "@/components/hooks/admin/project/category/utils/useCategory";

export default function CategoryContent() {
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
  } = useCategory();

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

  return (
    <div className={`${styles.category__container} ${styles.container}`}>
      <CategoryToolbar
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
  );
}
