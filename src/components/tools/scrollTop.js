"use client";

import { ArrowUpFromDot } from "lucide-react";

import styles from "@/components/layout/header/header.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

import { useState, useEffect } from "react";

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <div
      className={`${styles.scrollTop} ${
        isDarkMode ? styles.dark : styles.light
      } ${show ? styles.show : styles.hide}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUpFromDot />
    </div>
  );
}
