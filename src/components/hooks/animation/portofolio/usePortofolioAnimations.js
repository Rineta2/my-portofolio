import { useEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { gsap } from "gsap";

export function usePortfolioAnimations(
  topProjectRef,
  sidebarRef,
  projectsRef,
  projects,
  selectedCategory
) {
  const hasAnimated = useRef(false);
  const timeline = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      if (!hasAnimated.current) {
        // Initial animation
        timeline.current = gsap.timeline();
        timeline.current.from([topProjectRef.current, sidebarRef.current], {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
        });

        timeline.current.from(
          projectsRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.5"
        );

        hasAnimated.current = true;
      } else {
        // Smooth transition for category changes
        gsap.to(projectsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [projects, topProjectRef, sidebarRef, projectsRef, selectedCategory]);
}
