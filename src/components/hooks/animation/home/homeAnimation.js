import gsap from "gsap";

import styles from "@/components/section/home/home.module.scss";

export const initializeCircleAnimation = (sectionRef) => {
  // Create single light circle
  const circle = document.createElement("div");
  circle.classList.add(styles.lightCircle);
  sectionRef.current.appendChild(circle);

  // Animate circle
  const timeline = gsap.timeline({
    onComplete: () => {
      circle.remove();
    },
  });

  gsap.set(circle, {
    x: -300,
    y: -1200,
    opacity: 0,
  });

  timeline
    .to(circle, {
      x: window.innerWidth + 300,
      y: window.innerHeight + 600,
      opacity: 0.3,
      duration: 5,
      ease: "power1.inOut",
    })
    .to(
      circle,
      {
        opacity: 0,
        scale: 1.2,
        duration: 1.5,
        ease: "power1.inOut",
      },
      "-=1.5"
    );

  return { circle, timeline };
};
