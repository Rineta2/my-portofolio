import React from "react";

import Link from "next/link";

import Image from "next/image";

import AnimatedText from "@/components/hooks/animation/home/AnimatedText";

import styles from "@/components/section/home/home.module.scss";

export default function HomeContent({ home, homeImg, imageRefs }) {
    return (
        <div className={styles.content}>
            {home.map((item) => (
                <div className={styles.box} key={item.id}>
                    <span className={styles.text}>{item.text}</span>
                    <AnimatedText text={item.title} />
                    <p>{item.description}</p>
                    <Link href={item.path} className={styles.link}>
                        {item.name}
                    </Link>
                </div>
            ))}

            {homeImg.map((image, index) => (
                <div
                    className={styles.img}
                    key={image.id}
                    ref={(el) => (imageRefs.current[index] = el)}
                    style={{ cursor: "pointer" }}
                >
                    <Image src={image.img} alt="home" quality={100} />
                </div>
            ))}
        </div>
    );
}