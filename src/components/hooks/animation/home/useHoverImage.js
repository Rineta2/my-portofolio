import { gsap } from "gsap";

export const initializeImageAnimation = (imageRefs) => {
  imageRefs.current?.forEach((el) => {
    if (!el) return;

    const handleMouseMove = (event) => {
      const rect = el.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      const xPercent = (mouseX / rect.width - 0.5) * 2;
      const yPercent = (mouseY / rect.height - 0.5) * 2;

      gsap.to(el, {
        x: xPercent * 10,
        y: yPercent * 10,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  });
};
