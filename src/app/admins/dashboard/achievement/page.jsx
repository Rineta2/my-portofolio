import React from "react";

import AchievementContent from "@/components/hooks/admin/achievement/AchievementContent";

import {
  fetchAchievement,
  handleDelete,
} from "@/components/hooks/admin/achievement/utils/FetchAchievement";

export async function generateMetadata() {
  return {
    title: `Achievement Management`,
    description: `Manage achievement section content and settings`,
  };
}

export default async function Achievement() {
  const achievementList = await fetchAchievement();
  return (
    <AchievementContent
      achievementList={achievementList}
      handleDelete={handleDelete}
    />
  );
}
