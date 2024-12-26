import React from "react";
import styles from "@/app/portofolio/Portofolio.module.scss";

export function CategorySidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  sidebarRef,
}) {
  return (
    <div className={styles.sidebar} ref={sidebarRef}>
      <div className={styles.heading}>
        <h1>Category</h1>
      </div>
      <button
        className={selectedCategory === "all" ? styles.active : ""}
        onClick={() => setSelectedCategory("all")}
      >
        All
      </button>
      {categories?.map(({ id, category }) => (
        <button
          key={id}
          className={selectedCategory === category ? styles.active : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
