import gsap from "gsap";

export const initializeHomeBottomAnimation = (leftRef, rightRef) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
    delay: 1.5,
  });

  // Initial states
  gsap.set(leftRef.current, {
    y: 50,
    opacity: 0,
  });

  gsap.set(rightRef.current.children, {
    y: 30,
    opacity: 0,
  });

  // Animation sequence
  tl.to(leftRef.current, {
    y: 0,
    opacity: 1,
    duration: 0.8,
  }).to(
    rightRef.current.children,
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
    },
    "-=0.4"
  );
};
