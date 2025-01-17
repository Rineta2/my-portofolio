import React, { useRef } from "react";
import { motion } from "framer-motion";

import styles from "@/components/section/achievement/achievement.module.scss";

import AchievementItem from "@/components/hooks/section/achievement/AvhievmentItem";

export default function AchievementList({
  achievements,
  onAchievementClick,
  isInView,
}) {
  const contentRef = useRef(null);
  const sortedAchievements = [...achievements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <motion.div
      ref={contentRef}
      className={`${styles.achievement__content} achievement__content`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
    >
      {sortedAchievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 1,
            delay: 0.8 + index * 0.2,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          <AchievementItem
            achievement={achievement}
            isActive={index === 0}
            className="achievement__item"
            onAchievementClick={onAchievementClick}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
