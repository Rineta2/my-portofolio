"use client";

import { useState, useEffect } from "react";

import {
  fetchCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "@/components/hooks/admin/article/category/utils/FetchCategory";

export function useCategory(initialCategories = []) {
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    setIsLoading(true);
    try {
      const success = await addCategory(newCategory);
      if (success) {
        await loadCategories();
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return false;

    setIsLoading(true);
    try {
      const success = await deleteCategory(categoryId);
      if (success) {
        await loadCategories();
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (categoryId, newName) => {
    setIsLoading(true);
    try {
      const success = await updateCategory(categoryId, newName);
      if (success) {
        await loadCategories();
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    categories,
    filteredCategories,
    searchQuery,
    setSearchQuery,
    isLoading,
    addCategory: handleAddCategory,
    deleteCategory: handleDeleteCategory,
    updateCategory: handleUpdateCategory,
  };
}
