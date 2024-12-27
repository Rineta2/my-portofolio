import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initializeAnimations = (
  topProjectRef,
  sidebarRef,
  projectsRef
) => {
  // Timeline untuk sekuensial animasi
  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  // Top project animation
  gsap.fromTo(
    topProjectRef.current,
    {
      opacity: 0,
      y: 60,
      scale: 0.98,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: topProjectRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );

  // Sidebar animation
  gsap.fromTo(
    sidebarRef.current,
    {
      opacity: 0,
      x: -50,
    },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sidebarRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );

  // Projects grid animation
  const projectElements = projectsRef.current.filter((el) => el != null);

  gsap.fromTo(
    projectElements,
    {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      stagger: {
        amount: 0.5,
        from: "start",
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: projectElements[0],
        start: "top bottom-=100",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
};

export const categoryChangeAnimation = (projectsRef) => {
  const projectElements = projectsRef.current.filter((el) => el != null);

  gsap.to(projectElements, {
    opacity: 0,
    scale: 0.95,
    y: 20,
    duration: 0.4,
    stagger: {
      amount: 0.3,
      from: "start",
    },
    ease: "power2.inOut",
    onComplete: () => {
      gsap.to(projectElements, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: {
          amount: 0.3,
          from: "start",
        },
        ease: "power3.out",
        delay: 0.1,
      });
    },
  });
};

export const handleProjectHover = (element, isEntering) => {
  gsap.to(element, {
    scale: isEntering ? 1.03 : 1,
    y: isEntering ? -8 : 0,
    boxShadow: isEntering ? "0 15px 30px rgba(0,0,0,0.12)" : "none",
    duration: 0.5,
    ease: "power2.out",
  });
};
