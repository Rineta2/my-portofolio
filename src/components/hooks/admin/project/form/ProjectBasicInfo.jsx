import React from "react";

import { format } from "date-fns";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function ProjectBasicInfo({ formData, handleChange }) {
  // Handler untuk mengubah format tanggal dan waktu
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    handleChange({
      target: {
        name: "date",
        value: format(date, "yyyy-MM-dd HH:mm"),
      },
    });
  };

  return (
    <>
      <div className={styles.form__double}>
        <div className={styles.project__form__input}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.project__form__input}>
          <label>Slug:</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
      </div>

      <div className={styles.form__double}>
        <div className={styles.project__form__input}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.project__form__input}>
          <label>Date:</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date || ""}
            onChange={handleDateChange}
            required
          />
        </div>
      </div>
    </>
  );
}
