"use client";

import React, { useState, useEffect } from "react";

import { subscribeToAchievement } from "@/utils/lib/achievement/FetchAchievement";

import { achievementHeading } from "@/components/data/Achievement";

import AchievementContent from "@/components/hooks/section/achievement/AchievmentContent";

export default function Achievement() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToAchievement(setAchievements);

    return () => unsubscribe();
  }, []);

  return (
    <AchievementContent
      achievements={achievements}
      heading={achievementHeading}
    />
  );
}
