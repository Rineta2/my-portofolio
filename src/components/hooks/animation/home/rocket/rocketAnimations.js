import gsap from "gsap";

export const initializeRocket = (element) => {
  gsap.set(element, {
    opacity: 0,
    scale: 0.8,
    rotation: -10,
  });
};

export const playEntranceAnimation = (element, onComplete) => {
  gsap.to(element, {
    opacity: 1,
    scale: 1,
    rotation: 0,
    duration: 1,
    delay: 2,
    ease: "power3.out",
    onComplete,
  });
};

export const createFloatingAnimation = (element) => {
  return gsap
    .timeline({
      repeat: -1,
      yoyo: true,
    })
    .to(element, {
      y: -20,
      x: 10,
      rotation: 5,
      duration: 2,
      ease: "power1.inOut",
    });
};

export const handleHoverAnimation = {
  enter: (element) => {
    gsap.to(element, {
      scale: 1.2,
      y: -40,
      x: 20,
      rotation: 10,
      duration: 0.4,
      ease: "power2.out",
    });
  },
  leave: (element) => {
    gsap.to(element, {
      scale: 1,
      y: -20,
      x: 10,
      rotation: 5,
      duration: 0.4,
      ease: "power2.in",
    });
  },
};
