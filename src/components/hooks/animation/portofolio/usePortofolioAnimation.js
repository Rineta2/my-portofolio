import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function usePortfolioAnimation(containerRef, boxRefs) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const boxes = boxRefs.current;

    // Container animation
    gsap.fromTo(
      container,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top bottom-=150",
          once: true,
        },
      }
    );

    // Boxes animation
    boxes.forEach((box, index) => {
      gsap.fromTo(
        box,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top bottom-=100",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerRef, boxRefs]);
}
