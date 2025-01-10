import React from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function CategoryToolbar({
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
}) {
  return (
    <div className={styles.category__toolbar}>
      <div className={styles.heading}>
        <h1>Category</h1>
        <input
          type="text"
          placeholder="Search Category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.add_category}>
        <button onClick={() => setIsModalOpen(true)}>Add Category</button>
      </div>
    </div>
  );
}
