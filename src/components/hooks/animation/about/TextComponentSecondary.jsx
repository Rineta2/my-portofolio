"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextComponentSecondary = ({ desc }) => {
    const textRef = useRef(null);

    useEffect(() => {
        if (!textRef.current || !desc) return;

        const text = desc;
        const currentTextRef = textRef.current;

        // Set initial opacity to 0
        gsap.set(currentTextRef, { opacity: 0 });

        currentTextRef.innerHTML = text
            .split("")
            .map((char) => `<span>${char}</span>`)
            .join("");

        const chars = currentTextRef.querySelectorAll("span");

        gsap.set(chars, { opacity: 0, y: 10 });

        // Create scroll trigger for visibility
        ScrollTrigger.create({
            trigger: currentTextRef,
            start: "top 100%",
            onEnter: () => {
                // First make the container visible
                gsap.to(currentTextRef, {
                    opacity: 1,
                    duration: 0.1,
                    onComplete: () => {
                        // Then animate the characters
                        gsap.to(chars, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            stagger: 0.02
                        });
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            currentTextRef.innerHTML = text;
        };
    }, [desc]);

    return <span ref={textRef}>{desc}</span>;
};

export default TextComponentSecondary;