import styles from "@/app/admins/layout.module.scss"

export default function TagList({ tags, onEditTag, onDeleteTag }) {
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
                    {tags.map(tag => (
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
                                        onClick={() => onDeleteTag(tag.id)}
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
    )
}