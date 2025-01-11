import gsap from "gsap";

export const initializeButtonAnimation = (scrollButton) => {
  if (!scrollButton) return;

  const handleMouseMove = (e) => {
    const rect = scrollButton.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(scrollButton, {
      duration: 1.2,
      x: x * 0.25,
      y: y * 0.25,
      rotation: x * 0.035,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(scrollButton, {
      duration: 1.5,
      x: 0,
      y: 0,
      rotation: 0,
      ease: "elastic.out(1, 0.15)",
      overwrite: true,
    });
  };

  scrollButton.addEventListener("mousemove", handleMouseMove);
  scrollButton.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    scrollButton.removeEventListener("mousemove", handleMouseMove);
    scrollButton.removeEventListener("mouseleave", handleMouseLeave);
  };
};
