"use client";
import React from "react";
import useSWR from 'swr';
import styles from "@/components/section/achievement/achievement.module.scss";
import dynamic from "next/dynamic";

const AchievementContent = dynamic(() => import("@/components/hooks/section/achievement/AchievementContent"), { ssr: false });
const AchievementHeading = dynamic(() => import("@/components/hooks/section/achievement/AchievementHeading"), { ssr: false });

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function AchievementClient({ achievement: initialData }) {
    const { data: achievement } = useSWR('/api/achievements', fetcher, {
        fallbackData: initialData,
        refreshInterval: 1000 // Refresh every second
    });

    return (
        <section className={styles.achievement}>
            <div className={`${styles.achievement__container} ${styles.container}`}>
                <AchievementHeading />
                <AchievementContent achievement={achievement} />
            </div>
        </section>
    );
} 