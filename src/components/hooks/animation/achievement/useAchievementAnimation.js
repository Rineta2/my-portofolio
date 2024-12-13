import gsap from "gsap";

export const useAchievementAnimation = (styles) => {
  const initializeAnimation = () => {
    const items = document.querySelectorAll(`.${styles.achievement__item}`);

    items.forEach((item) => {
      const textElement = item.querySelector(`.${styles.text}`);
      const headingElement = textElement?.querySelector("h2");

      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 10;
        const yPercent = (y / rect.height - 0.5) * -10;

        gsap.to(item, {
          rotationX: yPercent,
          rotationY: xPercent,
          duration: 0.4,
          ease: "power2.out",
          transformPerspective: 1000,
          transformOrigin: "center center",
        });

        gsap.to(textElement, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(headingElement, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(textElement, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(headingElement, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  };

  return { initializeAnimation };
};
