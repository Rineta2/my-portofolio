import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useHomeAnimation() {
  const textRef = useRef(null);
  const descriptionRef = useRef(null);
  const btnRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    tl.fromTo(
      textRef.current,
      {
        y: 120,
        opacity: 0,
        rotationX: 80,
        transformPerspective: 1000,
        transformOrigin: "0% 50% -50",
        skewY: 2,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        skewY: 0,
        duration: 1.5,
        ease: "power3.inOut",
      }
    )
      .fromTo(
        descriptionRef.current,
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
          ease: "back.out(1.2)",
        },
        "-=0.8"
      )
      .fromTo(
        btnRefs.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
  }, []);

  return { textRef, descriptionRef, btnRefs };
}
