import styles from '@/app/admins/layout.module.scss'

export default function CategoryToolbar({ searchTerm, setSearchTerm, setIsModalOpen }) {
    return (
        <div className={styles.category__toolbar}>
            <div className={styles.heading}>
                <h1>Article Categories</h1>
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.add_category}>
                <button onClick={() => setIsModalOpen(true)}>
                    Add Category
                </button>
            </div>
        </div>
    )
}