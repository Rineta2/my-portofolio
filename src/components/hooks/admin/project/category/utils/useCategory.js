"use client";
import { useState, useEffect, useCallback } from "react";
import { getCategories } from "./CategoryFetch";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/components/hooks/admin/project/category/utils/CategoryMutations";

export function useCategory(initialCategories = []) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const itemsPerPage = 10;

  const fetchCategoriesCallback = useCallback(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    if (initialCategories.length === 0) {
      fetchCategoriesCallback();
    }
  }, [initialCategories.length, fetchCategoriesCallback]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddCategoryCallback = useCallback(
    () => createCategory(newCategory, setNewCategory, fetchCategoriesCallback),
    [newCategory, fetchCategoriesCallback]
  );

  const handleUpdateCategoryCallback = useCallback(
    (categoryId, newName) =>
      updateCategory(
        categoryId,
        newName,
        setEditingCategory,
        setIsModalOpen,
        fetchCategoriesCallback
      ),
    [fetchCategoriesCallback]
  );

  const handleDeleteCategoryCallback = useCallback(
    (categoryId) => deleteCategory(categoryId, fetchCategoriesCallback),
    [fetchCategoriesCallback]
  );

  return {
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
    handleAddCategory: handleAddCategoryCallback,
    handleUpdateCategory: handleUpdateCategoryCallback,
    handleDeleteCategory: handleDeleteCategoryCallback,
    handlePageChange,
    setEditingCategory,
    setEditedCategoryName,
    setNewCategory,
  };
}
