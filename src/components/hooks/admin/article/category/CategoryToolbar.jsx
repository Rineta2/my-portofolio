import styles from "@/components/hooks/admin/article/article.module.scss";

export default function CategoryToolbar({
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  isLoading,
}) {
  return (
    <div className={styles.category__toolbar}>
      <div className={styles.heading}>
        <h1>Article Categories</h1>

        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className={styles.add_category}>
        <button onClick={() => setIsModalOpen(true)} disabled={isLoading}>
          Add New Category
        </button>
      </div>
    </div>
  );
}
