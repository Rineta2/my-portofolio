import styles from "@/app/admins/layout.module.scss";

export default function CategorySelect({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className={styles.category__selection}>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
