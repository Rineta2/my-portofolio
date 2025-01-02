import React, { useRef } from "react";

import styles from "@/components/section/achievement/achievement.module.scss";

import AchievementItem from "@/components/hooks/section/achievement/AvhievmentItem";

export default function AchievementList({ achievements }) {
  const contentRef = useRef(null);
  const sortedAchievements = [...achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div
      ref={contentRef}
      className={`${styles.achievement__content} achievement__content`}
    >
      {sortedAchievements.map((achievement, index) => (
        <AchievementItem
          key={achievement.id}
          achievement={achievement}
          isActive={index === 0}
          className="achievement__item"
        />
      ))}
    </div>
  );
}
