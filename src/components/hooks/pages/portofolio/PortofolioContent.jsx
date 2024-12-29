"use client";

import React, { useState, useRef } from "react";

import styles from "@/app/portofolio/Portofolio.module.scss";

import { usePortfolioAnimations } from "@/components/hooks/animation/portofolio/usePortofolioAnimations";

import { TopProject } from "@/components/hooks/pages/portofolio/TopProject";

import { CategorySidebar } from "@/components/hooks/pages/portofolio/CategorySidebar";

import { ProjectCard } from "@/components/hooks/pages/portofolio/ProjectCard";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function PortofolioContent({ projects, categories }) {
  const sortedProjects = projects?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const topProjects = sortedProjects?.slice(0, 1);
  const remainingProjects = sortedProjects?.slice(1);

  const uniqueCategories = [
    ...new Set(categories?.map((cat) => cat.category)),
  ].map((category) => ({
    id: categories.find((cat) => cat.category === category).id,
    category,
  }));

  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredProjects = remainingProjects?.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  const topProjectRef = useRef(null);
  const sidebarRef = useRef(null);
  const projectsRef = useRef([]);

  usePortfolioAnimations(
    topProjectRef,
    sidebarRef,
    projectsRef,
    filteredProjects,
    selectedCategory
  );

  const { isDarkMode } = useTheme();

  return (
    <div className={`${styles.portofolio__container} ${isDarkMode ? styles.dark : styles.light} container`}>
      <div ref={topProjectRef}>
        {topProjects?.map((project) => (
          <TopProject key={project.id} project={project} />
        ))}
      </div>

      <div className={styles.content}>
        <CategorySidebar
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sidebarRef={sidebarRef}
        />

        <div className={styles.aside}>
          {filteredProjects?.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              ref={(el) => (projectsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
