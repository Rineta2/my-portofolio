import styles from "@/app/articles/Articles.module.scss";

export default function ArticleTags({ tags }) {
  return (
    <div className={styles.buttons__share}>
      <div className={styles.tags}>
        <h3>Tags :</h3>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
