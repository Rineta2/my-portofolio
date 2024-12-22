import styles from '@/app/admins/layout.module.scss'

export default function CategoryModal({
    isOpen,
    setIsModalOpen,
    editingCategory,
    setEditingCategory,
    newCategory,
    setNewCategory,
    handleAddCategory,
    handleEditCategory
}) {
    if (!isOpen) return null

    return (
        <div className={styles.modal__content}>
            <div className={styles.modal}>
                <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
                <input
                    type="text"
                    placeholder="Category name"
                    value={editingCategory ? editingCategory.name : newCategory}
                    onChange={(e) => editingCategory
                        ? setEditingCategory({ ...editingCategory, name: e.target.value })
                        : setNewCategory(e.target.value)
                    }
                />
                <button onClick={editingCategory ? handleEditCategory : handleAddCategory}>
                    {editingCategory ? 'Update' : 'Add'}
                </button>
                <button onClick={() => {
                    setIsModalOpen(false)
                    setEditingCategory(null)
                    setNewCategory('')
                }}>
                    Cancel
                </button>
            </div>
        </div>
    )
}