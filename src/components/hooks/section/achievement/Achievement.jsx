import { fetchAchievement } from "@/utils/lib/achievement/FetchAchievement"

import { achievementHeading } from "@/components/data/Achiement"

import AchievementContent from "@/components/hooks/section/achievement/AchievmentContent"

export default async function Achievement() {

    const rawAchievements = await fetchAchievement();

    const achievements = rawAchievements.map(achievement => ({
        ...achievement,
        date: achievement.date?.toDate?.()
            ? achievement.date.toDate().toISOString()
            : new Date(achievement.date).toISOString()
    }));

    return (
        <AchievementContent achievements={achievements} heading={achievementHeading} />
    )
}
