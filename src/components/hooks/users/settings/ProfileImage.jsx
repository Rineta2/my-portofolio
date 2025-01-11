import React from "react";

import Image from "next/image";

import styles from "@/components/hooks/admin/settings/setting.module.scss";

export default function ProfileImage({ photoURL, onFileChange }) {
  return (
    <div className={styles.settingsItem}>
      <label className={styles.settingsLabel}>Foto Profil</label>

      {photoURL && (
        <Image
          width={100}
          height={100}
          src={photoURL}
          alt="Profile"
          className={styles.profileImage}
        />
      )}

      <input
        type="file"
        onChange={onFileChange}
        accept="image/*"
        className={styles.settingsInput}
      />
    </div>
  );
}
