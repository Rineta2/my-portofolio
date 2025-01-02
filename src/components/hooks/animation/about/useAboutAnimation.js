import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initializeImageAnimation = (imageRef, index) => {
  return gsap.fromTo(
    imageRef,
    {
      opacity: 0,
      y: 100,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: index * 0.2,
      scrollTrigger: {
        trigger: imageRef,
        start: "top bottom-=150",
        end: "top center",
        toggleActions: "play none none none",
      },
    }
  );
};

export const initializeTextAnimation = (textRef, index) => {
  return gsap.fromTo(
    textRef,
    {
      opacity: 0,
      x: -70,
      rotateX: 15,
    },
    {
      opacity: 1,
      x: 0,
      rotateX: 0,
      duration: 1.4,
      ease: "power2.out",
      delay: index * 0.3,
      scrollTrigger: {
        trigger: textRef,
        start: "top bottom-=150",
        end: "top center",
        toggleActions: "play none none none",
      },
    }
  );
};

export const useAboutAnimations = (about) => {
  const imageRefs = useRef([]);
  const titleRefs = useRef([]);

  // Reset refs
  imageRefs.current = [];
  titleRefs.current = [];

  return {
    imageRefs,
    titleRefs,
  };
};
