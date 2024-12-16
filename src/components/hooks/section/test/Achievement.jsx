import React from 'react'

import { getAchievement } from "@/utils/lib/achievement/read_server"

import Image from "next/image"

export default async function Achievement() {
    const achievement = await getAchievement();

    return (
        <section>
            <h1>Achievement</h1>

            <ol>
                {achievement?.map((item, index) => (
                    <li key={index}>
                        <Image src={item?.imageUrl} alt={item?.title} width={500} height={500} quality={100} />
                        <h2>{item?.title}</h2>
                    </li>
                ))}
            </ol>
        </section>
    )
}
