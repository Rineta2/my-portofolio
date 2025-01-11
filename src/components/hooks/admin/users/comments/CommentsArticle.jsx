"use client";

import React from "react";
import CommentsList from "@/components/hooks/admin/users/comments/CommentsList";

import CommentModal from "@/components/hooks/admin/users/comments/CommentsModal";

import styles from "@/components/hooks/admin/users/user.module.scss";

import { useModal } from "@/components/hooks/admin/users/comments/utils/useModal";

export default function CommentsArticle({ comments }) {
  const {
    isActive,
    selectedItem: selectedComment,
    openModal,
    closeModal,
  } = useModal();

  return (
    <section className={styles.comments}>
      <div className={`${styles.comments__container} container`}>
        <CommentsList comments={comments} onCommentClick={openModal} />
      </div>

      <CommentModal
        isActive={isActive}
        selectedComment={selectedComment}
        onClose={closeModal}
      />
    </section>
  );
}
