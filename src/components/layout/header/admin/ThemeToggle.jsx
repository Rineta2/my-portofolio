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
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Moon size={20} className={styles.icon} />
      ) : (
        <Sun size={20} className={styles.icon} />
      )}
    </button>
  );
}
