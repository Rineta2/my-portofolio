import React from 'react'

import AchievementContent from "@/components/hooks/section/test/AchievementContent"

import { fetchAchievements } from "@/utils/lib/achievement/AchievementService";

export default async function Achievement() {

    const achievement = await fetchAchievements();

    if (!achievement) {
        return <div>Halaman Tidak Ditemukan</div>;
    }

    return (
        <AchievementContent achievement={achievement} />
    )
}
