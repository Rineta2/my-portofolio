"use client"

import React, { useState, useEffect, useRef } from 'react';

import Image from "next/image";

import styles from "@/components/section/achievement/achievement.module.scss";

import { useAchievementAnimation } from "@/components/hooks/animation/achievement/useAchievementAnimation";

import { useAchievementAnimationScroll } from "@/components/hooks/animation/achievement/useAchievementAnimationScroll";

import AchievementHeading from "@/components/hooks/section/achievement/AchievementHeading"

import { fetchAchievement } from "@/utils/lib/achievement/FetchAchievement"

export default function AchievementContent({ achievement }) {
    const [achievements, setAchievements] = useState([]);
    const { initializeAnimation } = useAchievementAnimation(styles);
    const { initializeAnimationScroll } = useAchievementAnimationScroll(styles);
    const contentRef = useRef(null);


    useEffect(() => {
        fetchAchievement()
            .then(data => setAchievements(data));
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            const images = contentRef.current.querySelectorAll('img');
            let loadedImages = 0;

            const handleImageLoad = () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    initializeAnimation();
                    initializeAnimationScroll();
                }
            };

            images.forEach(img => {
                if (img.complete) {
                    handleImageLoad();
                } else {
                    img.addEventListener('load', handleImageLoad);
                }
            });

            return () => {
                images.forEach(img => {
                    img.removeEventListener('load', handleImageLoad);
                });
            };
        }
    }, [initializeAnimation, initializeAnimationScroll]);

    return (
        <section className={styles.achievement}>
            <div className={`${styles.achievement__container} ${styles.container}`}>
                <AchievementHeading />

                <div className={styles.achievement__content} ref={contentRef}>
                    {achievements.map(({ id, imageUrl, title }) => (
                        <div key={id} className={styles.achievement__item} style={{
                            cursor: "pointer",
                            perspective: "1000px",
                            transformStyle: "preserve-3d"
                        }}>
                            <div className={styles.img}>
                                <Image src={imageUrl} alt={title} width={500} height={500} quality={100} />

                                <div className={styles.text}>
                                    <h2>{title}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
