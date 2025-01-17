"use client";

import React, { useRef } from "react";

import { useTheme } from "@/utils/theme/ThemeContext";

import styles from "@/components/section/achievement/achievement.module.scss";

import Image from "next/image";

import AchievementHeading from "@/components/hooks/section/achievement/AchievmentHeading";

import AchievementList from "@/components/hooks/section/achievement/AchievmentList";

import AchievementModal from "@/components/hooks/section/achievement/AchievmentModal";

import { motion, useInView } from "framer-motion";

import useModalEffects from "@/components/helpers/useModalEffect";

export default function AchievementContent({ achievements, heading }) {
  const { isDarkMode } = useTheme();
  const [selectedAchievement, setSelectedAchievement] = React.useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useModalEffects({
    isOpen: !!selectedAchievement,
    onClose: () => setSelectedAchievement(null),
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`${styles.achievement} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <motion.div
        className={`${styles.achievement__container} container`}
        initial={{ y: 50 }}
        animate={isInView ? { y: 0 } : { y: 50 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <AchievementHeading heading={heading} isInView={isInView} />
        <AchievementList
          achievements={achievements}
          onAchievementClick={setSelectedAchievement}
          isInView={isInView}
        />
      </motion.div>

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
    </motion.section>
  );
}
