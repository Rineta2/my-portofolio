import React from "react";

import styles from "@/app/admins/layout.module.scss";

import Image from "next/image";

import { useIcons } from "@/components/hooks/admin/project/techstack/utils/useIcons";

export default function TechStack({ formData, handleIconToggle }) {
  const { icons } = useIcons();

  return (
    <div className={styles.tech}>
      <label>Tech Stack:</label>
      <div className={styles.techStackGrid}>
        {icons.map((icon) => (
          <div
            key={icon.id}
            className={`${styles.iconItem} ${
              formData.icons.includes(icon.url) ? styles.active : ""
            }`}
            onClick={() => handleIconToggle(icon)}
          >
            <Image
              src={icon.url}
              alt="Tech Stack Icon"
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
