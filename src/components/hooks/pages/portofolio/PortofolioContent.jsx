"use client"

import React, { useState, useEffect, useRef } from 'react'

import styles from "@/app/portofolio/Portofolio.module.scss"

import { parseISO, compareDesc } from 'date-fns'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
    initializeAnimations,
    categoryChangeAnimation,
} from '@/components/hooks/animation/portofolio/portofolioAnimations'

import TopProject from "@/components/hooks/pages/portofolio/TopProject"

import CategorySidebar from '@/components/hooks/pages/portofolio/CategorySidebar'

import ProjectCard from '@/components/hooks/pages/portofolio/ProjectCard'

import { fetchProjects } from '@/utils/lib/project/ProjectService'

export default function PortofolioContent() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [projects, setProjects] = useState([])
    const topProjectRef = useRef(null)
    const sidebarRef = useRef(null)
    const projectsRef = useRef([])

    useEffect(() => {
        const loadProjects = async () => {
            const projectData = await fetchProjects()
            setProjects(projectData)
        }
        loadProjects()
    }, [])

    const uniqueCategories = [...new Set(projects.map(item => item.category))]

    const allSortedProjects = [...projects].sort((a, b) => {
        return compareDesc(parseISO(a.date), parseISO(b.date))
    })

    const topProjects = allSortedProjects.slice(0, 1)

    const filteredRemainingProjects = selectedCategory === 'all'
        ? allSortedProjects.filter(project => !topProjects.includes(project))
        : allSortedProjects.filter(project =>
            !topProjects.includes(project) && project.category === selectedCategory
        )

    useEffect(() => {
        initializeAnimations(topProjectRef, sidebarRef, projectsRef);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        categoryChangeAnimation(projectsRef);
    }, [selectedCategory]);

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
    )
}
