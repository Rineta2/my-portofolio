import React from "react";

import { X } from "lucide-react";

import styles from "@/components/hooks/admin/users/user.module.scss";

export default function CommentModal({ isActive, selectedComment, onClose }) {
  return (
    <div className={`${styles.modal} ${isActive ? styles.active : ""}`}>
      <div className={styles.modal__content}>
        {selectedComment && (
          <div className={styles.item}>
            <p>{selectedComment.articleId}</p>
            <span>{selectedComment.content}</span>
            <button className={styles.modal__close} onClick={onClose}>
              <X />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
