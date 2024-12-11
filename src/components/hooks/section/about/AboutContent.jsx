import React from "react";

import Image from "next/image";

import styles from "@/components/section/about/about.module.scss";

import TextComponent from "@/components/hooks/animation/about/TextComponent";

import TextComponentSecondary from "@/components/hooks/animation/about/TextComponentSecondary";

import { useAboutAnimations } from "@/components/hooks/section/about/utils/useAboutAnimation";

import gsap from "gsap";

export default function AboutContent({ about }) {
    const { imageRefs, titleRefs } = useAboutAnimations(about);

    return (
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
                    <TextComponent
                        desc={text?.description}
                        onComplete={() => {
                            if (titleRefs.current[index + 1]) {
                                gsap.to(titleRefs.current[index + 1], {
                                    opacity: 1,
                                    duration: 1
                                });
                            }
                        }}
                    />
                    {text?.description2 && (
                        <div style={{ marginTop: '20px' }}>
                            <TextComponentSecondary desc={text?.description2} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}