"use client";

import React from "react";

import AboutTable from "@/components/hooks/admin/about/AboutTable";

import AboutToolbar from "@/components/hooks/admin/about/AboutToolbar";

import styles from "@/components/hooks/admin/about/about.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function AboutContent({ aboutList, handleDelete }) {
  const { isDarkMode } = useTheme();
  return (
    <section
      className={`${styles.about} ${isDarkMode ? styles.dark : styles.light}`}
    >
      <div className={`${styles.about__container} ${styles.container}`}>
        <AboutToolbar />

        <AboutTable aboutList={aboutList} handleDelete={handleDelete} />
      </div>
    </section>
  );
}
