import React from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function CategoryList({
  currentItems,
  setEditingCategory,
  setEditedCategoryName,
  setIsModalOpen,
  handleDeleteCategory,
}) {
  return (
    <div className={styles.table_container}>
      <table className={styles.category_table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td className={styles.action_buttons}>
                <button
                  className={styles.btn_secondary}
                  onClick={() => {
                    setEditingCategory(category.id);
                    setEditedCategoryName(category.name);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.btn_danger}
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
