import styles from "@/components/hooks/admin/article/article.module.scss";

export default function TagList({ tags, onEditTag, onDeleteTag }) {
  const handleDelete = async (tagId) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      await onDeleteTag(tagId);
    }
  };
  return (
    <div className={styles.tags__list}>
      <table className={styles.tags__list__table}>
        <thead>
          <tr>
            <th>Tag Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag.id}>
              <td>
                <span>{tag.name}</span>
              </td>
              <td>
                <div className={styles.tags__list__table__actions}>
                  <button
                    onClick={() => onEditTag(tag)}
                    className={styles.tags__list__table__edit__button}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className={styles.tags__list__table__delete__button}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
