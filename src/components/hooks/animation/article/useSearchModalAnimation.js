import { useEffect } from "react";
import gsap from "gsap";

export const useSearchModalAnimation = (
  isModalOpen,
  modalRef,
  modalContentRef
) => {
  useEffect(() => {
    if (isModalOpen) {
      // Open animation
      gsap.set(modalRef.current, { display: "flex" });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        modalContentRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, delay: 0.1 }
      );
    } else {
      // Close animation
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(modalRef.current, { display: "none" });
        },
      });
      gsap.to(modalContentRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.3,
      });
    }
  }, [isModalOpen, modalRef, modalContentRef]);
};
