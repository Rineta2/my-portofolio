import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initializeImageAnimation } from "@/components/hooks/animation/home/useHoverImage";
import { animateImages } from "@/components/hooks/animation/about/imageAnimation";
import { animateTitles } from "@/components/hooks/animation/about/titleAnimation";

gsap.registerPlugin(ScrollTrigger);

export function useAboutAnimations(about, skills) {
  const imageRefs = useRef([]);
  const titleRefs = useRef([]);
  const skillRefs = useRef([]);

  useEffect(() => {
    let cleanupFunction = () => {};

    if (about) {
      imageRefs.current = imageRefs.current.slice(0, about?.length);
      cleanupFunction = initializeImageAnimation(imageRefs);
      animateTitles(titleRefs);
    }

    if (skills) {
      animateImages(skillRefs);
    }

    return () => {
      if (about) cleanupFunction();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [about, skills]);

  return { imageRefs, titleRefs, skillRefs };
}
