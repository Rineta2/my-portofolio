import React from "react";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function CategoryModal({
    isModalOpen,
    isEditing,
    newCategory,
    editingName,
    setNewCategory,
    setEditingName,
    handleAddCategory,
    handleEditCategory,
    editingId,
    setIsModalOpen,
    setIsEditing,
    setEditingId
}) {
    if (!isModalOpen) return null;

    return (
        <div className={styles.modal__container}>
            <div className={styles.modal}>
                <h2>{isEditing ? 'Edit Category' : 'Add New Category'}</h2>

                <input
                    type="text"
                    placeholder={isEditing ? "Edit category name" : "New category name"}
                    value={isEditing ? editingName : newCategory}
                    className={styles.input}
                    onChange={(e) =>
                        isEditing
                            ? setEditingName(e.target.value)
                            : setNewCategory(e.target.value)
                    }
                />

                <div className={styles.modalButtons}>
                    <button
                        className={styles.addButton}
                        onClick={() =>
                            isEditing
                                ? handleEditCategory(editingId)
                                : handleAddCategory()
                        }
                    >
                        {isEditing ? 'Save Changes' : 'Add Category'}
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={() => {
                            setIsModalOpen(false);
                            setNewCategory("");
                            setEditingName("");
                            setIsEditing(false);
                            setEditingId(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}