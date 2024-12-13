import React, { useEffect, useRef } from "react";

import styles from "@/components/section/achievement/achievement.module.scss";

import AchievementItem from "@/components/hooks/section/achievement/AchievementItem";

import { useAchievementAnimation } from "@/components/hooks/animation/achievement/useAchievementAnimation";

import { useAchievementAnimationScroll } from "@/components/hooks/animation/achievement/useAchievementAnimationScroll";

export default function AchievementContent({ achievement }) {
    const { initializeAnimation } = useAchievementAnimation(styles);
    const { initializeAnimationScroll } = useAchievementAnimationScroll(styles);
    const contentRef = useRef(null);

    useEffect(() => {
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
    }, [initializeAnimation, initializeAnimationScroll]);

    return (
        <div className={styles.achievement__content} ref={contentRef}>
            {achievement.map((item, index) => (
                <AchievementItem key={index} item={item} index={index} />
            ))}
        </div>
    );
}