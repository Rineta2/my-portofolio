import { useState } from "react";

import { useCategory } from "@/components/hooks/admin/yotube/category/utils/useCategory";

export const useCategoryState = (videosCategory) => {
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [itemsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  const { addCategory, updateCategory, deleteCategory } = useCategory();

  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(
    videosCategory.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategory({
        name: newCategory,
        createdAt: new Date().toISOString(),
      });
      setNewCategory("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async (id) => {
    if (!editingName.trim()) return;
    try {
      await updateCategory(id, { name: editingName });
      setEditingId(null);
      setEditingName("");
      setIsModalOpen(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return {
    // States
    newCategory,
    searchTerm,
    editingId,
    editingName,
    isModalOpen,
    isEditing,
    itemsPerPage,
    pageNumber,
    // Computed values
    pagesVisited,
    pageCount,
    // Setters
    setNewCategory,
    setSearchTerm,
    setEditingId,
    setEditingName,
    setIsModalOpen,
    setIsEditing,
    setPageNumber,
    // Handlers
    handlePageChange,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
  };
};
