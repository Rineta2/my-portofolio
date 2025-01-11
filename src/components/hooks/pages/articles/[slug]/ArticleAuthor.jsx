import Image from "next/image";

import styles from "@/app/articles/Articles.module.scss";

export default function ArticleAuthor({ authorPhoto, authorName, role }) {
  return (
    <div className={styles.author}>
      <Image
        src={authorPhoto}
        width={500}
        height={500}
        alt={authorName}
        quality={100}
      />
      <div className={styles.author__info}>
        <span>{authorName}</span>
        <span>{role}</span>
      </div>
    </div>
  );
}
