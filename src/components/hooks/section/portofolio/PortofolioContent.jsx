"use client";

import React, { useEffect, useState } from "react";

import PortfolioHeader from "@/components/hooks/section/portofolio/PortofolioHeader";

import styles from "@/components/section/portofolio/portofolio.module.scss";

import { useTheme } from "@/utils/theme/ThemeContext";

import ProjectCard from "@/components/hooks/section/portofolio/PortofolioCard";

import Image from "next/image";

export default function PortofolioContent({ portofolio, data }) {
  const { isDarkMode } = useTheme();
  const [sortedProjects, setSortedProjects] = useState([]);

  useEffect(() => {
    if (portofolio) {
      const sorted = [...portofolio].slice(0, 3);
      setSortedProjects(sorted);
    }
  }, [portofolio]);

  return (
    <section
      className={`${styles.portofolio} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.portofolio__container} container`}>
        <PortfolioHeader data={data} />

        <div className={styles.content}>
          {sortedProjects.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <div className={styles.bg}>
        <Image
          src={data?.img}
          alt={data?.title}
          quality={100}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
