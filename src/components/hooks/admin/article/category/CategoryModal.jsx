import styles from "@/app/admins/layout.module.scss";
import { useState, useEffect } from "react";

export default function CategoryModal({
  isOpen,
  onClose,
  editingCategory,
  onSubmit,
  isLoading,
}) {
  const [categoryName, setCategoryName] = useState(editingCategory?.name || "");

  useEffect(() => {
    setCategoryName(editingCategory?.name || "");
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(categoryName);
  };

  const handleClose = () => {
    setCategoryName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal__content}>
      <div className={styles.modal}>
        <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
        <input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : editingCategory ? "Update" : "Add"}
        </button>
        <button onClick={handleClose} disabled={isLoading}>
          Cancel
        </button>
      </div>
    </div>
  );
}
