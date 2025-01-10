import React from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <span className={styles.pagination_text}>
        Page {currentPage} of {totalPages}
      </span>

      <div className={styles.pagination_buttons}>
        <button
          onClick={handleNext}
          className={styles.btn_secondary}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        <button
          onClick={handlePrevious}
          className={styles.btn_secondary}
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
