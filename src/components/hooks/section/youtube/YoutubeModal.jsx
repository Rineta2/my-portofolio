import React from "react";

import { motion } from "framer-motion";

import { X } from "lucide-react";

import { getYoutubeId } from "@/components/helpers/YoutubeUrl";

import styles from "@/components/section/youtube/youtube.module.scss";

export default function YoutubeModal({ video, onClose }) {
  return (
    <motion.div
      className={`${styles.modal} ${styles.active}`}
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
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(
            video.url
          )}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>

      <motion.div
        className={styles.modal__close}
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
      >
        <X />
      </motion.div>
    </motion.div>
  );
}
