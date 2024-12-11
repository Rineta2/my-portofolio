"use client";
import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "@/components/section/home/home.module.scss";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && typeof text === "string") {
      const chars = textRef.current.querySelectorAll(".char");

      gsap.fromTo(
        chars,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 2.5,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [text]);

  if (!text || typeof text !== "string") {
    return <div>No text available</div>;
  }

  return (
    <div
      ref={textRef}
      className={styles.textItem}
      style={{
        display: "flex",
        gap: "1rem",
        overflow: "hidden",
      }}
    >
      {text.split("").map((char, index) => (
        <h1
          key={index}
          className={styles.char}
        >
          {char}
        </h1>
      ))}
    </div>
  );
};

export default AnimatedText;
