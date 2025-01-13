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
            <h3 className={styles.article__name}>
              Nama Artikel: {selectedComment.articleId.replace(/-/g, " ")}
            </h3>

            <div className={styles.profileComments}>
              <div className={styles.profile}>
                <div className={styles.img}>
                  {selectedComment.authorPhoto && !imageError ? (
                    <Image
                      src={selectedComment.authorPhoto}
                      alt={selectedComment.author}
                      width={500}
                      height={500}
                      className={styles.avatar}
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <User />
                  )}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.info__author}>
                    {selectedComment.author}
                  </h3>

                  <span className={styles.info__role}>
                    {selectedComment.role}
                  </span>
                </div>
              </div>

              <p className={styles.commentsContent}>
                {selectedComment.content}
              </p>
            </div>

            {selectedComment.replies?.map((reply, index) => (
              <div className={styles.reply} key={index}>
                <div className={styles.info}>
                  <div className={styles.profile__reply}>
                    {reply.authorPhoto && !imageError ? (
                      <Image
                        src={reply.authorPhoto}
                        alt={reply.author}
                        width={500}
                        height={500}
                        className={styles.avatar}
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <User />
                    )}

                    <div className={styles.info__reply}>
                      <h4>{reply.author}</h4>
                      <span className={styles.reply__role}>{reply.role}</span>
                    </div>
                  </div>
                </div>

                <span className={styles.reply__content}>{reply.content}</span>
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
