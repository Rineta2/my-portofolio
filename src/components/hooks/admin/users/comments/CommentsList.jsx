import React from "react";

import CommentItem from "@/components/hooks/admin/users/comments/CommentsItem";

import styles from "@/components/hooks/admin/users/user.module.scss";

export default function CommentsList({ comments, onCommentClick }) {
  return (
    <div className={styles.content}>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          index={index}
          comment={comment}
          onCommentClick={onCommentClick}
        />
      ))}
    </div>
  );
}
