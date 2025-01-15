import React from "react";

import ReactPaginate from 'react-paginate';

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

export default function CategoryPagination({ pageCount, handlePageChange }) {
    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={styles.pagination}
            previousLinkClassName={styles.pagination__link}
            nextLinkClassName={styles.pagination__link}
            disabledClassName={styles.pagination__link__disabled}
            activeClassName={styles.pagination__link__active}
        />
    );
}