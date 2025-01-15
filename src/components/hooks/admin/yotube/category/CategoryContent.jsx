"use client";
import React from "react";

import { useCategoryState } from "@/components/hooks/admin/yotube/category/utils/useCategoryState";

import { useTheme } from "@/utils/theme/ThemeContext";

import CategoryHeader from "@/components/hooks/admin/yotube/category/CategoryHeader";

import CategoryModal from "@/components/hooks/admin/yotube/category/CategoryModal";

import CategoryTable from "@/components/hooks/admin/yotube/category/CategoryTable";

import CategoryPagination from "@/components/hooks/admin/yotube/category/CategoryPagination";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function CategoryContent({ videosCategory }) {
  const {
    newCategory,
    searchTerm,
    editingId,
    editingName,
    isModalOpen,
    isEditing,
    itemsPerPage,
    pagesVisited,
    pageCount,
    setNewCategory,
    setSearchTerm,
    setEditingId,
    setEditingName,
    setIsModalOpen,
    setIsEditing,
    handlePageChange,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
  } = useCategoryState(videosCategory);

  const { isDarkMode } = useTheme();

  return (
    <section className={`${styles.youtube} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={`${styles.youtube__container} container`}>
        <CategoryHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
        />

        <CategoryModal
          isModalOpen={isModalOpen}
          isEditing={isEditing}
          newCategory={newCategory}
          editingName={editingName}
          setNewCategory={setNewCategory}
          setEditingName={setEditingName}
          handleAddCategory={handleAddCategory}
          handleEditCategory={handleEditCategory}
          editingId={editingId}
          setIsModalOpen={setIsModalOpen}
          setIsEditing={setIsEditing}
          setEditingId={setEditingId}
        />

        <CategoryTable
          videosCategory={videosCategory}
          searchTerm={searchTerm}
          pagesVisited={pagesVisited}
          itemsPerPage={itemsPerPage}
          setEditingId={setEditingId}
          setEditingName={setEditingName}
          setIsEditing={setIsEditing}
          setIsModalOpen={setIsModalOpen}
          handleDeleteCategory={handleDeleteCategory}
        />

        <CategoryPagination
          pageCount={pageCount}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
}