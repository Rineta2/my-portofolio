"use client"

import React, { useRef } from 'react';

import Image from 'next/image';

import styles from "@/components/section/portofolio/portofolio.module.scss";

import { useTheme } from '@/utils/theme/ThemeContext';

import PortfolioHeader from '@/components/hooks/section/portofolio/PortofolioHeader';

import ProjectCard from '@/components/hooks/section/portofolio/PortofolioCard';

import usePortfolioAnimation from '@/components/hooks/animation/portofolio/usePortofolioAnimation';

export default function PortofolioContent({ project, data }) {
    const { isDarkMode } = useTheme();
    const toolbarRef = useRef(null);
    const contentRef = useRef(null);

    usePortfolioAnimation(toolbarRef, contentRef);

    return (
        <section className={`${styles.portofolio} ${isDarkMode ? styles.dark : styles.light}`}>
            <div className={`${styles.portofolio__container} container`}>
                <PortfolioHeader data={data} ref={toolbarRef} />

                <div className={styles.portofolio__content} ref={contentRef}>
                    {project
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 6)
                        .map((item, index) => (
                            <ProjectCard key={index} item={item} />
                        ))}
                </div>
            </div>

            <div className={styles.bg}>
                <Image src={data.img} alt={data.title} width={500} height={500} quality={100} />
            </div>
        </section>
    );
}
