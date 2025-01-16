"use client";

import React, { useState } from "react";

import { motion, AnimatePresence, useInView } from "framer-motion";

import useModalEffects from "@/components/helpers/useModalEffect";

import YoutubeVideoItem from "@/components/hooks/section/youtube/YoutubeVideoItem";

import YoutubeModal from "@/components/hooks/section/youtube/YoutubeModal";

import { containerVariants } from "@/components/hooks/animation/youtube/youtubeAnimations";

import styles from "@/components/section/youtube/youtube.module.scss";

export default function YoutubeContent({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const topVideo = videos[0];
  const remainingVideos = videos.slice(1);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  useModalEffects({ isOpen: selectedVideo, onClose: closeModal });

  return (
    <section className={styles.youtube} ref={ref}>
      <div className={`${styles.youtube__container} container`}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Youtube</h1>
        </motion.div>

        <motion.div
          className={styles.content__box}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {topVideo && (
            <YoutubeVideoItem
              video={topVideo}
              onClick={handleVideoClick}
              isTopVideo={true}
            />
          )}

          <motion.div className={styles.content} variants={containerVariants}>
            {remainingVideos.map((video, index) => (
              <YoutubeVideoItem
                key={index}
                video={video}
                onClick={handleVideoClick}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <YoutubeModal video={selectedVideo} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
