import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "@/components/section/achievement/achievement.module.scss";

export default function AchievementModal({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <div className={styles.achievement__modal}>
      <div className={styles.modal__content}>
        <Image
          src={achievement.imageUrl}
          alt={achievement.title}
          width={500}
          height={500}
          quality={100}
        />

        <div className={styles.modal__close}>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
