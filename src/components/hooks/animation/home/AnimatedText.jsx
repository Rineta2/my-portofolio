"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/components/section/home/home.module.scss";

const AnimatedText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && typeof text === "string") {
      const chars = textRef.current.querySelectorAll("h1");

      // Reset initial state
      gsap.set(chars, { y: 50, opacity: 0 });

      // Animate immediately without ScrollTrigger
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.05,
        delay: 0.5, // Slight delay after loading
      });
    }
  }, [text]);

  if (!text || typeof text !== "string") {
    return null; // Return null instead of error message
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
        <h1 key={index} className={styles.char}>
          {char}
        </h1>
      ))}
    </div>
  );
};

export default AnimatedText;
