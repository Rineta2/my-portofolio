import React, { useRef } from "react";
import styles from "@/components/section/achievement/achievement.module.scss";

export default function AchievementHeading({ heading }) {
  const headingRef = useRef(null);

  return (
    <div
      ref={headingRef}
      className={`${styles.achievement__heading} achievement__heading`}
    >
      <h1>{heading.title}</h1>
      <p>{heading.description}</p>
    </div>
  );
}
