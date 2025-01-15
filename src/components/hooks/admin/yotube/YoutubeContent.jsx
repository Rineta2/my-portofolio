"use client";
import React from "react";
import { useTheme } from "@/utils/theme/ThemeContext";

import styles from "@/components/hooks/admin/yotube/youtube.module.scss";

import YoutubeHeader from "@/components/hooks/admin/yotube/YoutubeHeader";

import YoutubeTable from "@/components/hooks/admin/yotube/YoutubeTable";

import YoutubeModal from "@/components/hooks/admin/yotube/YoutubeModal";

import { useYoutubeManagement } from "@/components/hooks/admin/yotube/utils/useYoutubeManagement";

import ReactPaginate from 'react-paginate';

export default function YoutubeContent({ videos, icons, categories }) {
  const {
    search,
    showModal,
    isEditing,
    newVideo,
    itemsPerPage,
    pageNumber,
    pageCount,
    pagesVisited,
    handlePageChange,
    setSearch,
    handleSubmit,
    openModal,
    setShowModal,
    handleDelete,
    setNewVideo,
    handleImageUpload,
  } = useYoutubeManagement(videos, categories);

  const { isDarkMode } = useTheme();

  return (
    <section className={`${styles.youtube} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={`${styles.youtube__container} container`}>
        <YoutubeHeader
          search={search}
          setSearch={setSearch}
          openModal={openModal}
        />

        <YoutubeTable
          videos={videos}
          icons={icons}
          search={search}
          itemsPerPage={itemsPerPage}
          pageNumber={pageNumber}
          pagesVisited={pagesVisited}
          openModal={openModal}
          handleDelete={handleDelete}
        />

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          forcePage={pageNumber}
          previousLinkClassName={styles.pagination__link}
          nextLinkClassName={styles.pagination__link}
          disabledClassName={styles.pagination__link__disabled}
          activeClassName={styles.pagination__link__active}
        />

        {showModal && (
          <YoutubeModal
            isEditing={isEditing}
            newVideo={newVideo}
            categories={categories}
            icons={icons}
            setNewVideo={setNewVideo}
            handleSubmit={handleSubmit}
            setShowModal={setShowModal}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
    </section>
  );
}