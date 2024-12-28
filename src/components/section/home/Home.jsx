"use client";

import React, { useEffect, useRef } from "react";

import styles from "./home.module.scss";

import { home, homeImg, icons, startImg, rocketImg } from "@/components/data/Home";

import { initializeButtonAnimation } from "@/components/hooks/animation/home/buttonAnimation";

import { initializeCircleAnimation } from "@/components/hooks/animation/home/homeAnimation";

import { initializeImageAnimation } from "@/components/hooks/animation/home/useHoverImage";

import HomeContent from "@/components/hooks/section/home/HomeContent";

import HomeBottom from "@/components/hooks/section/home/HomeBottom";

import { homeBtn } from "@/components/data/Home";

import { useTheme } from "@/utils/theme/ThemeContext";

import Rocket from "@/components/hooks/section/home/Rocket";

export default function Home() {
  const sectionRef = useRef(null);

  const imageRefs = useRef([]);

  useEffect(() => {
    const scrollButton = document.querySelector(`a[href="#about"]`);
    const buttonCleanup = initializeButtonAnimation(scrollButton);

    const { circle, timeline } = initializeCircleAnimation(sectionRef);

    const imageCleanup = initializeImageAnimation(imageRefs);

    return () => {
      if (buttonCleanup) buttonCleanup();
      if (circle) circle.remove();
      if (timeline) timeline.kill();
      if (imageCleanup) imageCleanup();
    };
  }, []);

  const { isDarkMode } = useTheme();

  return (
    <section ref={sectionRef} className={`${styles.home} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.overlay}></div>
      <div className={`${styles.home__container} container`}>
        <HomeContent home={home} homeImg={homeImg} imageRefs={imageRefs} homeBtn={homeBtn} />
        <HomeBottom icons={icons} />
        <Rocket rocketImg={rocketImg} />
      </div>
    </section>
  );
}
