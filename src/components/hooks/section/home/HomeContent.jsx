import React from "react";

import Link from "next/link";

import Image from "next/image";

import AnimatedText from "@/components/hooks/animation/home/AnimatedText";

import styles from "@/components/section/home/home.module.scss";

import { MoveRight } from "lucide-react";

export default function HomeContent({ home, homeImg, imageRefs, homeBtn }) {
    return (
        <div className={styles.content}>
            <div className={styles.img}>
                <Image
                    src={homeImg.img}
                    alt="home"
                    ref={(el) => (imageRefs.current[0] = el)}
                    key={homeImg.id}
                    unoptimized
                    className={styles.profile}
                />
            </div>

            <div className={styles.box}>
                <h1 className={styles.text}>{home.text}</h1>
                <AnimatedText text={home.title} />
                <p>{home.description}</p>
            </div>

            <div className={styles.btn}>
                {
                    homeBtn.map((item) => {
                        return (
                            <Link key={item.id} href={item.path}>
                                <MoveRight />{item.name}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    );
}