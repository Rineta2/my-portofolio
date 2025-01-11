import React from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function CategoryModal({
  isModalOpen,
  editingCategory,
  editedCategoryName,
  newCategory,
  setEditedCategoryName,
  setNewCategory,
  handleAddCategory,
  handleUpdateCategory,
  setIsModalOpen,
  setEditingCategory,
}) {
  if (!isModalOpen) return null;

  return (
    <div className={styles.modal__content}>
      <div className={styles.modal}>
        <input
          type="text"
          placeholder={
            editingCategory ? "Edit category name" : "New category name"
          }
          value={editingCategory ? editedCategoryName : newCategory}
          onChange={(e) => {
            if (editingCategory) {
              setEditedCategoryName(e.target.value);
            } else {
              setNewCategory(e.target.value);
            }
          }}
        />

        <button
          className="btn btn-primary"
          onClick={() => {
            if (editingCategory) {
              handleUpdateCategory(editingCategory, editedCategoryName);
            } else {
              handleAddCategory();
              setIsModalOpen(false);
            }
          }}
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
            setEditedCategoryName("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
