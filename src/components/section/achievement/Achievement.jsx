import React from "react";
import { unstable_noStore as noStore } from 'next/cache';

import AchievementClient from "@/components/hooks/section/achievement/achievementClient";

import { getAchievement } from "@/utils/lib/achievement/read_server";

export default async function Achievement() {
    noStore();
    const achievement = await getAchievement();

    if (!achievement) {
        return <div>Halaman Tidak Ditemukan</div>;
    }

    return <AchievementClient achievement={achievement} />;
}
