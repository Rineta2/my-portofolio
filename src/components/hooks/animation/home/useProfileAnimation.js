import { useEffect } from "react";
import gsap from "gsap";

export function useProfileAnimation(imageRefs) {
  useEffect(() => {
    gsap.fromTo(
      imageRefs.current[0],
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, [imageRefs]);
}
