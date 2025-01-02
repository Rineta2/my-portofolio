import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import styles from "@/components/section/achievement/achievement.module.scss";

export default function AchievementItem({
  achievement,
  isActive,
  className,
  onClick,
}) {
  const { id, imageUrl, title, date } = achievement;

  return (
    <div
      className={`${styles.achievement__item} ${className} ${
        isActive ? styles.active : ""
      }`}
      onClick={() => onClick?.(achievement)}
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
              onClick?.(achievement);
            }}
          >
            <Eye />
          </button>
        </div>
      </div>

      <div className={styles.achievement__info}>
        <h3>{title}</h3>
        <span>{format(new Date(date), "dd MMMM yyyy")}</span>
      </div>
    </div>
  );
}