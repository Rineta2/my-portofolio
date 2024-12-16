import styles from "@/app/portofolio/Portofolio.module.scss"

export default function CategorySidebar({ categories, selectedCategory, onCategoryChange, sidebarRef }) {
    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            <div className={styles.heading}>
                <h1>Category</h1>
            </div>
            <button
                className={selectedCategory === 'all' ? styles.active : ''}
                onClick={() => onCategoryChange('all')}
            >
                All
            </button>
            {categories.map((category, index) => (
                <button
                    key={index}
                    className={selectedCategory === category ? styles.active : ''}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}