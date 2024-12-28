"use client";
import React from "react";

import styles from "@/components/section/about/about.module.scss";

import AboutContent from "@/components/hooks/section/about/AboutContent";

import SkillsSection from "@/components/hooks/section/about/SkillsSection";

import { useTheme } from "@/utils/theme/ThemeContext";

export default function AboutClient({ about, skills }) {
    const { isDarkMode } = useTheme();

    return (
        <section className={`${styles.about} ${isDarkMode ? styles.dark : styles.light}`} id="about">
            <div className={`${styles.about__container} container`}>
                <AboutContent about={about} />
                <SkillsSection skills={skills} />
            </div>
        </section>
    );
} 