import React from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function ProjectDetails({ formData, handleChange, categories }) {
  return (
    <div className={styles.form__double}>
      <div className={styles.project__form__input}>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.project__form__input}>
        <label>Preview Link:</label>
        <input
          type="url"
          name="previewLink"
          value={formData.previewLink}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
}
