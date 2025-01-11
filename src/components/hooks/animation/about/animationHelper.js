import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {
  initializeImageAnimation,
  initializeTextAnimation,
} from "@/components/hooks/animation/about/useAboutAnimation";

export function initializeAnimations(about, imageRefs, titleRefs) {
  gsap.registerPlugin(ScrollTrigger);

  about?.forEach((_, index) => {
    initializeImageAnimation(imageRefs.current[index], index);
    initializeTextAnimation(titleRefs.current[index], index);
  });
}
