import React from "react";
import { motion } from "framer-motion";
import styles from "@/components/section/achievement/achievement.module.scss";

export default function AchievementHeading({ heading, isInView }) {
  return (
    <motion.div
      className={`${styles.achievement__heading} achievement__heading`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
      >
        {heading.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      >
        {heading.description}
      </motion.p>
    </motion.div>
  );
}
