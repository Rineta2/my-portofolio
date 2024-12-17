import React from 'react'

import { getAchievement } from "@/utils/lib/achievement/read_server"

import Image from "next/image"

export const dynamic = 'force-dynamic'

export default async function Achievement() {
    const achievement = await getAchievement();

    return (
        <section>
            <h1>Achievement</h1>

            <ol>
                {achievement?.map((item, index) => (
                    <AchievementCard key={index} achievement={item} />
                ))}
            </ol>
        </section>
    )
}

export function AchievementCard({ achievement }) {
    return (
        <li key={achievement?.id}>
            <Image src={achievement?.imageUrl} alt={achievement?.title} width={500} height={500} quality={100} />
            <h2>{achievement?.title}</h2>
        </li>
    )
}
