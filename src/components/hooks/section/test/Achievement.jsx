"use client"

import React, { useState, useEffect } from 'react';

import { fetchAchievements } from "@/utils/lib/achievement/AchievementService";

import Image from "next/image";

export default function Achievement() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAchievements()
            .then(data => setAchievements(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Achievements</h2>
            <div>
                {achievements.map(({ id, imageUrl, title }) => (
                    <div key={id}>
                        <Image src={imageUrl} alt={title} width={500} height={500} quality={100} />
                        <h3>{title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
