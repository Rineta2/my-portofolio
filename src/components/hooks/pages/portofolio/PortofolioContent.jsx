"use client"

import React, { useRef } from 'react';

import styles from "@/app/portofolio/Portofolio.module.scss";

import TopProject from "@/components/hooks/pages/portofolio/TopProject";

import CategorySidebar from '@/components/hooks/pages/portofolio/CategorySidebar';

import ProjectCard from '@/components/hooks/pages/portofolio/ProjectCard';

import { usePortfolioData } from '@/components/hooks/pages/portofolio/utils/usePortofolioData';

import { usePortfolioAnimations } from '@/components/hooks/animation/portofolio/usePortofolioAnimations';

export default function PortofolioContent() {
    const {
        selectedCategory,
        setSelectedCategory,
        projects,
        uniqueCategories,
        topProjects,
        filteredRemainingProjects
    } = usePortfolioData();

    const topProjectRef = useRef(null);
    const sidebarRef = useRef(null);
    const projectsRef = useRef([]);

    usePortfolioAnimations(topProjectRef, sidebarRef, projectsRef, projects, selectedCategory);

    return (
        <div className={`${styles.portofolio__container} ${styles.container}`}>
            <div ref={topProjectRef}>
                {topProjects.map((item, index) => (
                    <TopProject key={index} project={item} />
                ))}
            </div>

            <div className={styles.content}>
                <CategorySidebar
                    categories={uniqueCategories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sidebarRef={sidebarRef}
                />

                <aside className={styles.aside}>
                    {filteredRemainingProjects.map((item, index) => (
                        <ProjectCard
                            key={index}
                            project={item}
                            projectRef={el => projectsRef.current[index] = el}
                        />
                    ))}
                </aside>
            </div>
        </div>
    );
}
