import gsap from "gsap";

export const openModalAnimation = (modalRef, contentRef) => {
  gsap.to(modalRef, {
    duration: 0.3,
    opacity: 1,
    display: "grid",
    scale: 1,
    ease: "power2.out",
  });

  gsap.from(contentRef, {
    duration: 0.4,
    y: -50,
    opacity: 0,
    ease: "power2.out",
  });
};

export const closeModalAnimation = (modalRef, contentRef) => {
  gsap.to(modalRef, {
    duration: 0.3,
    opacity: 0,
    scale: 0.8,
    ease: "power2.in",
    onComplete: () => {
      gsap.set(modalRef, { display: "none" });
    },
  });

  gsap.to(contentRef, {
    duration: 0.3,
    y: 20,
    opacity: 0,
    ease: "power2.in",
  });
};
