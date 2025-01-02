"use client";

import React, { useState, useRef } from "react";

import { motion, useInView } from "framer-motion";

import styles from "@/app/portofolio/Portofolio.module.scss";

import { TopProject } from "@/components/hooks/pages/portofolio/TopProject";

import { CategorySidebar } from "@/components/hooks/pages/portofolio/CategorySidebar";

import { ProjectCard } from "@/components/hooks/pages/portofolio/ProjectCard";

import { useTheme } from "@/utils/theme/ThemeContext";

import bg from "@/components/assets/element/Vector_2.png";

import right from "@/components/assets/element/vector3.png";

import Image from "next/image";

import {
  containerVariants,
  itemVariants,
  projectCardVariants,
  backgroundVariants,
  viewportConfig,
} from "@/components/hooks/animation/portofolio/pages/portofolioAnimations";

export default function PortofolioContent({ projects, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  const sortedProjects =
    projects?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) ||
    [];

  const topProjects = sortedProjects.slice(0, 1);
  const remainingProjects = sortedProjects.slice(1);

  const uniqueCategories = categories
    ? [...new Set(categories.map((cat) => cat.category))].map((category) => ({
        id: categories.find((cat) => cat.category === category).id,
        category,
      }))
    : [];

  const filteredProjects = remainingProjects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

  const { isDarkMode } = useTheme();

  return (
    <motion.div
      ref={ref}
      className={`${styles.portofolio__container} ${
        isDarkMode ? styles.dark : styles.light
      } container`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={containerVariants}
    >
      <motion.div
        variants={itemVariants}
        className={styles.top_project_container}
      >
        {topProjects.map((project) => (
          <TopProject key={project.id} project={project} />
        ))}
      </motion.div>

      <motion.div className={styles.content} variants={itemVariants}>
        <CategorySidebar
          categories={uniqueCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <motion.div className={styles.aside} variants={itemVariants}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={projectCardVariants(index)}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.left}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={backgroundVariants.left}
      >
        <Image src={bg} alt="bg" width={500} height={500} />
      </motion.div>

      <motion.div
        className={styles.right}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={backgroundVariants.right}
      >
        <Image src={right} alt="right" width={500} height={500} />
      </motion.div>
    </motion.div>
  );
}
