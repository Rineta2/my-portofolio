import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "@/components/section/achievement/achievement.module.scss";
import { motion, AnimatePresence } from "framer-motion";

export default function AchievementModal({ achievement, onClose }) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.achievement__modal}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={achievement.imageUrl}
              alt={achievement.title}
              width={500}
              height={500}
              quality={100}
            />
          </motion.div>

          <motion.div
            className={styles.modal__close}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button onClick={onClose}>
              <X />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
