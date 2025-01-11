import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { motion, useInView } from "framer-motion";
import { formatDate } from "@/components/tools/formatDate";
import styles from "@/app/portofolio/Portofolio.module.scss";
import {
  containerAnimation,
  textContainerAnimation,
  titleAnimation,
  dateAnimation,
  descriptionAnimation,
  toolbarAnimation,
  imageAnimation,
  viewportConfig,
} from "@/components/hooks/animation/portofolio/pages/portofolioAnimations";

export function TopProject({ project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  return (
    <motion.div
      ref={ref}
      initial={containerAnimation.initial}
      animate={
        isInView ? containerAnimation.animate : containerAnimation.initial
      }
      transition={containerAnimation.transition}
    >
      <Link
        href={`/portofolio/${project.slug}`}
        className={styles.top_project}
        key={project.id}
      >
        <motion.div
          className={styles.text}
          initial={textContainerAnimation.initial}
          animate={
            isInView
              ? textContainerAnimation.animate
              : textContainerAnimation.initial
          }
          transition={textContainerAnimation.transition}
        >
          <motion.h2
            initial={titleAnimation.initial}
            animate={isInView ? titleAnimation.animate : titleAnimation.initial}
            transition={titleAnimation.transition}
          >
            {project.title}
          </motion.h2>

          <motion.span
            className={styles.date}
            initial={dateAnimation.initial}
            animate={isInView ? dateAnimation.animate : dateAnimation.initial}
            transition={dateAnimation.transition}
          >
            {formatDate(project.date)}
          </motion.span>

          <motion.p
            initial={descriptionAnimation.initial}
            animate={
              isInView
                ? descriptionAnimation.animate
                : descriptionAnimation.initial
            }
            transition={descriptionAnimation.transition}
          >
            {project.description.split(" ").length > 25
              ? project.description.split(" ").slice(0, 25).join(" ") + "..."
              : project.description}
          </motion.p>

          <motion.div
            className={styles.tollbar}
            initial={toolbarAnimation.initial}
            animate={
              isInView ? toolbarAnimation.animate : toolbarAnimation.initial
            }
            transition={toolbarAnimation.transition}
          >
            <span>
              <BiCategory size={30} /> {project.category}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.Image}
          initial={imageAnimation.initial}
          animate={isInView ? imageAnimation.animate : imageAnimation.initial}
          transition={imageAnimation.transition}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={500}
            height={500}
            quality={100}
            loading="lazy"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
