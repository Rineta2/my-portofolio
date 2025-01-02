"use client";

import React, { useRef } from "react";

import { useTheme } from "@/utils/theme/ThemeContext";

import styles from "@/components/section/achievement/achievement.module.scss";

import Image from "next/image";

import AchievementHeading from "@/components/hooks/section/achievement/AchievmentHeading";

import AchievementList from "@/components/hooks/section/achievement/AchievmentList";

import AchievementModal from "@/components/hooks/section/achievement/AchievmentModal";

import useAchievementAnimation from "@/components/hooks/animation/achievement/useAchievementAnimations";

export default function AchievementContent({ achievements, heading }) {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const [selectedAchievement, setSelectedAchievement] = React.useState(null);

  useAchievementAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`${styles.achievement} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.achievement__container} container`}>
        <AchievementHeading heading={heading} />
        <AchievementList
          achievements={achievements}
          onAchievementClick={setSelectedAchievement}
        />
      </div>

      <div className={styles.bg}>
        <Image
          src={heading.bg}
          alt="bg"
          width={500}
          height={500}
          quality={100}
        />
      </div>

      <AchievementModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
}
