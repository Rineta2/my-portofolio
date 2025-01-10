import styles from "@/components/hooks/admin/article/article.module.scss";

export default function CategoryPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className={styles.pagination}>
      <span className={styles.pagination_text}>
        Page {currentPage} of {totalPages}
      </span>
      <div className={styles.pagination_buttons}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
