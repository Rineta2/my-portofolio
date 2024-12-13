import React from "react";

import Image from "next/image";

import styles from "@/components/section/achievement/achievement.module.scss";

export default function AchievementItem({ item, index }) {
    return (
        <div
            className={styles.achievement__item}
            style={{
                cursor: "pointer",
                perspective: "1000px",
                transformStyle: "preserve-3d"
            }}
        >
            <div className={styles.img}>
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    quality={100}
                    width={500}
                    height={500}
                    priority={index < 6}
                />
                <div className={styles.text}>
                    <h2>{item.title}</h2>
                </div>
            </div>
        </div>
    );
}