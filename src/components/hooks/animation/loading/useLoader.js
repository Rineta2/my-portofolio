import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const useLoader = (pathname) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const progressTextRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    window.scrollTo(0, 0);

    const textTl = gsap.timeline();

    textTl
      .fromTo(
        ".loader-title:first-child",
        {
          opacity: 0,
          y: -30,
          rotateX: -45,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
        }
      )
      .fromTo(
        ".loader-title:nth-child(2)",
        {
          opacity: 0,
          y: 15,
          scale: 0.9,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        ".loader-title:first-child",
        {
          y: -8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "-=0.5"
      )
      .to(
        ".loader-title:nth-child(2)",
        {
          scale: 0.98,
          opacity: 0.8,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "-=2"
      );

    let progressValue = { value: 0 };
    const progressTl = gsap.timeline();

    progressTl.to(progressValue, {
      value: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(progressValue.value));
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(
            progressValue.value
          )}%`;
        }
      },
      onComplete: () => {
        setIsLoading(false);
        setProgress(100);
      },
    });

    return () => {
      textTl.kill();
      progressTl.kill();
    };
  }, [pathname]);

  return { isLoading, progress, progressTextRef, loaderRef };
};

export default useLoader;
