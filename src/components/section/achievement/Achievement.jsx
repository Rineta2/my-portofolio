import { fetchAchievement } from "@/utils/lib/achievement/FetchAchievement";

import { achievementHeading } from "@/components/data/Achiement";

import AchievementContent from "@/components/hooks/section/achievement/AchievmentContent";

import { unstable_noStore as noStore } from "next/cache";

export default async function Achievement() {
  const rawAchievements = await fetchAchievement();

  const achievements = rawAchievements.map((achievement) => ({
    ...achievement,
    date: achievement.date?.toDate?.()
      ? achievement.date.toDate().toISOString()
      : new Date(achievement.date).toISOString(),
  }));

  noStore();

  return (
    <AchievementContent
      achievements={achievements}
      heading={achievementHeading}
    />
  );
}
