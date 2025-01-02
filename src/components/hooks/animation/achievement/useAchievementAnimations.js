import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useAchievementAnimation(sectionRef) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(".achievement__heading", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievement__heading",
          start: "top bottom-=100",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Achievement items animation
      const items = document.querySelectorAll(".achievement__item");
      gsap.set(items, { opacity: 0, y: 60 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: {
          amount: 0.6,
          ease: "power2.inOut",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievement__content",
          start: "top center+=100",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);
}
