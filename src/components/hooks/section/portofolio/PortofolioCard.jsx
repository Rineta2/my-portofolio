"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { useRef } from "react";

import styles from "@/components/section/portofolio/portofolio.module.scss";

import { useRouter } from "next/navigation";

import {
  cardAnimation,
  imageAnimation,
  textAnimation,
  iconAnimation,
  getTransition,
} from "@/components/hooks/animation/portofolio/animation";

export default function ProjectCard({ item, index }) {
  const router = useRouter();
  const cardRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/portofolio/${item?.slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      ref={cardRef}
      className={styles.box}
      style={{ cursor: "pointer" }}
      {...cardAnimation}
      transition={getTransition(index)}
    >
      <motion.div className={styles.img} {...imageAnimation}>
        <Image
          src={item?.thumbnail}
          alt={item?.title}
          width={500}
          height={500}
          quality={100}
        />
      </motion.div>

      <motion.div className={styles.text}>
        <motion.h2
          className={styles.title}
          {...textAnimation}
          transition={getTransition(index, 0.4)}
        >
          {item?.title}
        </motion.h2>

        <motion.p
          className={styles.description}
          {...textAnimation}
          transition={getTransition(index, 0.5)}
        >
          {item?.description}
        </motion.p>

        <motion.div
          className={styles.category}
          {...textAnimation}
          transition={getTransition(index, 0.6)}
        >
          <span className={styles.category__title}>Category</span>
          <span className={styles.category__item}>{item?.category}</span>
        </motion.div>

        <motion.div
          className={styles.teknologo}
          {...textAnimation}
          transition={getTransition(index, 0.7)}
        >
          <span className={styles.teknologo__title}>Technology</span>
          <div className={styles.teknologo__item}>
            {item.icons?.map((icon, iconIndex) => (
              <motion.div
                className={styles.img}
                key={iconIndex}
                {...iconAnimation}
                transition={getTransition(index, 0.8 + iconIndex * 0.1)}
              >
                <Image
                  src={icon}
                  alt={icon}
                  width={500}
                  height={500}
                  quality={100}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
