import { useCallback } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

export const useAchievementAnimationScroll = (styles) => {
  const initializeAnimationScroll = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = document.querySelectorAll(`.${styles.achievement__item}`);

    items.forEach((item, index) => {
      gsap.set(item, {
        opacity: 0,
        y: 50,
        scale: 0.95,
      });

      gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none",
          once: true,
        },
        delay: index * 0.5,
      });
    });
  }, [styles]);

  return { initializeAnimationScroll };
};
