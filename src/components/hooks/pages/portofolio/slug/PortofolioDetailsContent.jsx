"use client";

import React, { useState } from "react";

import styles from "@/app/portofolio/Portofolio.module.scss";

import ProjectSwiper from "@/components/hooks/pages/portofolio/slug/PortoSwipper";

import ProjectDetails from "@/components/hooks/pages/portofolio/slug/ProjectDetails";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function PortofolioDetailsContent({ project }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { isDarkMode } = useTheme();

  return (
    <section
      className={`${styles.portofolioDetails} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.portofolioDetails__container} container`}>
        <div className={styles.portofolioDetails__content}>
          <ProjectSwiper
            project={project}
            thumbsSwiper={thumbsSwiper}
            setThumbsSwiper={setThumbsSwiper}
          />
          <ProjectDetails project={project} />
        </div>

        <div className={styles.overlay}></div>
        <div className={styles.textContent}>
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </div>
    </section>
  );
}
