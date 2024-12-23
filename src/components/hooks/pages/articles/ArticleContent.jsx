import styles from "@/app/articles/Articles.module.scss";

import Image from "next/image";

import { formatDate } from "@/components/tools/formatDate";

import Link from "next/link";

export default function ArticleContent({ articles }) {
  return (
    <div className={styles.articleContainer}>
      <h1>Article Content</h1>

      {articles?.map((article) => (
        <div key={article.id}>
          <div className={styles.img}>
            <Image
              src={article.imageUrl}
              width={500}
              height={500}
              alt={article.title}
              quality={100}
            />
          </div>

          <div className={styles.text}>
            <div className={styles.toolbar}>
              <span className={styles.category}>{article.categoryName}</span>

              <span className={styles.date}>
                {formatDate(article.publishDate)}
              </span>
            </div>

            <h1>{article.title}</h1>

            <Link href={`/articles/${article.slug}`}>Read More</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
