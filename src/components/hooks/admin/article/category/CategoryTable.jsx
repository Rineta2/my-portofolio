import styles from '@/app/admins/layout.module.scss'

export default function CategoryTable({
    currentItems,
    setEditingCategory,
    setIsModalOpen,
    handleDeleteCategory
}) {
    return (
        <div className={styles.table_container}>
            <table className={styles.category_table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <div className={styles.action_buttons}>
                                    <button
                                        className={styles.btn_secondary}
                                        onClick={() => {
                                            setEditingCategory(category)
                                            setIsModalOpen(true)
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={styles.btn_danger}
                                        onClick={() => handleDeleteCategory(category.id)}
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