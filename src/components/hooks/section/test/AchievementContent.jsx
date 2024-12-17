"use client"

import React from 'react';
import Image from "next/image";

export default function AchievementContent({ achievement }) {
    if (!achievement) return <div>Loading...</div>;

    return (
        <div>
            <h2>Achievements</h2>
            <div>
                {achievement.map(({ id, imageUrl, title }) => (
                    <div key={id}>
                        <Image src={imageUrl} alt={title} width={500} height={500} quality={100} />
                        <h3>{title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
