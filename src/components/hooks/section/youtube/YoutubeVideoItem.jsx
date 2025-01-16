import React from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { Play } from "lucide-react";

import {
  containerVariants,
  itemVariants,
  imageVariants,
  textVariants,
  iconVariants,
  use3DHoverAnimation,
} from "@/components/hooks/animation/youtube/youtubeAnimations";

import styles from "@/components/section/youtube/youtube.module.scss";

export default function YoutubeVideoItem({
  video,
  onClick,
  isTopVideo = false,
}) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } =
    use3DHoverAnimation();

  return (
    <motion.div
      ref={ref}
      className={`${styles.box} ${isTopVideo ? styles.topArticle : ""}`}
      onClick={() => onClick(video)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      variants={itemVariants}
    >
      <motion.div
        className={styles.box__img}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(75px)",
        }}
        variants={imageVariants}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={isTopVideo ? 800 : 500}
          height={500}
          quality={100}
          priority={true}
        />
        <motion.div
          className={styles.play}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            transform: "translateZ(50px)",
          }}
        >
          <Play />
        </motion.div>
      </motion.div>

      <motion.div
        className={isTopVideo ? styles.box__info : styles.info__small}
        style={{
          transform: "translateZ(50px)",
        }}
        variants={textVariants}
      >
        <motion.h3>{video.title}</motion.h3>
        <motion.div className={styles.box__icons} variants={containerVariants}>
          {video.icons.map((icon, i) => (
            <motion.div
              key={`${icon}-${i}`}
              className={styles.icon__wrapper}
              variants={iconVariants}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                y: -5,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <motion.div
                className={styles.icon__inner}
                whileHover={{
                  boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
                }}
              >
                <Image
                  src={icon}
                  alt={`icon-${i}`}
                  className={styles.iconImage}
                  width={24}
                  height={24}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
