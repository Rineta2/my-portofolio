"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextComponent = ({ desc, onComplete, delay = 0 }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current || !desc) return;

        const text = desc;
        const currentTextRef = textRef.current;
        currentTextRef.innerHTML = text
            .split("")
            .map((char) => `<span>${char}</span>`)
            .join("");

        const chars = currentTextRef.querySelectorAll("span");

        // Set initial state
        gsap.set(chars, { opacity: 0, y: 10 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: currentTextRef,
                start: "top 100%",
                end: "top 30%",
                onComplete: onComplete,
            },
            delay: delay // Add delay for second description
        });

        tl.to(chars, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.02,
        });

        return () => {
            currentTextRef.innerHTML = text;
        };
    }, [desc, onComplete, delay]);

    return <span ref={textRef}>{desc}</span>;
};

export default TextComponent;