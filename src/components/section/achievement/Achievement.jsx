import { fetchAchievement } from "@/utils/lib/achievement/FetchAchievement";

import { achievementHeading } from "@/components/data/Achiement";

import AchievementContent from "@/components/hooks/section/achievement/AchievmentContent";

export default async function Achievement() {
  const achievements = await fetchAchievement();

  return (
    <AchievementContent
      achievements={achievements}
      heading={achievementHeading}
    />
  );
}
