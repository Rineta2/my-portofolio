import gsap from "gsap";

export function animateTitles(titleRefs) {
  titleRefs.current.forEach((title, index) => {
    if (title) {
      gsap.set(title.parentElement, {
        perspective: 1000,
      });

      gsap.fromTo(
        title,
        {
          rotationX: -90,
          opacity: 0,
          transformOrigin: "center center",
          immediateRender: true,
        },
        {
          scrollTrigger: {
            trigger: title,
            start: "top center+=100",
            toggleActions: "play none none none",
            once: true,
          },
          rotationX: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.2,
        }
      );
    }
  });
}
