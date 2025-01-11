import styles from "@/components/hooks/admin/article/article.module.scss";

export default function ArticleTags({ formData, availableTags, onChange }) {
  if (!formData.category) return null;

  return (
    <div className={styles.form__single}>
      <label>Tags</label>

      <select
        multiple
        name="tags"
        value={formData.tags}
        onChange={onChange}
        className={styles.multiSelect}
      >
        {availableTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>

      <small className={styles.helpText}>
        Hold Ctrl (Windows) or Command (Mac) to select multiple tags
      </small>
    </div>
  );
}
