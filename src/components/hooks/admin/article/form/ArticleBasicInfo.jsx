import React from "react";
import styles from "@/app/admins/layout.module.scss";

export default function ArticleBasicInfo({ formData, onChange }) {
  return (
    <>
      <div className={styles.form_group}>
        <div className={styles.box}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>

        <div className={styles.box}>
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className={styles.form__single}>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows={3}
        />
      </div>
    </>
  );
}
