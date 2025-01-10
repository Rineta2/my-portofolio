import { useState } from "react";

import styles from "@/components/hooks/admin/article/article.module.scss";

import { X } from "lucide-react";

export default function TagFormModal({
  onAddTag,
  onUpdateTag,
  onClose,
  editingTag,
  categories,
}) {
  const [tagName, setTagName] = useState(editingTag ? editingTag.name : "");
  const [selectedCategory, setSelectedCategory] = useState(
    editingTag ? editingTag.categoryId : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingTag) {
        await onUpdateTag(editingTag.id, tagName);
      } else {
        const success = await onAddTag(tagName, selectedCategory);
        if (success) {
          onClose();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modal__overlay}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h2>{editingTag ? "Edit Tag" : "Add New T ag"}</h2>

          <button onClick={onClose} className={styles.modal__close}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.add__new__tag__form}>
          <div className={styles.form__group}>
            <label htmlFor="tagName">Tag Name:</label>
            <input
              type="text"
              id="tagName"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              required
            />
          </div>

          {!editingTag && (
            <div className={styles.form__group}>
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.modal__actions}>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={isSubmitting ? styles.loading : ""}
            >
              {isSubmitting ? "Saving..." : editingTag ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
