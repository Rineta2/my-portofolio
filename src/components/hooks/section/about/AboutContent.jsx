import React, { useEffect } from "react";

import styles from "@/components/section/about/about.module.scss";

import { AboutImages } from "@/components/hooks/section/about/AboutImage";

import { AboutTexts } from "@/components/hooks/section/about/AboutTexts";

import { useAboutAnimations } from "@/components/hooks/animation/about/useAboutAnimation";

import { initializeAnimations } from "@/components/hooks/animation/about/animationHelper";

export default function AboutContent({ about }) {
  const { imageRefs, titleRefs } = useAboutAnimations(about);

  useEffect(() => {
    initializeAnimations(about, imageRefs, titleRefs);
  }, [about, imageRefs, titleRefs]);

  return (
    <div className={styles.content}>
      <AboutImages about={about} imageRefs={imageRefs} />
      <AboutTexts about={about} titleRefs={titleRefs} />
    </div>
  );
}
