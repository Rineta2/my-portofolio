"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/utils/theme/ThemeContext";

import styles from "@/app/admins/layout.module.scss";

import clsx from "clsx";

export function ThemeToggle({ isOpen }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(styles.themeToggle, isOpen && styles.open)}
    >
      {isDarkMode ? (
        <div className={styles.isDarkMode}>
          <Moon size={20} className={styles.icon} />
          {isOpen && <span>Dark</span>}
        </div>
      ) : (
        <div className={styles.isLightMode}>
          <Sun size={20} className={styles.icon} />
          {isOpen && <span>Light</span>}
        </div>
      )}
    </button>
  );
}
