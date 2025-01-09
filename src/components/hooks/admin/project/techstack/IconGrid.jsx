import React from "react";

import Image from "next/image";

import styles from "@/app/admins/layout.module.scss";

export default function IconGrid({ icons, deleteIcon }) {
  return (
    <div className={styles.content}>
      {icons.data.map((icon) => (
        <div key={icon.id} className={styles.iconItem}>
          <Image
            src={icon.url}
            alt="Tech Stack Icon"
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
          <button
            onClick={() => deleteIcon(icon.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
