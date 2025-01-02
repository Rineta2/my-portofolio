"use client";

import React, { useRef } from "react";
import PortfolioHeader from "@/components/hooks/section/portofolio/PortofolioHeader";
import styles from "@/components/section/portofolio/portofolio.module.scss";
import Background from "@/components/hooks/animation/portofolio/Background";
import { useTheme } from "@/utils/theme/ThemeContext";
import ProjectCard from "@/components/hooks/section/portofolio/PortofolioCard";
import usePortfolioAnimation from "@/components/hooks/animation/portofolio/usePortofolioAnimation";

export default function PortofolioContent({ project, data }) {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const boxRefs = useRef([]);
  usePortfolioAnimation(containerRef, boxRefs);

  return (
    <section
      className={`${styles.portofolio} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <Background isDarkMode={isDarkMode} />
      <div
        ref={containerRef}
        className={`${styles.portofolio__container} container`}
      >
        <PortfolioHeader data={data} />

        <div className={styles.content}>
          {project
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3)
            .map((item, index) => (
              <ProjectCard
                key={index}
                item={item}
                ref={(el) => (boxRefs.current[index] = el)}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
