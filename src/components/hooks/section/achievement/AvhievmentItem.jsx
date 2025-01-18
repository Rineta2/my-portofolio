import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import styles from "@/components/section/achievement/achievement.module.scss";

export default function AchievementItem({
  achievement,
  isActive,
  className,
  onAchievementClick,
}) {
  const { id, imageUrl, title, date } = achievement;

  return (
    <div
      className={`${styles.achievement__item} ${className} ${
        isActive ? styles.active : ""
      }`}
      onClick={() => onAchievementClick?.(achievement)}
    >
      <div className={styles.img}>
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          quality={100}
        />
        <div className={styles.achievement__icon}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAchievementClick?.(achievement);
            }}
          >
            <Eye />
          </button>
        </div>
      </div>

      <div className={styles.achievement__info}>
        <h3 className={styles.achievement__title}>{title}</h3>
        <span className={styles.achievement__date}>
          {format(new Date(date), "dd MMMM yyyy")}
        </span>
      </div>
    </div>
  );
}
