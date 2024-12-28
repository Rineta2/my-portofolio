import React, { useEffect, useRef } from 'react';
import styles from "@/components/section/home/home.module.scss";
import Image from "next/image";
import gsap from 'gsap';

export default function Rocket({ rocketImg }) {
    const rocketRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        // Base animation
        timelineRef.current = gsap.timeline({
            repeat: -1,
            yoyo: true
        });

        timelineRef.current.to(rocketRef.current, {
            y: -20,
            x: 10,
            rotation: 5,
            duration: 2,
            ease: "power1.inOut"
        });

        // Hover animation
        const element = rocketRef.current;
        const handleMouseEnter = () => {
            // Pause the base animation
            timelineRef.current.pause();

            gsap.to(element, {
                scale: 1.2,
                y: -40,
                x: 20,
                rotation: 10,
                duration: 0.4,
                ease: "power2.out"
            });
        };

        const handleMouseLeave = () => {
            // Resume the base animation
            timelineRef.current.resume();

            gsap.to(element, {
                scale: 1,
                y: -20,
                x: 10,
                rotation: 5,
                duration: 0.4,
                ease: "power2.in"
            });
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (timelineRef.current) timelineRef.current.kill();
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className={styles.rocket} ref={rocketRef}>
            <Image src={rocketImg.rocket} alt="rocket" width={500} height={500} />
        </div>
    );
}
