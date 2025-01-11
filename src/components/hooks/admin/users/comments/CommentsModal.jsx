import React, { useState } from "react";

import { X } from "lucide-react";

import styles from "@/components/hooks/admin/users/user.module.scss";

import { User } from "lucide-react";

import Image from "next/image";

export default function CommentModal({ isActive, selectedComment, onClose }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`${styles.modal} ${isActive ? styles.active : ""}`}>
      <div className={styles.modal__content}>
        {selectedComment && (
          <div className={styles.item}>
            <span>{selectedComment.content}</span>

            {selectedComment.replies?.map((reply, index) => (
              <div className={styles.reply} key={index}>
                <div className={styles.info}>
                  {reply.authorPhoto && !imageError ? (
                    <Image
                      src={reply.authorPhoto}
                      alt={reply.author}
                      width={32}
                      height={32}
                      className={styles.avatar}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <User />
                  )}
                  <p>{reply.author}</p>
                  <span>{reply.role}</span>
                </div>
                <span>{reply.content}</span>
              </div>
            ))}

            <button className={styles.modal__close} onClick={onClose}>
              <X />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
