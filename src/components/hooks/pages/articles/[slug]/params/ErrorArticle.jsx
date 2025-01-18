import styles from "@/app/articles/Articles.module.scss";

export default function ErrorArticle() {
  return (
    <section>
      <div className={`${styles.article__container} ${styles.container}`}>
        <h1 className={styles.article__title}>Error</h1>
        <p>An error occurred while loading the article.</p>
      </div>
    </section>
  );
}
