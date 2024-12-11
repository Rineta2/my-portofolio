"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "@/components/section/about/about.module.scss";

import Image from "next/image";

import { iconComponents } from "@/components/hooks/section/about/iconComponents";

import { initializeImageAnimation } from "@/components/hooks/animation/home/useHoverImage";

import { animateImages } from "@/components/hooks/animation/about/imageAnimation";

import { animateTitles } from "@/components/hooks/animation/about/titleAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient({ about, skills }) {
    const imageRefs = useRef([]);
    const titleRefs = useRef([]);
    const skillRefs = useRef([]);

    React.useEffect(() => {
        imageRefs.current = imageRefs.current.slice(0, about?.length);
        const cleanup = initializeImageAnimation(imageRefs);

        animateTitles(titleRefs);
        animateImages(skillRefs);

        return () => {
            cleanup();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [about, skills]);

    return (
        <section className={styles.about} id="about">
            <div className={`${styles.about__container} ${styles.container}`}>
                <div className={styles.content}>
                    {about?.map((image, index) => (
                        <div key={index} className={styles.image}>
                            <div
                                className={styles.img}
                                ref={el => imageRefs.current[index] = el}
                            >
                                <Image src={image?.imageUrl} style={{ cursor: "pointer" }} alt={image?.title} width={500} height={500} />
                            </div>
                        </div>
                    ))}

                    {about?.map((text, index) => (
                        <div key={index} className={styles.text}>
                            <h1 ref={el => titleRefs.current[index] = el}>{text?.title}</h1>
                            <p>{text?.description}</p>
                            <p>{text?.description2}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.skills}>
                    <h1>Programming Language and etc.</h1>
                    <div className={styles.components}>
                        {skills?.map((skill, index) => (
                            <div
                                style={{
                                    cursor: "pointer",
                                }}
                                key={index}
                                className={styles.box}
                                ref={el => skillRefs.current[index] = el}
                            >
                                <div className={styles.icons}>
                                    {React.createElement(iconComponents[skill.icon] || 'span')}
                                </div>
                                <span>{skill?.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 