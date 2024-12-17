"use client";

import React from "react";

import styles from "@/components/section/achievement/achievement.module.scss";

import dynamic from "next/dynamic";

const AchievementContent = dynamic(() => import("@/components/hooks/section/achievement/AchievementContent"), { ssr: false });

const AchievementHeading = dynamic(() => import("@/components/hooks/section/achievement/AchievementHeading"), { ssr: false });

export default function AchievementClient({ achievement }) {
    return (
        <section className={styles.achievement}>
            <div className={`${styles.achievement__container} ${styles.container}`}>
                <AchievementHeading />

                <AchievementContent achievement={achievement} />
            </div>
        </section>
    );
} 