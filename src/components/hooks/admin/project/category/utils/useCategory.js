import { useState, useEffect } from "react";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/components/hooks/admin/project/category/utils/category";

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await getCategories();
    if (result.success) {
      setCategories(result.data);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    const result = await createCategory({ name: newCategory });
    if (result.success) {
      setNewCategory("");
      fetchCategories();
    }
  };

  const handleUpdateCategory = async (categoryId, newName) => {
    const result = await updateCategory(categoryId, { name: newName });
    if (result.success) {
      setEditingCategory(null);
      setIsModalOpen(false);
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        fetchCategories();
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handlePageChange,
    setEditingCategory,
    setEditedCategoryName,
    setNewCategory,
  };
}
