"use client";
import React from "react";

import styles from "@/components/section/about/about.module.scss";

import AboutContent from "@/components/hooks/section/about/AboutContent";

import SkillsSection from "@/components/hooks/section/about/SkillsSection";

export default function AboutClient({ about, skills }) {
    return (
        <section className={styles.about} id="about">
            <div className={`${styles.about__container} ${styles.container}`}>
                <AboutContent about={about} />
                <SkillsSection skills={skills} />
            </div>
        </section>
    );
} 