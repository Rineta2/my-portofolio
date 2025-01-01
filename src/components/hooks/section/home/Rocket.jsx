import React, { useEffect, useRef } from "react";
import styles from "@/components/section/home/home.module.scss";
import Image from "next/image";
import {
  initializeRocket,
  playEntranceAnimation,
  createFloatingAnimation,
  handleHoverAnimation,
} from "@/components/hooks/animation/home/rocket/rocketAnimations";

export default function Rocket({ rocketImg }) {
  const rocketRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const element = rocketRef.current;

    // Initialize
    initializeRocket(element);

    // Entrance animation
    playEntranceAnimation(element, () => {
      timelineRef.current = createFloatingAnimation(element);
    });

    // Hover handlers
    const handleMouseEnter = () => {
      timelineRef.current.pause();
      handleHoverAnimation.enter(element);
    };

    const handleMouseLeave = () => {
      timelineRef.current.resume();
      handleHoverAnimation.leave(element);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.rocket} ref={rocketRef}>
      <Image src={rocketImg.rocket} alt="rocket" width={500} height={500} />
    </div>
  );
}
