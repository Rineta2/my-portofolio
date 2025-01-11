import React from "react";

import styles from '@/components/layout/header/header.module.scss';

export default function AuthModalHeader({ activeTab, onTabChange }) {
  return (
    <div className={styles.formHeader}>
      <button
        className={`${styles.button} ${activeTab === "login" ? styles.active : ""
          }`}
        onClick={() => onTabChange("login")}
      >
        Login
      </button>

      <button
        className={`${styles.button} ${activeTab === "register" ? styles.active : ""
          }`}
        onClick={() => onTabChange("register")}
      >
        Register
      </button>
    </div>
  );
}
