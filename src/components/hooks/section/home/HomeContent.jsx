import React from "react";

import Link from "next/link";

import Image from "next/image";

import { MoveRight } from "lucide-react";

import AnimatedText from "@/components/hooks/animation/home/AnimatedText";

import TextGenerate from "@/components/hooks/animation/home/TextGenerate";

import styles from "@/components/section/home/home.module.scss";

import { useParticleSystem } from "@/components/hooks/animation/home/tre/useParticleSystem";

import { useHomeAnimation } from "@/components/hooks/animation/home/useHomeAnimation";

export default function HomeContent({
  home,
  homeImg,
  imageRefs,
  homeBtn,
  isDarkMode,
}) {
  const canvasRef = useParticleSystem(isDarkMode);
  const { textRef, descriptionRef, btnRefs } = useHomeAnimation();

  return (
    <div className={styles.content}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

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
        <div className={styles.text}>
          <h1 ref={textRef}>{home.text}</h1>
        </div>

        <AnimatedText text={home.title} />

        <p ref={descriptionRef}>
          <TextGenerate text={home.description} delay={800} />
        </p>
      </div>

      <div className={styles.btn}>
        {homeBtn.map((item, index) => (
          <Link
            key={item.id}
            href={item.path}
            ref={(el) => (btnRefs.current[index] = el)}
          >
            <MoveRight />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
