"use client";

import React, { useState } from "react";

import Image from "next/image";

import styles from "@/components/section/youtube/youtube.module.scss";

import { Play, X } from "lucide-react";

import useModalEffects from "@/components/helpers/useModalEffect";

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function YoutubeContent({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
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
    <section className={styles.youtube}>
      <div className={`${styles.youtube__container} container`}>
        <div className={styles.heading}>
          <h1>Youtube</h1>
        </div>
        <div className={styles.content__box}>
          {topVideo && (
            <div
              className={`${styles.box} ${styles.topArticle}`}
              onClick={() => handleVideoClick(topVideo)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.box__img}>
                <Image
                  src={topVideo.thumbnail}
                  alt={topVideo.title}
                  width={800}
                  height={500}
                  quality={100}
                  priority={true}
                />

                <div className={styles.play}>
                  <Play />
                </div>
              </div>

              <div className={styles.box__info}>
                <h3>{topVideo.title}</h3>
                <div className={styles.box__icons}>
                  {topVideo.icons.map((icon, i) => (
                    <Image
                      key={`${icon}-${i}`}
                      src={icon}
                      alt={`icon-${i}`}
                      className={styles.iconImage}
                      width={24}
                      height={24}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles.content}>
            {remainingVideos.map((item, index) => (
              <div
                key={index}
                className={styles.box}
                onClick={() => handleVideoClick(item)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.box__img}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={500}
                    height={500}
                    quality={100}
                    priority={true}
                  />

                  <div className={styles.play}>
                    <Play />
                  </div>
                </div>

                <div className={styles.info__small}>
                  <h3>{item.title}</h3>
                  <div className={styles.box__icons}>
                    {item.icons.map((icon, i) => (
                      <Image
                        key={`${icon}-${i}`}
                        src={icon}
                        alt={`icon-${i}`}
                        className={styles.iconImage}
                        width={24}
                        height={24}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div
          className={`${styles.modal} ${styles.active}`}
          onClick={closeModal}
        >
          <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube-nocookie.com/embed/${getYoutubeId(
                selectedVideo.url
              )}`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className={styles.modal__close} onClick={closeModal}>
            <X />
          </div>
        </div>
      )}
    </section>
  );
}
