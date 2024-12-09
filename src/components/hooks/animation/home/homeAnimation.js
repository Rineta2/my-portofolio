import gsap from "gsap";

export const initializeCircleAnimation = (sectionRef) => {
  // Create single light circle
  const circle = document.createElement("div");
  circle.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    width: 600px;
    height: 600px;
    pointer-events: none;
    filter: blur(30px);
    transform-origin: center center;
  `;
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
