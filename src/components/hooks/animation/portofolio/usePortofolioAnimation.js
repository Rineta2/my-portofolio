import { useEffect } from "react";

import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";

export default function usePortfolioAnimation(toolbarRef, contentRef) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!toolbarRef.current || !contentRef.current) return;

      const elements = [
        toolbarRef.current,
        ...contentRef.current.querySelectorAll("a"),
      ];

      gsap.from(elements, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.8,
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center+=100",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [toolbarRef, contentRef]);
}
