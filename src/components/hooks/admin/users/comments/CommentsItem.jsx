import React, { useState } from "react";

import Image from "next/image";

import { User, CircleEllipsis } from "lucide-react";

import styles from "@/components/hooks/admin/users/user.module.scss";

export default function CommentItem({ comment, index, onCommentClick }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.comments__item}>
      <div className={styles.profile}>
        {comment.authorPhoto && !imageError ? (
          <Image
            src={comment.authorPhoto}
            alt={"author photo"}
            width={500}
            height={500}
            onError={() => setImageError(true)}
          />
        ) : (
          <User className={styles.user__icon} />
        )}
        <div className={styles.info}>
          <h3>{comment.author}</h3>
          <span>{comment.role}</span>
        </div>
      </div>

      <span className={styles.date}>
        {new Date(comment.createdAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </span>
      <div className={styles.icons} onClick={() => onCommentClick(comment)}>
        <CircleEllipsis />
      </div>
    </div>
  );
}
