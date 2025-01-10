import React, { useRef } from "react";

import styles from "@/components/hooks/admin/project/project.module.scss";

export default function IconForm({ addIcon }) {
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (file) {
      await addIcon(file);
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.techStack__form}>
      <div className={styles.form__group}>
        <input type="file" ref={fileInputRef} accept="image/*" required />
        <button type="submit">Upload Icon</button>
      </div>
    </form>
  );
}
