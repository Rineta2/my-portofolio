"use client";
import React, { useState } from "react";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

import { SearchSlash, Plus, Edit, Trash2 } from "lucide-react";

import { useCategory } from "@/components/hooks/admin/yotube/category/utils/useCategory";

export default function CategoryContent({ videosCategory }) {
  const [newCategory, setNewCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { addCategory, updateCategory, deleteCategory } = useCategory();
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <section>
      <div className={`${styles.youtube__container} container`}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <h1>Category Management</h1>

            <div className={styles.search}>
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchSlash />
            </div>
          </div>

          <div className={styles.addSection}>
            <button
              className={styles.addButton}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus />
              Add Category
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Add New Category</h2>
              <input
                type="text"
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className={styles.modalButtons}>
                <button
                  className={styles.addButton}
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewCategory("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.categoriesList}>
          {videosCategory
            .filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((category) => (
              <div key={category.id} className={styles.categoryItem}>
                {editingId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className={styles.editInput}
                    />

                    <button
                      onClick={() => setEditingId(null)}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => handleEditCategory(category.id)}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{category.name}</span>
                    <div className={styles.actions}>
                      <button
                        onClick={() => {
                          setEditingId(category.id);
                          setEditingName(category.name);
                        }}
                        className={styles.editButton}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className={styles.deleteButton}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
