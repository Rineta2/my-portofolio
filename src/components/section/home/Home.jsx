"use client";

import React, { useEffect, useRef } from "react";

import styles from "./home.module.scss";

import { home, homeImg, icons } from "@/components/data/Home";

import Image from "next/image";

import Link from "next/link";

import { IoMdArrowDropdown } from "react-icons/io";

import { initializeButtonAnimation } from "@/components/hooks/animation/home/buttonAnimation";

import { initializeCircleAnimation } from "@/components/hooks/animation/home/homeAnimation";

import AnimatedText from "@/components/hooks/animation/home/AnimatedText";

export default function Home() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const scrollButton = document.querySelector(`a[href="#skills"]`);
    const cleanup = initializeButtonAnimation(scrollButton);

    // Initialize circle animation
    const { circle, timeline } = initializeCircleAnimation(sectionRef);

    return () => {
      cleanup();
      circle.remove();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.home}>
      <div className={styles.overlay}></div>
      <div className={`${styles.home__container} ${styles.container}`}>
        <div className={styles.content}>
          {home.map((item) => {
            return (
              <div className={styles.box} key={item.id}>
                <span className={styles.text}>{item.text}</span>

                <AnimatedText text={item.title} />

                <p>{item.description}</p>
                <Link href={item.path} className={styles.link}>
                  {item.name}
                </Link>
              </div>
            );
          })}

          {homeImg.map((image) => {
            return (
              <div className={styles.img} key={image.id}>
                <Image src={image.img} alt="home" quality={100} />
              </div>
            );
          })}
        </div>

        <div className={styles.bottom}>
          <a href="#skills" className={styles.left}>
            <span>Scroll Down</span>
            <IoMdArrowDropdown />
          </a>

          <div className={styles.right}>
            {icons.map((icon) => {
              return (
                <Link
                  href={icon.path}
                  key={icon.id}
                  className={styles.box__icons}
                >
                  {icon.icons}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
